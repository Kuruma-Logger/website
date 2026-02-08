export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Kuruma-Logger",
  description:
    "Kuruma-Logger の情報をまとめたポータルサイトです。",
  language: "ja",
  formspreeEndpoint: (import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "").trim()
};

export const navItems: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "セットアップ", href: "/setup/" },
  { label: "ファームウェア", href: "/updates/" },
  { label: "よくある質問", href: "/troubleshooting/" },
  { label: "問い合わせ", href: "/contact/" },
  { label: "法務情報", href: "/legal/" }
];

export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || "/";
  const baseWithTrailingSlash = base.endsWith("/") ? base : `${base}/`;
  return `${baseWithTrailingSlash}${normalized}`;
}
