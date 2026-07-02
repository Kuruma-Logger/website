import { defineConfig } from "vitepress";

function normalizeBase(value?: string): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;

const base =
  normalizeBase(process.env.VITEPRESS_BASE || process.env.PUBLIC_BASE_PATH) ||
  (isGithubActions && repoName ? `/${repoName}/` : "/");

const siteUrl =
  process.env.VITE_SITE_URL?.trim() ||
  process.env.PUBLIC_SITE_URL?.trim() ||
  (isGithubActions && owner
    ? `https://${owner}.github.io${base === "/" ? "" : base.slice(0, -1)}`
    : "http://localhost:5173");

export default defineConfig({
  lang: "ja",
  title: "Kuruma-Logger",
  titleTemplate: ":title | Kuruma-Logger",
  description: "Kuruma-Logger のセットアップ、使い方、トラブル対応、更新情報をまとめたサポートサイトです。",
  srcDir: ".",
  srcExclude: ["**/images/README.md"],
  cleanUrls: false,
  base,
  site: siteUrl.replace(/\/$/, ""),
  appearance: false,
  lastUpdated: true,
  sitemap: {
    hostname: "https://kuruma-logger.com/"
  },
  head: [["meta", { property: "og:type", content: "website" }]],
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "セットアップ", link: "/setup/" },
      { text: "使い方", link: "/guide/" },
      { text: "トラブル対応", link: "/troubleshooting/" },
      { text: "更新情報", link: "/updates/" },
      { text: "マイページ", link: "https://app.kuruma-logger.com/portal/" },
      { text: "問い合わせ", link: "/contact/" }
    ],
    sidebar: [
      {
        text: "サポート",
        items: [
          { text: "セットアップ", link: "/setup/" },
          { text: "使い方ガイド", link: "/guide/" },
          { text: "トラブル対応", link: "/troubleshooting/" },
          { text: "既知の不具合", link: "/known-issues/" },
          { text: "更新情報", link: "/updates/" },
          { text: "問い合わせ", link: "/contact/" }
        ]
      }
    ],
    outline: {
      level: [2, 4],
      label: "このページの目次"
    },
    search: {
      provider: "local"
    },
    footer: {
      message: `<a href="${base}legal/">特定商取引法に基づく表記</a>`,
      copyright: `Copyright ${new Date().getFullYear()} Kuruma-Logger`
    }
  }
});
