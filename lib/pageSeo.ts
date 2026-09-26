import type { Copy } from "./i18n";

/**
 * Title and description per page, in both languages.
 *
 * Japanese leads with the word someone would actually search — 制作実績,
 * 経歴, お問い合わせ — and keeps the name in it, because a portfolio's
 * strongest query is the person's own name. English keeps the Latin brand
 * forward for the same reason.
 */
export type PageSeo = { title: Copy; description: Copy; shareTitle: Copy };

export const pageSeo: Record<"home" | "works" | "about" | "contact" | "notFound", PageSeo> = {
  home: {
    title: {
      ja: "近藤白虎 — 東京のフリーランスエンジニア | Byakko Kondo",
      en: "Byakko Kondo — Engineer / Creative Developer in Tokyo",
    },
    shareTitle: {
      ja: "近藤白虎 — 東京のフリーランスエンジニア",
      en: "Byakko Kondo — Engineer / Creative Developer",
    },
    description: {
      ja: "東京のフリーランスエンジニア 近藤白虎。モバイルアプリ、Web・EC、研究用ソフトウェア、業務自動化を、企画から実装・運用まで一貫して開発します。",
      en: "Byakko Kondo, a freelance engineer in Tokyo. Mobile apps, web and commerce, research software and workflow automation — taken from the idea through to release and operation.",
    },
  },
  works: {
    title: {
      ja: "制作実績 — 公開・運用中のプロダクト6件 | 近藤白虎",
      en: "Works — Six products in production | Byakko Kondo",
    },
    shareTitle: { ja: "制作実績 — 近藤白虎", en: "Works — Byakko Kondo" },
    description: {
      ja: "公開・運用中のプロダクト6件のケーススタディ。栄養管理アプリ、精密加工メーカー、行政書士事務所、コワーキングスペースの予約サイト、日本酒と有機茶の通販 — 設計から実装・リリースまで担当しました。",
      en: "Six products in production: a nutrition app, a precision-machining company, a legal office, a sake store, a coworking space taking bookings online and an organic tea store — designed and built end to end.",
    },
  },
  about: {
    title: {
      ja: "近藤白虎の経歴とできること | Byakko Kondo",
      en: "About — Byakko Kondo, engineer and creative developer",
    },
    shareTitle: { ja: "経歴とできること — 近藤白虎", en: "About — Byakko Kondo" },
    description: {
      ja: "近藤白虎の経歴とできること。生命科学の研究からエンジニアリングへ。モバイル、Web、バックエンド、業務自動化までの担当領域と使用技術をまとめています。",
      en: "How the work got here: from life science research into engineering, and the ground it now covers — mobile, web, backend and workflow automation.",
    },
  },
  contact: {
    title: {
      ja: "お問い合わせ — 開発・Web制作のご相談 | 近藤白虎",
      en: "Contact — Product, web and automation projects | Byakko Kondo",
    },
    shareTitle: { ja: "お問い合わせ — 近藤白虎", en: "Contact — Byakko Kondo" },
    description: {
      ja: "プロダクト開発、Webサイト制作、業務自動化のご相談はこちらから。東京を拠点に、個人・法人どちらのご依頼も受け付けています。",
      en: "Get in touch about product development, web engineering and workflow automation. Based in Tokyo, working with companies and individuals alike.",
    },
  },
  notFound: {
    title: { ja: "ページが見つかりません — 近藤白虎", en: "Page not found — Byakko Kondo" },
    shareTitle: { ja: "ページが見つかりません", en: "Page not found" },
    description: {
      ja: "お探しのページは見つかりませんでした。",
      en: "The page you asked for does not exist.",
    },
  },
};

/** A case study's title, which opens on the product's own name. */
export const workTitle = (name: string): Copy => ({
  ja: `${name} — 制作実績 | 近藤白虎`,
  en: `${name} — Works | Byakko Kondo`,
});

export const researchTitle = (name: string): Copy => ({
  ja: `${name} — 研究開発の実績 | 近藤白虎`,
  en: `${name} — Research | Byakko Kondo`,
});

export const shareName = (name: string): Copy => ({
  ja: `${name} — 近藤白虎`,
  en: `${name} — Byakko Kondo`,
});
