# カスタムドメイン切替手順書(kuruma-logger.com)

サポートサイトを `https://kuruma-logger.github.io/website/` から `https://kuruma-logger.com/`(apex)へ移行する当日の作業手順。
`www.kuruma-logger.com` は GitHub Pages 側の挙動により apex へリダイレクトされる。

> **重要**: 本手順書を含む準備PR(`feature/phase1-custom-domain`)は、**切替当日・DNS切替後にマージ**すること。
> 先にマージすると CNAME ファイルにより Pages のカスタムドメイン設定が有効化されるが、DNS がまだ CloudFront を向いているため証明書発行に失敗し、サイトが壊れる。

## 前提条件

- [ ] license_server 側 Terraform PR(apex/www を CloudFront エイリアスから外し、Route53 の A/AAAA(apex)を GitHub Pages の IP へ、`www` を `kuruma-logger.github.io` への CNAME へ向ける)が **apply 済み** であること
  - GitHub Pages の apex 用 A レコード: `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
  - AAAA レコード: `2606:50c0:8000::153` / `2606:50c0:8001::153` / `2606:50c0:8002::153` / `2606:50c0:8003::153`
- [ ] DNS 伝播の確認:

  ```sh
  dig +short kuruma-logger.com A
  # → 185.199.108.153 など GitHub Pages の IP 4つが返ること(CloudFront の IP でないこと)
  dig +short www.kuruma-logger.com CNAME
  # → kuruma-logger.github.io. が返ること
  ```

- [ ] Formspree 管理画面で許可オリジンに `https://kuruma-logger.com` を追加済みであること(問い合わせフォームの送信元制限。旧オリジンは検証完了まで残す)

## 1. GitHub Pages のカスタムドメイン設定

```sh
gh api -X PUT repos/Kuruma-Logger/website/pages -f cname=kuruma-logger.com
```

証明書(Let's Encrypt)の発行状況を確認する。`state` が `approved` になるまで待つ(通常数分〜1時間程度)。

```sh
gh api repos/Kuruma-Logger/website/pages --jq '.https_certificate.state'
# → "approved" になるまで繰り返し確認
```

`approved` になったら HTTPS 強制を有効化する。

```sh
gh api -X PUT repos/Kuruma-Logger/website/pages -F https_enforced=true
gh api repos/Kuruma-Logger/website/pages --jq '{cname: .cname, https_enforced: .https_enforced, cert: .https_certificate.state}'
```

## 2. リポジトリ Variables の変更

現状は Variables 未設定で、Actions がリポジトリ名から base=`/website/` を自動推定している。カスタムドメインではルート配信になるため明示的に上書きする。

```sh
gh variable set VITEPRESS_BASE --repo Kuruma-Logger/website --body "/"
gh variable set VITE_SITE_URL --repo Kuruma-Logger/website --body "https://kuruma-logger.com/"
gh variable list --repo Kuruma-Logger/website
```

## 3. 本PRのマージ → デプロイ

```sh
gh pr merge <PR番号> --repo Kuruma-Logger/website --merge
gh run watch --repo Kuruma-Logger/website
# Deploy GitHub Pages ワークフローの完了を確認
```

デプロイ完了後、配信物に CNAME と sitemap が含まれることを確認する。

```sh
curl -s https://kuruma-logger.com/sitemap.xml | head -3
```

## 4. 検証項目

- [ ] `https://kuruma-logger.com/` でトップページが表示される(CSS/画像崩れなし)

  ```sh
  curl -sI https://kuruma-logger.com/ | head -5
  ```

- [ ] 旧 URL からの 301 リダイレクト(GitHub Pages はカスタムドメイン設定時に自動で 301 を返す)

  ```sh
  curl -sI https://kuruma-logger.github.io/website/ | grep -iE "HTTP|location"
  # → 301 + location: https://kuruma-logger.com/ を確認
  curl -sI https://kuruma-logger.github.io/website/setup/ | grep -iE "HTTP|location"
  # → 下層ページも対応するパスへ 301 されること
  curl -sI http://kuruma-logger.com/ | grep -iE "HTTP|location"
  # → HTTPS へ 301 されること(https_enforced 有効後)
  curl -sI https://www.kuruma-logger.com/ | grep -iE "HTTP|location"
  # → apex へ 301 されること
  ```

- [ ] アンカー遷移: ブラウザで既知の不具合ページ等のアンカー付きリンク(例: `https://kuruma-logger.com/known-issues/` 内の目次リンク、更新情報ページからのアンカー付き遷移)が正しくスクロールすること
- [ ] Formspree 送信: `https://kuruma-logger.com/contact/` からテスト送信し、thanks ページへ遷移・メール受信を確認
- [ ] 特商法ページ到達: フッターの「特定商取引法に基づく表記」リンクから `https://kuruma-logger.com/legal/` に到達できること
- [ ] サイト内検索(ローカル検索)が動作すること

## 5. GitHub 組織のドメイン検証(推奨)

ドメイン takeover 防止のため、Kuruma-Logger 組織で `kuruma-logger.com` を verified domain にする。

1. https://github.com/organizations/Kuruma-Logger/settings/verified-domains で「Add a domain」→ `kuruma-logger.com`
2. 表示された TXT レコード(`_github-challenge-kuruma-logger-org.kuruma-logger.com` 等)を Route53 に追加(license_server の Terraform で管理するのが望ましい)
3. 伝播後に「Verify」を実行

## 6. 事後作業

- [ ] Google Search Console にドメインプロパティ `kuruma-logger.com` を追加(DNS TXT で所有権確認 → Route53 に TXT 追加)し、`https://kuruma-logger.com/sitemap.xml` を送信
- [ ] 旧プロパティ(`kuruma-logger.github.io/website/` を登録している場合)でアドレス変更ツールを実行、または当面併存で監視
- [ ] license_server の `support-links.js` の `DEFAULT_SUPPORT_BASE_URL` を `https://kuruma-logger.com/` に更新(**別PR**)
- [ ] FW リリースノートや README 等、旧 URL を参照している箇所の洗い出しと更新

## ロールバック手順

切替後に問題が発生した場合、以下の順で戻す。

1. GitHub Pages のカスタムドメイン設定を解除:

   ```sh
   gh api -X PUT repos/Kuruma-Logger/website/pages -f cname=
   # 解除できない場合は DELETE ではなく null 設定:
   # gh api -X PUT repos/Kuruma-Logger/website/pages --input - <<< '{"cname": null}'
   ```

2. Variables を削除して base 自動推定(`/website/`)に戻す:

   ```sh
   gh variable delete VITEPRESS_BASE --repo Kuruma-Logger/website
   gh variable delete VITE_SITE_URL --repo Kuruma-Logger/website
   ```

3. 本PRを revert してマージ(CNAME ファイルと sitemap hostname を除去)し、再デプロイ:

   ```sh
   gh pr create --repo Kuruma-Logger/website --title "revert: phase1 custom domain" --body "rollback"
   ```

4. license_server 側で Terraform を revert し、Route53 の apex/www を CloudFront エイリアスに戻して apply
5. `dig +short kuruma-logger.com A` で CloudFront の IP に戻ったこと、旧 URL `https://kuruma-logger.github.io/website/` で表示できることを確認
