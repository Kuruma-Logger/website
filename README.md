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
- `/troubleshooting/` トラブル対応（FAQ統合）
- `/updates/` 更新情報
- `/contact/` 問い合わせフォーム
- `/legal/` 法務情報

## Markdown で更新するページ

以下のページは Markdown ファイルを直接編集できます。

- `/` -> `site/index.md`
- `/setup/` -> `site/setup/index.md`
- `/troubleshooting/` -> `site/troubleshooting/index.md`
- `/updates/` -> `site/updates/index.md`
- `/contact/` -> `site/contact/index.md`
- `/legal/` -> `site/legal/index.md`

## VitePress 構成

- サイトルート: `site/`
- 設定: `site/.vitepress/config.ts`
- テーマ拡張: `site/.vitepress/theme/`
- 問い合わせフォーム: `site/.vitepress/theme/components/ContactForm.vue`
- セットアップ用アセット: `site/setup/`
