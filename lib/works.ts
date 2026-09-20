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
  /** How it actually works — taken from the implementation, not the pitch. */
  mechanism: { title: Copy; body: Copy }[];
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
    mechanism: [
      {
        title: { en: "The model never sees a client key", ja: "モデルにクライアントの鍵を渡さない" },
        body: {
          en: "Photo analysis runs in a server-side edge function. The API key is an edge secret, and so are the system prompt and the response schema — the client cannot swap either, which is what keeps the model's scope fixed. The function also enforces the per-tier daily limit, because a limit checked on the device is not a limit.",
          ja: "写真解析はサーバー側のEdge Functionで動きます。APIキーはEdge Secretで、system promptとレスポンススキーマも同様にサーバー所有です。クライアント側から差し替えられないので、モデルの扱う範囲が固定されます。プラン別の1日あたり上限もこの関数で判定します。端末側で確認する上限は上限ではないためです。",
        },
      },
      {
        title: { en: "Writes are queued before they are sent", ja: "送信より先に書き込みを積む" },
        body: {
          en: "Every write goes into a typed queue in local storage first, then to the server; it is removed only on success. Failures — offline, app killed, a transient error — are retried FIFO on the next write, on foreground, and at launch. While the queue is not empty, syncing down from the cloud is suspended, because the cloud is known to be behind. Before this, a failed write vanished silently and the next launch rolled local data back.",
          ja: "書き込みはまずローカルに型付きのキューとして積み、それから送信し、成功したときだけ取り除きます。オフライン、アプリの強制終了、一時的なエラーで失敗した分は、次の書き込み時・フォアグラウンド復帰時・起動時にFIFOで再送します。キューが残っているあいだはクラウドからの取り込みを止めます。クラウドのほうが古いと確定しているからです。これがないと、失敗した書き込みは黙って消え、次回起動時にローカルが巻き戻されていました。",
        },
      },
      {
        title: { en: "Three ways in, and none of them required", ja: "入口は3つ、どれも必須ではない" },
        body: {
          en: "A meal can be logged from a photo, a barcode or a nutrition label. All three can fail — a bad photo, an unknown product, a label that will not read — so manual entry is a first-class path, not a fallback. The app stays fully usable when the analysis service is unreachable.",
          ja: "食事は写真、バーコード、栄養成分表示のいずれからでも記録できます。3つとも失敗しうる（写真が悪い、未収録の商品、読めないラベル）ので、手入力は代替手段ではなく対等な経路として用意しています。解析サービスに到達できなくても、アプリは問題なく使えます。",
        },
      },
      {
        title: { en: "The subscription tier is not client state", ja: "課金状態はクライアントの状態ではない" },
        body: {
          en: "Rows are separated per user by row-level security in the database. The subscription tier lands there from the store's webhook and is write-protected, so it cannot be set from the app — the paywall is a consequence of the data, not a check in the UI.",
          ja: "データはデータベースの行レベルセキュリティでユーザーごとに分離しています。課金プランはストアのWebhook経由で書き込まれ、書き換えから保護されているので、アプリ側からは設定できません。ペイウォールはUIのチェックではなく、データの結果として成立します。",
        },
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
    mechanism: [
      {
        title: { en: "The form is built to receive drawings", ja: "図面を受け取る前提のフォーム" },
        body: {
          en: "The quote form accepts PDF, DXF, DWG, STEP and IGES alongside spreadsheets and documents, because plenty of enquiries arrive as a spec sheet rather than a drawing. Attachments are capped at three files and 4 MB total, which keeps a submission inside the platform's request body limit instead of failing at the edge with nothing to show the sender.",
          ja: "見積フォームはPDF、DXF、DWG、STEP、IGESに加え、表計算や文書も受け付けます。図面ではなく仕様書で届く相談が少なくないためです。添付は3点・合計4MBまでに制限しています。プラットフォームのリクエストボディ上限の内側に収め、送信者に何も返せないまま失敗することを避けるためです。",
        },
      },
      {
        title: { en: "The enquiry arrives ready to answer", ja: "そのまま返信できる形で届く" },
        body: {
          en: "Submission goes through a server action to the mail API, with the sender set as the reply-to address — so the office replies to the notification itself rather than copying an address out of it. The sender gets an automatic confirmation from the site address at the same time.",
          ja: "送信はサーバーアクション経由でメールAPIへ渡し、返信先に送信者のアドレスを入れています。事務所は届いた通知にそのまま返信でき、本文からアドレスを拾い直す必要がありません。送信者にも同時にサイトのアドレスから自動確認が届きます。",
        },
      },
      {
        title: { en: "Japanese wraps at phrase boundaries", ja: "日本語は文節で折り返す" },
        body: {
          en: "Japanese has no spaces, so a browser will break a line anywhere. Headings are parsed into phrases and given a break opportunity only between them, paired with keep-all so nothing breaks mid-phrase. The break is a zero-width space rather than a <wbr> element: some crawlers and text extractors turn <wbr> into a regular space, which splits a word in the middle of the extracted text.",
          ja: "日本語には語間の空白がないため、ブラウザは任意の位置で改行します。見出しは文節に解析し、文節の切れ目にだけ改行可能点を置き、keep-allと併用して文節の途中では折り返さないようにしています。改行点に<wbr>要素ではなくゼロ幅スペースを使うのは、一部のクローラーやテキスト抽出が<wbr>を半角スペースに変換し、抽出後のテキストで語が途中から分断されてしまうためです。",
        },
      },
      {
        title: { en: "Capability information is structured, not prose", ja: "加工能力は文章ではなく構造で持つ" },
        body: {
          en: "Materials, sizes, lot sizes, tolerances, equipment and quality information are laid out as structured data rather than paragraphs, so a prospective customer can check their requirement against it and reach the quote form in one move.",
          ja: "材質、サイズ、ロット、公差、設備、品質情報は文章ではなく構造化したデータとして配置しています。検討中の顧客が自分の要件と照合し、そのまま見積フォームへ進めるようにするためです。",
        },
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
    mechanism: [
      {
        title: { en: "The CMS client cannot reach the browser", ja: "CMSクライアントはブラウザに届かない" },
        body: {
          en: "The content client is marked server-only, so an accidental import from a client component fails the build rather than shipping the API key in the bundle.",
          ja: "コンテンツ取得のクライアントはサーバー専用として印を付けています。クライアントコンポーネントから誤ってimportした場合、APIキーがバンドルに乗るのではなくビルドが落ちます。",
        },
      },
      {
        title: { en: "Drafts are blocked twice", ja: "下書きは二重で止める" },
        body: {
          en: "The CMS normally returns only published entries, but depending on the key's permissions it can return drafts too. An unpublished article appearing on a legal practice's site is not a cosmetic bug, so the fetch layer filters them out as well rather than trusting the API to have done it.",
          ja: "CMSは通常公開中のコンテンツしか返しませんが、APIキーの権限次第では下書きも返ります。士業のサイトに未公開記事が出るのは見た目の問題では済まないので、API側を信頼せず取得層でも弾いています。",
        },
      },
      {
        title: { en: "The site survives the CMS being down", ja: "CMSが落ちてもサイトは立つ" },
        body: {
          en: "If the content API is unreachable the sitemap is still served from the fixed pages, and with no CMS configured at all the site falls back to fixtures so the build stays green. Pages revalidate on the same interval as the sitemap, so a published article and its sitemap entry appear together.",
          ja: "コンテンツAPIに到達できない場合もサイトマップは固定ページだけで配信します。CMSが未設定の環境ではフィクスチャにフォールバックし、ビルドが通る状態を保ちます。ページの再検証はサイトマップと同じ間隔なので、記事の公開とサイトマップへの掲載が揃います。",
        },
      },
      {
        title: { en: "An enquiry produces two emails", ja: "問い合わせは2通になる" },
        body: {
          en: "One to the office with the consultation details, one back to the sender confirming it arrived — so nobody is left wondering whether a legal enquiry went through.",
          ja: "1通は相談内容を事務所へ、もう1通は届いたことを送信者へ返します。法律の相談を送った人が、送れたのかどうか分からないまま待つことがないようにするためです。",
        },
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
    mechanism: [
      {
        title: { en: "Locale decides the currency", ja: "言語が通貨を決める" },
        body: {
          en: "The checkout session is built per request: the Japanese catalogue prices in yen, the English one in dollars, with line items constructed dynamically rather than held as fixed price objects. One product, two markets, no duplicated catalogue.",
          ja: "決済セッションはリクエストごとに組み立てます。日本語のカタログは円、英語のカタログはドルで、line_itemsを固定の価格オブジェクトではなく動的に構築します。商品はひとつのまま、2つの市場に出せます。",
        },
      },
      {
        title: { en: "The order is confirmed by the webhook, not the browser", ja: "注文を確定するのはブラウザではない" },
        body: {
          en: "Payment events are verified against the signing secret before anything is acted on, and both the immediate completion and the delayed success — convenience-store and bank transfer payments that settle days later — are handled. The receipt is sent from the webhook, so it arrives whether or not the customer ever returned to the success page.",
          ja: "決済イベントは署名シークレットで検証してから処理します。即時の完了だけでなく、コンビニ払いや銀行振込のように後日確定する決済も扱います。領収書はWebhook側から送るので、購入者が完了ページに戻ってきたかどうかに関係なく届きます。",
        },
      },
      {
        title: { en: "No automatic language redirect", ja: "言語による自動リダイレクトはしない" },
        body: {
          en: "Browser language detection is switched off and the locale is always in the path. A link shared by a Japanese customer opens in Japanese for the person they sent it to, instead of being redirected by that person's browser settings.",
          ja: "ブラウザの言語判定は切ってあり、ロケールは常にURLに含まれます。日本語のページを共有したリンクは、受け取った相手のブラウザ設定でリダイレクトされることなく、日本語のまま開きます。",
        },
      },
      {
        title: { en: "Only the pages worth indexing are indexed", ja: "拾われるべきページだけを出す" },
        body: {
          en: "The sitemap carries both locales, and the transactional pages — cart, payment result — are kept out of it and out of the index, so search results point at products and articles rather than at a stranger's empty cart.",
          ja: "サイトマップは両ロケールを載せ、カートや決済結果といった取引中のページは除外してインデックスからも外します。検索結果が他人の空のカートではなく、商品や記事を指すようにするためです。",
        },
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
    mechanism: [
      {
        title: { en: "The gallery is the storage bucket", ja: "ギャラリーの実体はストレージ" },
        body: {
          en: "Each folder in object storage is a gallery category, listed at request time. Adding photographs to the site means uploading them — no CMS entry to create, no code to change, nothing for the studio to learn beyond dragging files into a folder.",
          ja: "オブジェクトストレージ上のフォルダが、そのままギャラリーのカテゴリです。一覧はリクエスト時に取得します。写真を追加する作業はアップロードだけで、CMSに登録する必要も、コードを触る必要もありません。スタジオ側が覚えることはフォルダに入れることだけです。",
        },
      },
      {
        title: { en: "Photographs go through the image pipeline", ja: "写真は画像パイプラインを通す" },
        body: {
          en: "Storage URLs are served through a proxy route so the framework's image optimisation applies to them — a photography studio's originals are large, and sending them untouched to a phone is the difference between a gallery that loads and one that does not.",
          ja: "ストレージのURLはプロキシ経由で配信し、フレームワークの画像最適化を通します。撮影スタジオの原本は大きく、それをそのまま携帯に送るかどうかが、ギャラリーが開くか開かないかの差になります。",
        },
      },
      {
        title: { en: "Editorial content and photographs are separate systems", ja: "記事と写真は別のシステム" },
        body: {
          en: "Articles live in the CMS, photographs live in storage. They are updated by different people at different rhythms, so coupling them into one editor would have made both harder to maintain.",
          ja: "記事はCMS、写真はストレージに置いています。更新する人も頻度も違うため、ひとつの編集画面にまとめると双方とも運用しづらくなります。",
        },
      },
      {
        title: { en: "One brand, two languages, several services", ja: "ひとつのブランド、2言語、複数サービス" },
        body: {
          en: "Services, gallery, articles, access and enquiries are delivered per locale from one route tree, so the Japanese and English sites cannot drift apart in structure as content is added.",
          ja: "サービス、ギャラリー、記事、アクセス、問い合わせを、ひとつのルート構成からロケールごとに配信しています。コンテンツを足していっても、日本語と英語のサイトの構造がずれていきません。",
        },
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
