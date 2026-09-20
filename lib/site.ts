import type { Copy } from "./i18n";

/**
 * Site-wide copy and navigation, carried over from Portfolio2026-ver4.
 *
 * Oversized display headings stay in English: the type treatment — tight
 * tracking, outlined second line — is the design, and Japanese does not sit in
 * it. Everything a visitor actually needs to read is bilingual.
 */

export const site = {
  name: "BYAKKO KONDO",
  url: "https://byakko-engineer.com",
  role: { en: "ENGINEER / CREATIVE DEVELOPER", ja: "エンジニア / クリエイティブデベロッパー" },
  place: { en: "TOKYO, JAPAN", ja: "東京, 日本" },
  email: "byakkokondo@gmail.com",
  github: "https://github.com/bbbyk105",
  year: "2026",
};

export type NavItem = { label: string; sub: Copy; href: string; index: string };

export const navItems: NavItem[] = [
  { label: "HOME", sub: { en: "Home", ja: "ホーム" }, href: "/", index: "00" },
  { label: "WORK", sub: { en: "Selected work", ja: "実績" }, href: "/works", index: "01" },
  { label: "ABOUT", sub: { en: "About me", ja: "経歴・できること" }, href: "/about", index: "02" },
  { label: "CONTACT", sub: { en: "Get in touch", ja: "お問い合わせ" }, href: "/contact", index: "03" },
];

/** Small recurring labels. */
export const ui = {
  caseStudy: { en: "CASE STUDY", ja: "ケーススタディ" },
  allWorks: { en: "ALL WORKS", ja: "実績一覧" },
  viewProject: { en: "VIEW PROJECT", ja: "サイトを見る" },
  getInTouch: { en: "GET IN TOUCH", ja: "お問い合わせ" },
  backToTop: { en: "BACK TO TOP", ja: "ページ上部へ" },
  next: { en: "NEXT", ja: "次の実績" },
  client: { en: "CLIENT", ja: "クライアント" },
  sector: { en: "SECTOR", ja: "領域" },
  role: { en: "ROLE", ja: "担当" },
  year: { en: "YEAR", ja: "年" },
  live: { en: "LIVE", ja: "公開中" },
  desktop: { en: "DESKTOP", ja: "デスクトップ" },
  mobile: { en: "MOBILE", ja: "モバイル" },
  navigation: { en: "NAVIGATION", ja: "ナビゲーション" },
  available: { en: "AVAILABLE FOR PROJECTS", ja: "ご相談を受け付けています" },
};

export const tech = [
  "TYPESCRIPT",
  "PYTHON",
  "NEXT.JS",
  "REACT",
  "REACT NATIVE",
  "EXPO",
  "FASTAPI",
  "SUPABASE",
  "POSTGRESQL",
  "DOCKER",
  "N8N",
  "GSAP",
];

export type CapabilityGroup = { label: Copy; items: string[] };

export const capabilityGroups: CapabilityGroup[] = [
  { label: { en: "LANGUAGES", ja: "言語" }, items: ["TypeScript", "Python"] },
  { label: { en: "WEB", ja: "Web" }, items: ["Next.js", "React"] },
  { label: { en: "MOBILE", ja: "モバイル" }, items: ["React Native", "Expo", "Supabase"] },
  {
    label: { en: "BACKEND / AUTOMATION", ja: "バックエンド / 自動化" },
    items: ["FastAPI", "PostgreSQL", "Docker", "n8n"],
  },
];

export const home = {
  eyebrow: {
    en: "BYAKKO KONDO / ENGINEER / CREATIVE DEVELOPER",
    ja: "近藤白虎 / エンジニア / クリエイティブデベロッパー",
  },
  intro: {
    en: "I design and build digital products, web experiences and automation systems — from research prototypes to production services.",
    ja: "デジタルプロダクト、Web体験、業務自動化のシステムを設計・開発しています。研究用のプロトタイプから、実運用のサービスまで。",
  },
  exploreWork: { en: "EXPLORE WORK", ja: "実績を見る" },
  aboutLede: {
    en: "I work across product development, web engineering, research software and workflow automation.",
    ja: "プロダクト開発、Webエンジニアリング、研究用ソフトウェア、業務自動化を横断して手がけています。",
  },
  aboutBio: [
    {
      en: "My background began in life science at Gakushuin University. In the Okada Lab, I worked on protein-structure analysis using inter-carbon distances and developed software to automate structural-data workflows.",
      ja: "学習院大学理学部生命科学科で生命科学を学びました。岡田研究室では炭素間距離を用いたタンパク質の構造解析に取り組み、構造データ処理を自動化するソフトウェアも開発しました。",
    },
    {
      en: "After practical engineering experience at Letterfan and Drumroll, I moved into freelance engineering. I now build mobile products, corporate platforms, commerce systems, backend integrations and automation.",
      ja: "レターファン株式会社、Drumroll株式会社での実務経験を経て、フリーランスエンジニアとして独立。現在はモバイルプロダクト、コーポレートサイト、EC、バックエンド連携、自動化まで幅広く開発しています。",
    },
    {
      en: "Alongside client work, I develop CaRoot. Since August 2026, I have also served as a director of NPO Proud, supporting IT and web initiatives.",
      ja: "クライアントワークと並行してCaRootを開発しています。2026年8月からはNPO法人プラウドの理事として、IT・Web領域の取り組みを支援しています。",
    },
  ],
  timeline: [
    {
      span: "2025—26",
      title: { en: "GAKUSHUIN UNIVERSITY", ja: "学習院大学" },
      note: { en: "Life Science / Okada Lab", ja: "生命科学 / 岡田研究室" },
    },
    {
      span: "2026",
      title: { en: "FREELANCE ENGINEER", ja: "フリーランスエンジニア" },
      note: { en: "Products / Web / Systems", ja: "プロダクト / Web / システム" },
    },
    {
      span: "2026—",
      title: { en: "CAROOT", ja: "CAROOT" },
      note: { en: "Founder / Product Developer", ja: "創業 / プロダクト開発" },
    },
    {
      span: "2026.08—",
      title: { en: "NPO PROUD", ja: "NPO法人プラウド" },
      note: { en: "Director / IT & Web", ja: "理事 / IT・Web" },
    },
  ],
};

export const works_page = {
  lede: {
    en: "Products and sites I designed and built end to end, from the information architecture to the deploy — each one live, each one in use. Open a case study for what was built and how.",
    ja: "情報設計からデプロイまで、一貫して設計・開発したプロダクトとサイトです。いずれも公開中で、実際に使われています。何をどう作ったかはケーススタディをご覧ください。",
  },
  meta: {
    en: "FIVE PRODUCTS IN PRODUCTION",
    ja: "稼働中のプロダクト5件",
  },
  practiceNote: {
    en: "UNIVERSITY RESEARCH / NO PUBLIC URL",
    ja: "大学研究 / 公開URLなし",
  },
};

export const about = {
  lede: {
    en: "I work across product development, web engineering, research software and workflow automation — taking ideas from requirements and structure through design, implementation and operation.",
    ja: "プロダクト開発、Webエンジニアリング、研究用ソフトウェア、業務自動化を横断しています。要件整理と構造づくりから、デザイン、実装、運用までを一貫して担当します。",
  },
  profile: [
    {
      en: "My background began in life science at Gakushuin University. In the Okada Lab, I worked on protein-structure analysis using inter-carbon distances and developed software to automate parts of the structural-data workflow.",
      ja: "学習院大学理学部生命科学科で生命科学を学びました。岡田研究室では炭素間距離を用いたタンパク質の構造解析に取り組み、構造データ処理の一部を自動化するソフトウェアも開発しました。",
    },
    {
      en: "After gaining practical experience through レターファン株式会社 and Drumroll株式会社, I moved into freelance engineering. Today my work ranges from mobile products and corporate websites to commerce, backend integrations and automation. I prefer to stay involved across the full path from understanding the problem to shipping and maintaining the final system.",
      ja: "レターファン株式会社、Drumroll株式会社での実務経験を経て、フリーランスエンジニアとして独立しました。現在はモバイルプロダクト、コーポレートサイトからEC、バックエンド連携、自動化まで幅広く手がけています。課題の理解から、公開してその後を保守するところまで、通して関わることを大切にしています。",
    },
    {
      en: "Alongside client work, I develop my own products including CaRoot. Since August 2026, I have also served as a director of NPO Proud, supporting its IT and web initiatives and helping coordinate development of a monitoring service for older adults.",
      ja: "クライアントワークと並行して、CaRootをはじめとする自分のプロダクトを開発しています。2026年8月からはNPO法人プラウドの理事として、IT・Web領域の取り組みと、高齢者向け見守りサービスの開発推進を支援しています。",
    },
  ],
  whatIDo: [
    { en: "PRODUCT PLANNING AND INFORMATION ARCHITECTURE", ja: "プロダクト企画・情報設計" },
    { en: "UI/UX AND FRONTEND ENGINEERING", ja: "UI/UX・フロントエンド開発" },
    { en: "MOBILE APPLICATION DEVELOPMENT", ja: "モバイルアプリ開発" },
    { en: "BACKEND AND API INTEGRATION", ja: "バックエンド・API連携" },
    { en: "RESEARCH SOFTWARE AND DATA PIPELINES", ja: "研究用ソフトウェア・データパイプライン" },
    { en: "WORKFLOW AUTOMATION", ja: "業務自動化" },
    { en: "DEPLOYMENT, SEO AND ONGOING PRODUCT OPERATION", ja: "デプロイ・SEO・継続的な運用" },
  ],
  journeyNote: {
    en: "UNIVERSITY → FREELANCE / RESEARCH / PRODUCT / NPO",
    ja: "大学 → フリーランス / 研究 / プロダクト / NPO",
  },
};

export type JourneyEntry = { year: Copy; title: Copy; body: Copy };

export const journey: JourneyEntry[] = [
  {
    year: { en: "UNIVERSITY", ja: "大学" },
    title: { en: "GAKUSHUIN UNIVERSITY / OKADA LAB", ja: "学習院大学 / 岡田研究室" },
    body: {
      en: "Studied life science and worked on software for protein-structure analysis, comparing structures through inter-carbon distances and automating structural-data retrieval and processing from sources including UniProt and PDB.",
      ja: "生命科学を学び、タンパク質の構造解析ソフトウェアに取り組みました。炭素間距離による構造の比較に加え、UniProtやPDBなどからの構造データ取得・処理を自動化しました。",
    },
  },
  {
    year: { en: "EARLY CAREER", ja: "実務経験" },
    title: { en: "レターファン株式会社 / Drumroll株式会社", ja: "レターファン株式会社 / Drumroll株式会社" },
    body: {
      en: "Gained practical development experience through レターファン株式会社 and Drumroll株式会社 before moving into independent client work.",
      ja: "レターファン株式会社、Drumroll株式会社で実務の開発経験を積み、その後、個人でのクライアントワークへ移りました。",
    },
  },
  {
    year: { en: "2025—", ja: "2025年—" },
    title: { en: "FREELANCE ENGINEER", ja: "フリーランスエンジニア" },
    body: {
      en: "Designing and building production websites, commerce experiences, automation workflows and digital systems for clients. Work spans requirements, information architecture, UI/UX, frontend and backend implementation, deployment and ongoing operation.",
      ja: "クライアント向けに、実運用のWebサイト、EC、業務自動化、デジタルシステムを設計・開発しています。要件整理、情報設計、UI/UX、フロントエンド・バックエンド実装、デプロイ、継続運用までが担当範囲です。",
    },
  },
  {
    year: { en: "2026—", ja: "2026年—" },
    title: { en: "PRODUCT DEVELOPMENT", ja: "プロダクト開発" },
    body: {
      en: "Building CaRoot, a personal calorie and nutrition management product, from planning and UI/UX through mobile development, backend systems, AI features, data design and release operations.",
      ja: "個人向けのカロリー・栄養管理プロダクトCaRootを開発しています。企画とUI/UXから、モバイル開発、バックエンド、AI機能、データ設計、リリース運用までを担当しています。",
    },
  },
  {
    year: { en: "2026.08—", ja: "2026年8月—" },
    title: { en: "NPO PROUD / DIRECTOR", ja: "NPO法人プラウド / 理事" },
    body: {
      en: "Supporting IT and web initiatives as a director, including website development and a monitoring-service project for older adults, with responsibility spanning product and project coordination.",
      ja: "理事としてIT・Web領域の取り組みを支援しています。Webサイト開発や高齢者向け見守りサービスのプロジェクトを含め、プロダクトと開発推進の両面を担当しています。",
    },
  },
];

export const contact = {
  lede: {
    en: "Tell me what you are working on, what you need, and where the project currently stands. I will reply by email.",
    ja: "取り組まれていること、必要としていること、プロジェクトの現在地をお聞かせください。メールでご返信します。",
  },
  note: { en: "REPLY BY EMAIL / JAPANESE / ENGLISH", ja: "メールで返信 / 日本語・英語対応" },
  form: {
    name: { en: "NAME", ja: "お名前" },
    namePlaceholder: { en: "Your name", ja: "お名前" },
    email: { en: "EMAIL", ja: "メールアドレス" },
    company: { en: "COMPANY / ORGANISATION", ja: "会社・組織名" },
    companyPlaceholder: { en: "Optional", ja: "任意" },
    subject: { en: "SUBJECT", ja: "件名" },
    subjectPlaceholder: {
      en: "What would you like to discuss?",
      ja: "ご相談の概要を一言で",
    },
    message: { en: "MESSAGE", ja: "本文" },
    messagePlaceholder: {
      en: "Project, scope, timeline, or anything else that would help me understand the enquiry.",
      ja: "プロジェクトの内容、必要な機能、スケジュールなど、ご相談の背景が分かる情報をお書きください。",
    },
    sendTo: { en: "SEND TO BYAKKO KONDO", ja: "近藤白虎 宛に送信" },
    send: { en: "SEND MESSAGE", ja: "メールを作成" },
    hint: {
      en: "THIS OPENS A PRE-FILLED DRAFT IN YOUR MAIL CLIENT.",
      ja: "内容を入力したメールの下書きが、お使いのメールアプリで開きます。",
    },
    sent: {
      en: "MAIL DRAFT OPENED IN YOUR CLIENT — SEND IT TO REACH ME.",
      ja: "メールの下書きを開きました。そのまま送信してください。",
    },
    defaultSubject: { en: "Project enquiry", ja: "ご相談" },
  },
  links: [
    { label: { en: "EMAIL", ja: "メール" }, value: site.email, href: `mailto:${site.email}` },
    { label: { en: "GITHUB", ja: "GITHUB" }, value: "github.com/bbbyk105", href: site.github },
  ],
};
