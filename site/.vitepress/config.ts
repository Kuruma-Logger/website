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
  description: "Kuruma-Logger の情報をまとめたポータルサイトです。",
  srcDir: ".",
  cleanUrls: false,
  base,
  site: siteUrl.replace(/\/$/, ""),
  appearance: false,
  lastUpdated: true,
  head: [["meta", { property: "og:type", content: "website" }]],
  themeConfig: {
    nav: [
      { text: "ホーム", link: "/" },
      { text: "セットアップ", link: "/setup/" },
      { text: "ファームウェア", link: "/updates/" },
      { text: "よくある質問", link: "/troubleshooting/" },
      { text: "問い合わせ", link: "/contact/" },
      { text: "特商法表記", link: "/legal/" }
    ],
    sidebar: [
      {
        text: "サポート",
        items: [
          { text: "セットアップ", link: "/setup/" },
          { text: "トラブル対応", link: "/troubleshooting/" },
          { text: "更新情報", link: "/updates/" },
          { text: "問い合わせ", link: "/contact/" },
          { text: "特商法表記", link: "/legal/" }
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
      message: "Kuruma-Logger Support Site",
      copyright: `Copyright ${new Date().getFullYear()} Kuruma-Logger`
    }
  }
});
