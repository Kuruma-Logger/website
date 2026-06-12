# Kuruma-Logger Support Website

Kuruma-Logger のサポートサイトです。GitHub Pages へ静的配信します。

## 技術スタック

- VitePress
- GitHub Actions + GitHub Pages
- Formspree（ログイン不要の問い合わせフォーム）

## ローカル開発

```bash
npm install
npm run dev
```

## 環境変数

`.env.example` をコピーして必要な値を設定してください。

- `VITE_FORMSPREE_ENDPOINT`
  - 例: `https://formspree.io/f/xxxxxxxx`
  - 未設定時は問い合わせフォームが送信不可になります。
- `VITE_SITE_URL`
  - 任意。OGP などで使うサイト URL。
- `VITEPRESS_BASE`
  - 任意。プロジェクトページ配信時のベースパス（例: `/website/`）。
  - GitHub Actions 上では未設定でもリポジトリ名から自動推定します。

## GitHub 側設定

Repository Variables に以下を設定してください。

- `VITE_FORMSPREE_ENDPOINT`

互換性のため、旧 Astro 構成の `PUBLIC_FORMSPREE_ENDPOINT` / `PUBLIC_SITE_URL` / `PUBLIC_BASE_PATH` も workflow 側でフォールバックします。

設定後、`main` へマージすると `.github/workflows/deploy-pages.yml` が実行され、GitHub Pages に公開されます。

## ページ構成

- `/` ホーム
- `/setup/` セットアップガイド
- `/guide/` 使い方ガイド
- `/troubleshooting/` トラブル対応（FAQ統合）
- `/updates/` 更新情報
- `/contact/` 問い合わせフォーム
- `/legal/` 法務情報

## Markdown で更新するページ

以下のページは Markdown ファイルを直接編集できます。

- `/` -> `site/index.md`
- `/setup/` -> `site/setup/index.md`
- `/guide/` -> `site/guide/index.md`
- `/troubleshooting/` -> `site/troubleshooting/index.md`
- `/updates/` -> `site/updates/index.md`
- `/contact/` -> `site/contact/index.md`
- `/legal/` -> `site/legal/index.md`

## VitePress 構成

- サイトルート: `site/`
- 設定: `site/.vitepress/config.ts`
- テーマ拡張: `site/.vitepress/theme/`
- 問い合わせフォーム: `site/.vitepress/theme/components/ContactForm.vue`
- ページ画像: `site/setup/images/` と `site/guide/images/`（運用ルールは各ディレクトリの README.md）

## 画像・メディアの取り扱いルール

ページ内で参照する画像・動画・図版は、ページディレクトリ配下の `images/` サブフォルダに集約します（例: `site/setup/images/`）。撮り直し時のファイル名カオスを防ぐため、下記ルールに従ってください。

1. **ファイル名は「役割」だけ**（kebab-case、拡張子は lowercase）。連番・日付・バージョン・underscore は名前に含めない。
   - 良い: `gnss-dip-switch.png`、`wifi-setting.mp4` ／ 悪い: `step02_dip-switch.png`、`gnss-dip-switch-v2.png`、`analog_meter.JPG`
2. **撮り直しは同名ファイルを上書き**。VitePress がビルド時に hash 付きファイル名を生成するのでキャッシュは自動で破棄されます。git 履歴も 1 ファイルにまとまります。
3. **画像 (.jpg/.jpeg/.png/.svg) は md から reference-style で参照**。本文に `![alt][img-<role>]` を書き、URL は md 末尾にまとめて宣言します。差し替え時は URL 1 行のみの編集で済みます。
4. **動画 (.mp4) は `<video>` タグで直接記述**。`![alt](video.mp4)` だと `<img>` に変換され再生されないため、`<video controls width="100%" src="./images/<file>.mp4" title="..."></video>` の形で書きます。

セットアップページの実例とマニフェスト（label と用途の対応表）は [`site/setup/images/README.md`](./site/setup/images/README.md) を、使い方ガイドページの実例は [`site/guide/images/README.md`](./site/guide/images/README.md) を参照してください。
