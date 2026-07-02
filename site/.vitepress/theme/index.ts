import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import ContactForm from "./components/ContactForm.vue";
import "./custom.css";

// site-integration (2026-07-03): apex(kuruma-logger.com)はVitePressコンテンツと、
// 別アプリ(Fastify製、/portal/ /flash/ /admin/)が同一ドメインを共有している。
// VitePressのクライアントルーターは同一オリジンのリンクを「自分のページ」と
// 誤認してSPA遷移を試み、対応するページデータが無いため404表示になる不具合が
// 発生した(URLは変わるが中身が更新されない。リロードすると実際のページに
// 正しく入れる)。個別リンクへの target 属性付与だけだと将来の追加漏れに
// 弱いため、ルーター側で該当パスへの遷移を一括でハードナビゲーションに
// フォールバックさせる。
const APP_OWNED_PATH_PREFIXES = ["/portal/", "/flash/", "/admin/"];

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component("ContactForm", ContactForm);

    const originalOnBeforeRouteChange = router.onBeforeRouteChange;
    router.onBeforeRouteChange = async (to) => {
      const path = to.split(/[?#]/)[0];
      if (APP_OWNED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))) {
        window.location.href = to;
        return false;
      }
      return originalOnBeforeRouteChange?.(to);
    };
  }
} satisfies Theme;
