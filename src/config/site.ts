export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Kuruma-Logger サポート",
  description:
    "Kuruma-Logger のセットアップ、FAQ、トラブルシューティング、問い合わせをまとめたサポートサイト。",
  language: "ja",
  githubReleasesUrl: "https://github.com/Kuruma-Logger/oss/releases",
  licenseServerUrl: (import.meta.env.PUBLIC_LICENSE_SERVER_URL || "").trim(),
  formspreeEndpoint: (import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "").trim()
};

export const navItems: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "セットアップ", href: "/setup/" },
  { label: "FAQ", href: "/faq/" },
  { label: "トラブル対応", href: "/troubleshooting/" },
  { label: "更新情報", href: "/updates/" },
  { label: "問い合わせ", href: "/contact/" },
  { label: "法務情報", href: "/legal/" }
];

export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
