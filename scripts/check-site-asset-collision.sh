#!/usr/bin/env bash
set -euo pipefail

# VitePress のビルド成果物と、同一 S3 バケット(license_server/インストーラが
# 所有するパス群)の衝突を検知する。2段階のチェックを行う。
#
#   1. トップレベル予約パスの構造チェック(常時実行、AWS不要)
#      admin/, api/, assets/, auth/, downloads/, firmware/, flash/,
#      installer/, portal/ は license_server が所有するルーティング名前空間。
#      VitePress の dist にこれらと同名のトップレベルディレクトリ/ファイルが
#      あれば、URLレベルで確実に衝突する。VitePress側の設定(base, assetsDir)
#      が事故で変わってもここで検知できる、最も確実なチェック。
#
#   2. S3照合モード(CI で使用。--bucket または SITE_BUCKET 環境変数を指定)
#      実際にデプロイ先バケットの予約パス配下のファイル名一覧を取得し、
#      dist 側のファイル名と突き合わせる。真実の源はリポジトリの想定では
#      なく「バケットの現物」であり、license_server が private リポジトリ
#      でも sibling checkout やトークン管理が不要。ページのルーティング
#      ファイルである index.html はどのディレクトリにも存在するのが正常
#      仕様なので比較対象から除外し、実際に衝突しうるハッシュ付きアセット
#      等のみを見る。バケット照会に失敗した場合は必ず exit 1 で失敗させる
#      (以前の実装は license_server ディレクトリが見つからない場合に
#      無条件で WARN + exit 0 していたため、CI では常にスキップされる
#      無効なゲートになっていた)。
#
#   --bucket 未指定時は 1 のみ実行(ローカル開発時の高速チェック)。

DIST_DIR="site/.vitepress/dist"
SITE_BUCKET="${SITE_BUCKET:-}"

RESERVED_TOP_LEVEL_SEGMENTS=(admin api assets auth downloads firmware flash installer portal)
IGNORED_BASENAMES=(index.html)

usage() {
  cat <<'USAGE'
Usage:
  scripts/check-site-asset-collision.sh [--dist <dir>] [--bucket <s3-bucket-name>]

  --bucket を指定すると S3 照合モードも実行(CI推奨)。省略するとトップレベル構造チェックのみ。
USAGE
}

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --dist)
      DIST_DIR="$2"; shift 2 ;;
    --bucket)
      SITE_BUCKET="$2"; shift 2 ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      echo "Error: unknown argument: $1" >&2
      usage >&2
      exit 1 ;;
  esac
done

if [[ ! -d "$DIST_DIR" ]]; then
  echo "[ERROR] Dist directory not found: $DIST_DIR"
  echo "Run npm run build before this check."
  exit 1
fi

# --- 1. トップレベル予約パスの構造チェック ---
structural_collisions=()
for segment in "${RESERVED_TOP_LEVEL_SEGMENTS[@]}"; do
  if [[ -e "${DIST_DIR}/${segment}" ]]; then
    structural_collisions+=("$segment")
  fi
done

if [[ ${#structural_collisions[@]} -gt 0 ]]; then
  echo "[ERROR] VitePress dist output contains a reserved top-level path owned by license_server:"
  for item in "${structural_collisions[@]}"; do
    echo "  - /$item/"
  done
  echo "This would overwrite the app's own routing namespace when synced to the shared bucket."
  exit 1
fi
echo "[OK] No reserved top-level path collisions."

if [[ -z "$SITE_BUCKET" ]]; then
  echo "[INFO] --bucket not given; skipping S3 filename collision check (structural check above still applies)."
  exit 0
fi

# --- 2. S3照合モード ---
echo "[INFO] S3 collision check mode: querying s3://${SITE_BUCKET}/{${RESERVED_TOP_LEVEL_SEGMENTS[*]}}/"
if ! command -v aws >/dev/null 2>&1; then
  echo "[ERROR] aws CLI is required for --bucket mode but was not found." >&2
  exit 1
fi

reserved_basename_file=$(mktemp)
raw_keys_file=$(mktemp)
trap 'rm -f "$reserved_basename_file" "$raw_keys_file"' EXIT

found_any=0
for segment in "${RESERVED_TOP_LEVEL_SEGMENTS[@]}"; do
  err_log=$(mktemp)
  if aws s3api list-objects-v2 \
      --bucket "$SITE_BUCKET" \
      --prefix "${segment}/" \
      --query 'Contents[].Key' \
      --output text 2>"$err_log" >> "$raw_keys_file"; then
    found_any=1
  else
    if [[ -s "$err_log" ]]; then
      echo "[ERROR] Failed to list s3://${SITE_BUCKET}/${segment}/:" >&2
      cat "$err_log" >&2
      rm -f "$err_log"
      exit 1
    fi
  fi
  rm -f "$err_log"
done

if [[ "$found_any" -ne 1 ]]; then
  echo "[ERROR] Could not verify any reserved prefix under s3://${SITE_BUCKET}/. Refusing to skip the check." >&2
  exit 1
fi

tr '\t' '\n' < "$raw_keys_file" \
  | grep -v '^None$' \
  | grep -v '^$' \
  | while IFS= read -r key; do basename "$key"; done \
  | sort -u > "$reserved_basename_file"

for ignored in "${IGNORED_BASENAMES[@]}"; do
  sed -i.bak "/^${ignored}$/d" "$reserved_basename_file" && rm -f "${reserved_basename_file}.bak"
done

if [[ ! -s "$reserved_basename_file" ]]; then
  echo "[WARN] No comparable basenames found under reserved prefixes (only index.html?)."
  exit 0
fi

collisions=()
while IFS= read -r file; do
  rel_path="${file#"$DIST_DIR"/}"
  base_name="${rel_path##*/}"
  for ignored in "${IGNORED_BASENAMES[@]}"; do
    [[ "$base_name" == "$ignored" ]] && continue 2
  done
  if grep -Fxq "${base_name}" "$reserved_basename_file"; then
    collisions+=("$rel_path")
  fi
done < <(find "$DIST_DIR" -type f | sort)

if [[ ${#collisions[@]} -gt 0 ]]; then
  echo "[ERROR] filename collisions detected between VitePress build and app-owned S3 paths"
  echo "Check list (dist path -> basename):"
  for item in "${collisions[@]}"; do
    echo "  - $item"
  done
  exit 1
fi

echo "[OK] No filename collisions found against s3://${SITE_BUCKET}/"
