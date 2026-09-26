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

/** `href` is the language-neutral path; "" is the home page. */
export const navItems: NavItem[] = [
  { label: "HOME", sub: { en: "Home", ja: "ホーム" }, href: "", index: "00" },
  { label: "WORKS", sub: { en: "Selected work", ja: "実績" }, href: "/works", index: "01" },
  { label: "ABOUT", sub: { en: "About me", ja: "経歴・できること" }, href: "/about", index: "02" },
  { label: "CONTACT", sub: { en: "Get in touch", ja: "お問い合わせ" }, href: "/contact", index: "03" },
];

/** Small recurring labels. */
export const ui = {
  caseStudy: { en: "CASE STUDY", ja: "ケーススタディ" },
  allWorks: { en: "ALL WORKS", ja: "実績一覧" },
  viewProject: { en: "VIEW PROJECT", ja: "サイトを見る" },
  getInTouch: { en: "GET IN TOUCH", ja: "お問い合わせ" },
  profile: { en: "PROFILE & SKILLS", ja: "経歴・できること" },
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

/** The capabilities grid on the home page. Sixteen entries, so it fills a 4x4. */
export const tech = [
  "TYPESCRIPT",
  "PYTHON",
  "GO",
  "NEXT.JS",
  "REACT",
  "REACT NATIVE",
  "EXPO",
  "GSAP",
  "FASTAPI",
  "SUPABASE",
  "POSTGRESQL",
  "DOCKER",
  "STRIPE",
  "N8N",
  "CLAUDE CODE",
  "CODEX",
];

/**
 * The marquee. Same list minus React Native, which has no mark of its own —
 * it ships React's atom, and two identical atoms scrolling past read as a
 * duplicate rather than as two tools. Expo carries the mobile side here.
 */
export const tickerTech = tech.filter((t) => t !== "REACT NATIVE");

export type CapabilityGroup = { label: Copy; items: string[] };

export const capabilityGroups: CapabilityGroup[] = [
  { label: { en: "LANGUAGES", ja: "言語" }, items: ["TypeScript", "Python", "Go"] },
  { label: { en: "WEB", ja: "Web" }, items: ["Next.js", "React", "GSAP"] },
  { label: { en: "MOBILE", ja: "モバイル" }, items: ["React Native", "Expo", "Supabase"] },
  {
    label: { en: "BACKEND / AUTOMATION", ja: "バックエンド / 自動化" },
    items: ["FastAPI", "PostgreSQL", "Docker", "Stripe", "n8n"],
  },
  {
    label: { en: "AI-ASSISTED DEVELOPMENT", ja: "AI を使った開発" },
    items: ["Claude Code", "Codex"],
  },
];

export type Capability = {
  index: string;
  /** A generated mark in public/lottie; see scripts/gen-lottie.mjs. */
  mark: string;
  title: Copy;
  body: Copy;
  items: string[];
};

/**
 * The homepage opens on what I can take on rather than on a list of past
 * work — the case studies are one click away on /works, and a visitor who
 * has not decided what they need yet is not served by five screenshots.
 */
export const capabilities: Capability[] = [
  {
    index: "01",
    mark: "/lottie/product.json",
    title: { en: "PRODUCT DEVELOPMENT", ja: "プロダクト開発" },
    body: {
      en: "An idea taken through to a released app: information architecture, screens, data model, store submission. One Expo codebase covers iOS and Android, so a feature is built once.",
      ja: "アイデアの整理から画面設計、データ構造、ストア申請まで通して引き受けます。iOS と Android は Expo で1つのコードから出すので、機能をつくるのは一度で済みます。",
    },
    items: ["React Native", "Expo", "Supabase", "TypeScript"],
  },
  {
    index: "02",
    mark: "/lottie/web.json",
    title: { en: "WEB ENGINEERING", ja: "Web・フロントエンド" },
    body: {
      en: "Corporate sites, landing pages and commerce, from the information design to the deploy — with the load speed, the search traffic and the motion treated as part of the build, not as an afterthought.",
      ja: "コーポレートサイト、LP、EC を情報設計からデプロイまで。表示速度・検索流入・動きの設計も、後付けではなく制作の一部として組み込みます。",
    },
    items: ["Next.js", "React", "GSAP", "Stripe"],
  },
  {
    index: "03",
    mark: "/lottie/research.json",
    title: { en: "RESEARCH SOFTWARE", ja: "研究用ソフトウェア" },
    body: {
      en: "Tools that take the manual work out of research data — reading the files, running the calculation, plotting the result. The protein-structure pipeline I wrote at university is the shape of it.",
      ja: "研究データの手作業をなくすツールをつくります。ファイルの読み込み、計算、結果の可視化まで。大学で書いたタンパク質の構造解析パイプラインがその原型です。",
    },
    items: ["Python", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    index: "04",
    mark: "/lottie/automation.json",
    title: { en: "WORKFLOW AUTOMATION", ja: "業務自動化" },
    body: {
      en: "The manual steps of a business wired together: a form that reaches the right person, services that talk to each other, jobs that run on a schedule and say something when they fail.",
      ja: "手で回している業務をつなぎます。問い合わせを担当者まで届ける、サービス同士を連携させる、定期実行して失敗したら知らせる、といったところまで。",
    },
    items: ["n8n", "Docker", "Claude Code", "Codex"],
  },
];

export const home = {
  eyebrow: {
    en: "BYAKKO KONDO / FREELANCE ENGINEER / CREATIVE DEVELOPER",
    ja: "近藤白虎 / フリーランスエンジニア / クリエイティブデベロッパー",
  },
  intro: {
    en: "I design and build digital products, web experiences and automation systems — from research prototypes to production services.",
    ja: "デジタルプロダクト、Web体験、業務自動化のシステムを設計・開発しています。研究用のプロトタイプから、実運用のサービスまで。",
  },
  exploreWork: { en: "WHAT I CAN DO", ja: "できることを見る" },
  canDoSide: {
    en: "PRODUCT / WEB / RESEARCH / AUTOMATION",
    ja: "プロダクト / Web / 研究 / 自動化",
  },
  canDoWorks: {
    en: "Six products built this way are live and in daily use.",
    ja: "この内容でつくったプロダクト6件が、いまも公開・運用されています。",
  },
  aboutMore: {
    en: "The route from life science into engineering, and the whole stack behind it.",
    ja: "生命科学からエンジニアリングまでの経緯と、扱える技術の全体。",
  },
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
    en: "SIX PRODUCTS IN PRODUCTION",
    ja: "稼働中のプロダクト6件",
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
