# Kuruma-Logger Support Website

Kuruma-Logger のサポートサイトです。GitHub Pages へ静的配信します。

## 技術スタック

- Astro (static output)
- GitHub Actions + GitHub Pages
- Formspree（ログイン不要の問い合わせフォーム）

## ローカル開発

```bash
npm install
npm run dev
```

## 環境変数

`.env.example` をコピーして必要な値を設定してください。

- `PUBLIC_FORMSPREE_ENDPOINT`
  - 例: `https://formspree.io/f/xxxxxxxx`
  - 未設定時は問い合わせフォームが送信不可になります。
- `PUBLIC_SITE_URL`
  - 任意。OGP などで使うサイト URL。
- `PUBLIC_BASE_PATH`
  - 任意。プロジェクトページ配信時のベースパス（例: `/website`）。

## GitHub 側設定

Repository Variables に以下を設定してください。

- `PUBLIC_FORMSPREE_ENDPOINT`

設定後、`main` へマージすると `.github/workflows/deploy-pages.yml` が実行され、GitHub Pages に公開されます。

## ページ構成

- `/` ホーム
- `/setup/` セットアップガイド
- `/troubleshooting/` トラブル対応（FAQ統合）
- `/updates/` 更新情報
- `/contact/` 問い合わせフォーム
- `/legal/` 法務情報

## Markdown で更新するページ

以下のページは Markdown ファイルを直接編集できます。

- `/setup/` -> `src/pages/setup/index.md`
- `/troubleshooting/` -> `src/pages/troubleshooting/index.md`
- `/updates/` -> `src/pages/updates/index.md`
- `/legal/` -> `src/pages/legal/index.md`
