import type { Copy } from "./i18n";

/**
 * Selected work, carried over from Portfolio2026-ver4 and translated.
 * Copy prioritises the project, responsibility and delivered functionality.
 * Technology is supporting information rather than the main story.
 */
export type Work = {
  slug: string;
  index: string;
  name: string;
  /** Display title lines — kept in English, the type treatment depends on it. */
  title: string[];
  client: Copy;
  sector: Copy;
  kind: Copy;
  place?: Copy;
  role: Copy;
  year: string;
  url: string;
  statement: Copy;
  brief: Copy[];
  built: Copy[];
  stack: string[];
  screens: { desktop: string; mobile: string };
};

export const works: Work[] = [
  {
    slug: "caroot",
    index: "01",
    name: "CaRoot",
    title: ["CAROOT"],
    client: { en: "CaRoot — own product", ja: "CaRoot — 自社プロダクト" },
    sector: { en: "Consumer app / Nutrition", ja: "消費者向けアプリ / 栄養管理" },
    kind: { en: "AI / Mobile product", ja: "AI / モバイルプロダクト" },
    place: { en: "iOS & Android", ja: "iOS / Android" },
    role: {
      en: "Planning, UI/UX, development, operations",
      ja: "企画、UI/UX、開発、運用",
    },
    year: "2026",
    url: "https://www.caroot.app",
    statement: {
      en: "A personal calorie and nutrition management app designed to reduce the effort of everyday meal logging.",
      ja: "日々の食事記録の手間を減らすことを目的に設計した、個人向けのカロリー・栄養管理アプリです。",
    },
    brief: [
      {
        en: "CaRoot is a personal product developed from planning through UI/UX, frontend, backend, AI features, database design and App Store release work.",
        ja: "CaRootは、企画からUI/UX、フロントエンド、バックエンド、AI機能、データベース設計、App Storeのリリース対応まで、一貫して開発している個人プロダクトです。",
      },
      {
        en: "Users can analyse a meal from a photo, scan a barcode or read a nutrition label, then manage calories and PFC from the resulting record. The app also supports manual entry, weight and water tracking, weekly reports, meal reminders and Japanese / English use.",
        ja: "写真からの食事解析、バーコードのスキャン、栄養成分表示の読み取りに対応し、その記録からカロリーとPFCを管理できます。手入力、体重・水分の記録、週次レポート、食事リマインダー、日本語・英語での利用にも対応しています。",
      },
      {
        en: "Food data includes Japan's official food composition data and restaurant / chain menu data based on published nutrition information. AI photo analysis is handled through a server-side function, while the core logging features remain available without relying on the photo-analysis connection.",
        ja: "食品データには日本食品標準成分表と、公開されている栄養情報にもとづく飲食店・チェーンのメニューデータを収録しています。AIによる写真解析はサーバーサイドの関数で処理し、写真解析の接続に依存せずとも記録の基本機能は利用できる構成にしています。",
      },
    ],
    built: [
      {
        en: "AI meal-photo analysis with editable calorie and PFC estimates",
        ja: "AIによる食事写真の解析と、カロリー・PFC推定値の編集機能",
      },
      {
        en: "Barcode scanning and nutrition-label photo reading",
        ja: "バーコードスキャンと栄養成分表示の写真読み取り",
      },
      {
        en: "Calorie / PFC targets based on profile, activity and goal settings",
        ja: "プロフィール・活動量・目標設定にもとづくカロリー / PFC目標の算出",
      },
      {
        en: "Manual food entry, weight and water tracking, weekly reports and meal reminders",
        ja: "食事の手入力、体重・水分の記録、週次レポート、食事リマインダー",
      },
      {
        en: "Japanese / English support and App Store release preparation",
        ja: "日本語・英語対応とApp Storeのリリース準備",
      },
      {
        en: "End-to-end product development from planning and UI/UX through frontend, backend and database work",
        ja: "企画・UI/UXからフロントエンド、バックエンド、データベースまでの一貫したプロダクト開発",
      },
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "Gemini"],
    screens: { desktop: "/works/caroot.webp", mobile: "/works/caroot-mobile.webp" },
  },
  {
    slug: "hakuho",
    index: "02",
    name: "Hakuho",
    title: ["HAKUHO"],
    client: { en: "Hakuho Inc. — 株式会社白萌", ja: "株式会社白萌" },
    sector: {
      en: "Manufacturing / Precision machining",
      ja: "製造 / 精密加工",
    },
    kind: { en: "Precision machining / Web", ja: "精密加工 / Web" },
    place: { en: "Shimizu, Shizuoka", ja: "静岡県静岡市清水区" },
    role: {
      en: "Planning, design, development, SEO, launch",
      ja: "企画、デザイン、開発、SEO、公開",
    },
    year: "2026",
    url: "https://www.hakuhofactory.com",
    statement: {
      en: "A corporate website for a precision-machining company, structured to help prospective customers understand capabilities and move directly to a quote request.",
      ja: "精密加工メーカーのコーポレートサイト。加工能力を理解してもらい、そのまま見積依頼につなげる導線で構成しました。",
    },
    brief: [
      {
        en: "Hakuho manufactures more than 24,000 parts a year for over 200 clients. The site organises its machining capabilities, equipment, quality information and production examples so prospective customers can judge whether their requirements can be handled.",
        ja: "白萌は200社を超える取引先に対し、年間24,000点以上の部品を製造しています。加工能力、設備、品質情報、加工事例を整理し、自社の要件に対応できるかを検討中の顧客が判断できる構成にしました。",
      },
      {
        en: "The quote flow accepts drawings and specification files including PDF, DXF, DWG, STEP and IGES, allowing enquiries to arrive with the information needed for an actual manufacturing discussion.",
        ja: "見積フローはPDF、DXF、DWG、STEP、IGESといった図面・仕様ファイルの添付に対応し、実際の製造検討に必要な情報が揃った状態で問い合わせが届くようにしています。",
      },
      {
        en: "I handled the project end to end: requirements and information architecture, UI/UX, frontend and backend implementation, the quote and email flow, SEO, testing and launch.",
        ja: "要件整理と情報設計、UI/UX、フロントエンド・バックエンド実装、見積とメール送信のフロー、SEO、テスト、公開まで一貫して担当しました。",
      },
    ],
    built: [
      {
        en: "Information architecture centred on machining capabilities and quote conversion",
        ja: "加工能力と見積転換を軸にした情報設計",
      },
      {
        en: "Drawing-upload quote form with specification fields and email delivery",
        ja: "図面アップロードと仕様入力、メール送信に対応した見積フォーム",
      },
      {
        en: "Structured presentation of materials, sizes, lot sizes, tolerances, equipment and quality information",
        ja: "材質、サイズ、ロット、公差、設備、品質情報の体系的な掲載",
      },
      { en: "Responsive UI and motion design", ja: "レスポンシブUIとモーションデザイン" },
      {
        en: "SEO foundations including canonical URLs and sitemap",
        ja: "canonical URLやサイトマップを含むSEO基盤の整備",
      },
      {
        en: "Automated tests for key site functionality",
        ja: "主要機能に対する自動テストの整備",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Resend", "Jest"],
    screens: { desktop: "/works/hakuho.webp", mobile: "/works/hakuho-mobile.webp" },
  },
  {
    slug: "goodwill-legal",
    index: "03",
    name: "Goodwill Legal",
    title: ["GOODWILL", "LEGAL"],
    client: {
      en: "行政書士グッドウィル法務事務所",
      ja: "行政書士グッドウィル法務事務所",
    },
    sector: { en: "Professional services / Legal", ja: "士業 / 法務" },
    kind: { en: "Legal / Content platform", ja: "法務 / コンテンツ基盤" },
    place: { en: "Sapporo, Hokkaido", ja: "北海道札幌市" },
    role: {
      en: "Planning, design, development, CMS, SEO, operations",
      ja: "企画、デザイン、開発、CMS、SEO、運用",
    },
    year: "2026",
    url: "https://goodwill-legal.jp",
    statement: {
      en: "A website for a Sapporo administrative scrivener's office, designed to explain its services clearly and connect consultation enquiries with ongoing content publishing.",
      ja: "札幌の行政書士事務所のサイト。サービス内容を明快に伝え、相談の問い合わせと継続的な記事発信をつなぐ設計にしました。",
    },
    brief: [
      {
        en: "The project covers the office's service information, consultation flow, profile and access information together with a continuously updated column section.",
        ja: "事務所のサービス情報、相談の流れ、プロフィール、アクセス情報に加え、継続的に更新するコラムまでを対象としたプロジェクトです。",
      },
      {
        en: "A CMS was introduced so articles can be published and organised without modifying the site code. The enquiry flow sends consultation details to the office and returns a confirmation to the sender.",
        ja: "サイトのコードを触らずに記事の公開と整理ができるようCMSを導入しました。問い合わせフローでは相談内容を事務所へ送信し、送信者には自動で確認メールを返します。",
      },
      {
        en: "I handled the project from site planning and UI/UX through implementation, CMS integration, enquiry functionality, SEO, launch and ongoing maintenance.",
        ja: "サイト企画とUI/UXから実装、CMS連携、問い合わせ機能、SEO、公開、その後の保守まで担当しています。",
      },
    ],
    built: [
      {
        en: "Service and consultation-information pages",
        ja: "サービスと相談情報のページ",
      },
      {
        en: "CMS-based article publishing and category structure",
        ja: "CMSによる記事公開とカテゴリ構造",
      },
      {
        en: "Contact flow with office notification and automatic confirmation",
        ja: "事務所への通知と自動確認メールを備えた問い合わせフロー",
      },
      { en: "Office profile and access information", ja: "事務所プロフィールとアクセス情報" },
      {
        en: "SEO-oriented metadata, sitemap and content structure",
        ja: "SEOを意識したメタデータ、サイトマップ、コンテンツ構造",
      },
      {
        en: "Ongoing maintenance and content-operation support",
        ja: "継続的な保守とコンテンツ運用のサポート",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "microCMS", "Resend", "GSAP"],
    screens: { desktop: "/works/goodwill.webp", mobile: "/works/goodwill-mobile.webp" },
  },
  {
    slug: "jurakuen",
    index: "04",
    name: "Jurakuen",
    title: ["JURAKUEN"],
    client: { en: "聚楽苑 — Jurakuen", ja: "聚楽苑" },
    sector: { en: "Commerce / Organic tea", ja: "EC / 有機栽培茶" },
    kind: { en: "Commerce / Organic tea", ja: "EC / 有機栽培茶" },
    place: { en: "Fuji, Shizuoka", ja: "静岡県富士市" },
    role: {
      en: "Design, development, commerce, multilingual, SEO",
      ja: "デザイン、開発、EC、多言語対応、SEO",
    },
    year: "2025",
    url: "https://www.jurakuen.com",
    statement: {
      en: "A bilingual direct-to-consumer website for an organic tea producer in Fuji, combining brand communication with online purchasing.",
      ja: "富士市の有機栽培茶農家のD2Cサイト。ブランドの発信とオンライン販売を一体にした日英対応のサイトです。",
    },
    brief: [
      {
        en: "The site presents the producer, cultivation and organic JAS information alongside a product catalogue and online purchasing flow. Japanese and English pages allow the same brand and product information to reach both domestic and overseas visitors.",
        ja: "生産者、栽培、有機JASの情報を、商品カタログとオンライン購入の導線とあわせて掲載しています。日本語と英語のページを用意し、同じブランド・商品情報を国内と海外の双方に届けられるようにしました。",
      },
      {
        en: "The commerce flow includes cart and Stripe checkout. Search visibility was addressed through locale-specific canonical URLs, sitemap generation, structured product data and index control for transactional pages.",
        ja: "購入フローはカートとStripeによる決済で構成しています。検索流入については、ロケール別のcanonical URL、サイトマップの自動生成、商品の構造化データ、カート・決済結果ページのインデックス制御で対応しました。",
      },
    ],
    built: [
      {
        en: "Product catalogue, cart and online checkout",
        ja: "商品カタログ、カート、オンライン決済",
      },
      { en: "Japanese / English site structure", ja: "日本語・英語のサイト構造" },
      {
        en: "Producer, cultivation and organic JAS information pages",
        ja: "生産者、栽培、有機JASの情報ページ",
      },
      {
        en: "Product structured data and search-engine metadata",
        ja: "商品の構造化データと検索エンジン向けメタデータ",
      },
      {
        en: "Dynamic sitemap and index control for cart / payment-result pages",
        ja: "動的サイトマップと、カート・決済結果ページのインデックス制御",
      },
      {
        en: "SEO landing pages and internal-link structure for organic tea and matcha searches",
        ja: "有機栽培茶・抹茶の検索に向けたSEOランディングページと内部リンク設計",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Stripe", "next-intl", "Framer Motion"],
    screens: { desktop: "/works/jurakuen.webp", mobile: "/works/jurakuen-mobile.webp" },
  },
  {
    slug: "dmc-fuji",
    index: "05",
    name: "DMC Fuji",
    title: ["DMC", "FUJI"],
    client: { en: "DMC LLC — DMC FUJI", ja: "合同会社DMC — DMC FUJI" },
    sector: {
      en: "Studio / Photography & experience",
      ja: "スタジオ / 撮影・体験",
    },
    kind: { en: "Studio / Photography", ja: "スタジオ / 撮影" },
    place: { en: "Fuji, Shizuoka", ja: "静岡県富士市" },
    role: {
      en: "Design, development, CMS, gallery, multilingual",
      ja: "デザイン、開発、CMS、ギャラリー、多言語対応",
    },
    year: "2025",
    url: "https://www.dmc123.jp",
    statement: {
      en: "A bilingual website for DMC Fuji, bringing its photography and related services into one clear digital experience.",
      ja: "DMC FUJIの日英対応サイト。撮影と関連サービスを、ひとつの分かりやすいデジタル体験にまとめました。",
    },
    brief: [
      {
        en: "The site organises multiple services under one brand while giving photography a central role. Visitors can move between service information, the gallery, articles, access information and enquiries in Japanese or English.",
        ja: "複数のサービスをひとつのブランドのもとに整理しつつ、撮影を中心に据えた構成にしています。サービス情報、ギャラリー、記事、アクセス、問い合わせのあいだを、日本語でも英語でも行き来できます。",
      },
      {
        en: "The implementation includes a managed photo gallery, CMS-backed content and an enquiry flow, allowing the business to update visual and editorial content without rebuilding the site.",
        ja: "管理可能なフォトギャラリー、CMS連携のコンテンツ、問い合わせフローを実装し、サイトを作り直すことなくビジュアルと記事を更新できるようにしました。",
      },
    ],
    built: [
      {
        en: "Service pages and information architecture across the DMC Fuji offering",
        ja: "DMC FUJIの提供サービス全体にわたるページと情報設計",
      },
      {
        en: "Photo gallery backed by managed storage",
        ja: "マネージドストレージを用いたフォトギャラリー",
      },
      { en: "CMS-backed blog and content management", ja: "CMS連携のブログとコンテンツ管理" },
      { en: "Japanese / English page delivery", ja: "日本語・英語でのページ配信" },
      { en: "Contact and enquiry functionality", ja: "問い合わせ機能" },
      { en: "Responsive UI and motion implementation", ja: "レスポンシブUIとモーションの実装" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "microCMS", "next-intl"],
    screens: { desktop: "/works/dmc-fuji.webp", mobile: "/works/dmc-fuji-mobile.webp" },
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
