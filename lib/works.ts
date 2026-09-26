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
      en: "Planning, UI/UX, mobile and backend development, data design, release and operation",
      ja: "企画、UI/UX、モバイル・バックエンド開発、データ設計、リリース・運用",
    },
    year: "2026",
    url: "https://caroot.app",
    statement: {
      en: "A calorie and nutrition app where logging a meal is one photograph. AI splits the plate into individual dishes, and a correction you make once is applied to that dish from then on.",
      ja: "食事の記録を写真1枚で終わらせるための、カロリー・栄養管理アプリ。AIが料理を品目ごとに見分け、一度直した内容はその料理に次回から自動で適用されます。",
    },
    brief: [
      {
        en: "Calorie counting does not fail because people lack willpower; it fails because typing in every meal is tedious. CaRoot exists to remove that step. It is my own product, developed end to end — planning, UI/UX, the app, the backend, the AI features, the data design and the App Store release.",
        ja: "カロリー計算が続かないのは意志が弱いからではなく、毎食入力するのが面倒だからです。CaRootはその工程をなくすために作りました。企画、UI/UX、アプリ、バックエンド、AI機能、データ設計、App Storeのリリースまで一貫して開発している個人プロダクトです。",
      },
      {
        en: "There are five ways in. Photograph the meal and it is broken into dishes; scan a barcode; photograph a nutrition label; search; or type it. Search covers roughly 8,500 menu items from 56 restaurant chains' published nutrition data and about 2,500 entries from Japan's official food composition tables — in English it switches to around 7,800 USDA entries. Products with no barcode record yet can be added by whoever scans them first, so the product database grows with use.",
        ja: "入口は5つあります。写真を撮れば品目ごとに分解され、バーコードをかざし、栄養成分表示を撮り、検索し、あるいは手で入力します。検索の対象は、56ブランドの外食チェーンが公表する栄養データ約8,500メニューと、日本食品標準成分表（八訂）約2,500件です。英語表示ではUSDAの約7,800件に切り替わります。まだバーコードの登録がない商品は最初にスキャンした人が登録でき、商品データベースは使われるほど育ちます。",
      },
      {
        en: "Around the log sit the things that make it a habit: targets computed from body composition and goal, a diary, calendar and analytics view, weight and water, a photo roll, streaks, weekly reports and meal reminders. There is a social side too — posts, follows, leaderboards and invite codes — and the app funds itself through a subscription and a one-off ad-free purchase.",
        ja: "記録のまわりには、習慣にするための仕組みを置いています。体組成と目標から算出する目標値、日記・カレンダー・分析のビュー、体重と水分、写真一覧、連続記録、週間レポート、食事リマインダー。投稿・フォロー・ランキング・招待コードといったソーシャル面もあり、サブスクリプションと広告オフの買い切りで運営しています。",
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
        title: { en: "A correction is made once", ja: "直すのは一度だけ" },
        body: {
          en: "When an estimate is wrong, the corrected figures are stored against the normalised dish name and reapplied every time that dish appears. It also learns the alias: if the model calls something 醤油つけ麺 and you rename it, the correction is keyed to what the model said and mapped to what you called it, so the next photo of it comes back with your name and your numbers. Corrections with nothing in them are not learned, and saving a total without a breakdown clears the old breakdown rather than leaving it to contradict the total.",
          ja: "推定が違っていたら、直した数値を正規化した料理名に紐づけて保存し、その料理が出るたびに再適用します。別名も学習します。モデルが「醤油つけ麺」と呼んだものを別の名前に直した場合、モデルが言った名前をキーに、ユーザーが付けた名前を値として保存するので、次に同じ料理を撮ると名前も数値もユーザーのものが返ります。中身が空の補正は学習せず、内訳なしで合計だけ保存したときは古い内訳を消します。合計と矛盾した内訳が残らないようにするためです。",
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
        title: { en: "Every way in is optional", ja: "どの入口も必須ではない" },
        body: {
          en: "Photo analysis, barcodes and label reading can all fail — a bad photo, an unlisted product, a label that will not read — so search and manual entry are first-class paths rather than fallbacks. The app stays fully usable when the analysis service is unreachable, which is also why the food tables ship inside the app instead of behind an API.",
          ja: "写真解析もバーコードもラベル読み取りも失敗しえます（写真が悪い、未収録の商品、読めないラベル）。そのため検索と手入力は代替手段ではなく対等な経路として用意しています。解析サービスに到達できなくてもアプリは問題なく使え、食品データをAPIの向こうではなくアプリ内に同梱しているのも同じ理由です。",
        },
      },
      {
        title: { en: "The subscription tier is not client state", ja: "課金状態はクライアントの状態ではない" },
        body: {
          en: "Rows are separated per user by row-level security in the database. The subscription tier lands there from the store's webhook and is write-protected, so it cannot be set from the app — the paywall is a consequence of the data, not a check in the UI. Invite rewards work the same way: redeeming a code runs as a database function that refuses a second redemption, rather than as a client that promises not to ask twice.",
          ja: "データはデータベースの行レベルセキュリティでユーザーごとに分離しています。課金プランはストアのWebhook経由で書き込まれ、書き換えから保護されているので、アプリ側からは設定できません。ペイウォールはUIのチェックではなく、データの結果として成立します。招待の報酬も同じ考え方で、コードの引き換えはデータベース関数として実行し、2回目を関数側で拒否します。クライアントが二重に要求しないと約束する形にはしていません。",
        },
      },
    ],
    built: [
      {
        en: "AI meal-photo analysis that splits a plate into dishes, with every estimate editable on the spot",
        ja: "料理を品目ごとに分解するAI写真解析と、その場で編集できる推定値",
      },
      {
        en: "Barcode scanning, nutrition-label reading, and user-contributed records for products not yet listed",
        ja: "バーコードスキャン、栄養成分表示の読み取り、未登録商品のユーザー登録",
      },
      {
        en: "Bundled food data: ~8,500 menu items from 56 restaurant chains, ~2,500 from Japan's composition tables, ~7,800 USDA entries in English",
        ja: "同梱の食品データ：外食56ブランド約8,500メニュー、日本食品標準成分表 約2,500件、英語表示ではUSDA 約7,800件",
      },
      {
        en: "Per-dish correction learning, including the alias between what the model called it and what you call it",
        ja: "料理ごとの補正学習（モデルの呼び名とユーザーの呼び名の対応づけを含む）",
      },
      {
        en: "Calorie and PFC targets derived from body composition, activity and goal, adjustable by hand",
        ja: "体組成・活動量・目標から導くカロリー / PFC目標と、手動での微調整",
      },
      {
        en: "Diary, calendar, analytics, weight and water logs, photo roll, streaks, weekly reports and meal reminders",
        ja: "日記、カレンダー、分析、体重・水分の記録、写真一覧、連続記録、週間レポート、食事リマインダー",
      },
      {
        en: "A social layer — posts, follows, leaderboards, invite codes — with rewards granted server-side",
        ja: "ソーシャル機能（投稿、フォロー、ランキング、招待コード）と、サーバー側で付与する報酬",
      },
      {
        en: "Subscription and one-off purchase handled through the store webhook, ads, Japanese / English, and account deletion",
        ja: "ストアのWebhook経由で扱うサブスクリプションと買い切り、広告、日本語・英語対応、アカウント削除",
      },
    ],
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "NativeWind",
      "Zustand",
      "Supabase",
      "PostgreSQL",
      "Edge Functions",
      "Gemini",
      "RevenueCat",
    ],
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
    slug: "fujisan",
    index: "04",
    name: "Fujisan Sake",
    title: ["FUJISAN", "SAKE"],
    client: { en: "Kondo Pharmacy Co., Ltd. — 株式会社近藤薬局", ja: "株式会社近藤薬局" },
    sector: { en: "Commerce / Sake", ja: "EC / 日本酒" },
    kind: { en: "Commerce / Sake", ja: "EC / 日本酒" },
    place: { en: "Fuji, Shizuoka", ja: "静岡県富士市" },
    role: {
      en: "Design, development, payments and stock, admin, bilingual, SEO, operation",
      ja: "デザイン、開発、決済・在庫、管理画面、多言語対応、SEO、運用",
    },
    year: "2026",
    url: "https://sakefujisan.com",
    statement: {
      en: "A store for the Bushido series, five sakes made at the foot of Mt Fuji. Retail orders from individuals and a trade channel that shows wholesale prices only to approved stockists run on the same site.",
      ja: "富士山麓の日本酒「武士道シリーズ」を販売するECサイト。個人向けの通販と、審査を通った取扱店にだけ卸価格を出す法人向けの導線を、ひとつのサイトに収めました。",
    },
    brief: [
      {
        en: "The Bushido series is five sakes made with Mt Fuji spring water and rice from Hyogo and Shizuoka. Alongside a page for each one, the site carries the water, the rice and the brewing, food pairings and a guide for stockists, in Japanese and English.",
        ja: "武士道シリーズは、富士山の湧水と兵庫・静岡の酒米で造る5銘柄の日本酒です。銘柄ごとの商品ページに加え、水・米・造りの読みもの、料理との合わせ方、取扱店向けの案内を日本語と英語で掲載しています。",
      },
      {
        en: "There are two ways to buy. An individual goes from the cart to Stripe's payment page; a business registers as a stockist, and once approved sees wholesale prices and a price list by the case. Because this is mail-order alcohol, the site confirms the buyer is over 20, carries the underage-drinking notice and publishes the disclosures Japan's specified commercial transactions law requires.",
        ja: "購入の導線は2つあります。個人のお客様はカートからStripeの決済ページへ進み、法人のお客様は取扱店として登録し、審査が通ると卸価格とケース単位の価格表を見られるようになります。酒類の通信販売なので、20歳以上であることの確認、未成年飲酒防止の表示、特定商取引法にもとづく表記を備えています。",
      },
      {
        en: "The side that runs the shop is built too. The admin opens on sales, orders that need attention and stock warnings, and from the browser covers shipping and refunds, prices and stock, stockist approval, enquiries and inviting staff. I handled it end to end: design, implementation, payments and stock, the admin, SEO, deployment and operation.",
        ja: "お店を回す側の画面も作りました。管理画面を開くと売上、対応が必要な注文、在庫の警告が並び、発送と返金、価格と在庫の変更、取扱店の審査、問い合わせへの対応、スタッフの招待までをブラウザで行えます。デザインと実装から、決済と在庫、管理画面、SEO、デプロイと運用まで一貫して担当しています。",
      },
    ],
    mechanism: [
      {
        title: { en: "The last bottle is not sold twice", ja: "最後の1本を2人に売らない" },
        body: {
          en: "Stock is reserved when the customer goes to pay and taken off the shelf once payment is confirmed. Taking it off only at confirmation leaves the few minutes on the payment page open, and in them several people can buy the same last bottle. Not overselling rests on one UPDATE that only succeeds while on-hand minus reserved still covers the quantity; D1 has no interactive transactions, so when one line of a multi-line order comes up short, the lines already reserved are put back. Checkout sessions expire after 30 minutes, Stripe's minimum, so an abandoned payment does not hold stock for a day.",
          ja: "決済ページへ進んだ時点で在庫を引き当て、入金が確定してから棚の数を減らします。確定時に減らすだけでは、決済ページにいる数分のあいだに、同じ最後の1本を何人も買えてしまうためです。売り越さないことは「在庫から引当分を引いた数が注文数以上」を条件にした1文のUPDATEで担保しています。D1には対話的なトランザクションがないので、複数の明細の途中で足りなくなったら、それまでに積んだ分を戻します。放棄された決済が在庫を丸1日押さえないよう、決済の有効期限はStripeの下限の30分にしています。",
        },
      },
      {
        title: { en: "Wholesale prices open on approval, not on sign-up", ja: "卸価格は登録ではなく審査で開く" },
        body: {
          en: "Registering as a business is self-declared, so it shows nothing on its own. What opens wholesale pricing is an approved stockist review, and an account with no review on record counts as unapproved. If the review cannot be read, the prices stay hidden: a price once shown cannot be taken back. A liquor licence number is required only of retailers and wholesalers — a restaurant or inn pouring on the premises is not selling alcohol and needs none, and a required field that does not match the business turns away the right customers and invites made-up answers.",
          ja: "法人としての登録は自己申告なので、登録しただけでは卸価格は見えません。表示の条件は取扱店の審査が承認済みであることで、審査の記録がないアカウントは未承認として扱います。審査状況を読めなかったときも、見せない側に倒します。一度表示した価格は取り消せないためです。酒類販売業免許の番号を必須にしているのは小売店と卸売店だけで、店内で提供する飲食店や宿泊施設には求めません。実態に合わない必須項目は正しい相手を弾き、嘘の入力を招くからです。",
        },
      },
      {
        title: { en: "The webhook confirms an order, exactly once", ja: "注文の確定はWebhookで、1回だけ" },
        body: {
          en: "Stripe may deliver the same event more than once. The order is confirmed by an UPDATE that only moves a pending order to confirmed, and only the delivery that actually made that change takes the stock and sends the emails. A failed email does not fail the webhook — the order is confirmed either way, so it is logged instead; Stripe is only asked to retry when the confirmation itself could not be written. Refunds and chargebacks raised from the Stripe dashboard come back the same way, with full and partial refunds recorded against the order.",
          ja: "Stripeは同じイベントを複数回送ってくることがあります。注文は「未確定の注文だけを確定にする」条件付きのUPDATEで確定させ、実際に更新できた最初の1回だけが在庫を落とし、メールを送ります。メールが送れなくても注文は確定しているので、エラーは返さず記録だけ残します。Stripeに再送させるのは、確定そのものをデータベースに書けなかったときだけです。Stripeのダッシュボードから行った返金やチャージバックも同じ経路で受け取り、全額・一部の返金額を注文に記録します。",
        },
      },
      {
        title: { en: "Price and stock are kept apart", ja: "価格と在庫は別の表で持つ" },
        body: {
          en: "Sakes, sizes and descriptions live in code; price and stock are overrides in the database, in two separate tables. In one table, correcting a price would create a row with zero stock and sell the item out on the spot. Staff move stock at every count; only the owner can change a price. With no row, the code's value stands, and if the database cannot be read the shop keeps selling at the code's prices. Checkout, the admin and the wholesale price list all read the merged catalogue, so no path is left where a price changed in the admin does not apply.",
          ja: "銘柄・容量・説明はコードに置き、価格と在庫はデータベースで上書きします。この2つは別の表です。同じ表にすると、価格だけ直したつもりで在庫0の行ができ、その場で完売になってしまいます。在庫はスタッフが棚卸しのたびに動かし、価格はオーナーしか変えられません。行がなければコードの値のまま売れ、データベースが読めないときもコードの価格で販売を続けます。決済・管理画面・卸価格表はすべてこの重ね合わせを読むので、管理画面で変えた価格が効かない経路は残りません。",
        },
      },
      {
        title: { en: "The age check is enforced on the server", ja: "年齢確認はサーバーでも行う" },
        body: {
          en: "Age is confirmed when a visitor arrives and again just before payment. The second check does not rest on the checkbox: the server action that starts checkout refuses a request without it, because a server action can be called without the page. The legal disclosures come from a single file, and a value not yet confirmed is left empty rather than filled with a plausible placeholder, which can go live looking like the real thing.",
          ja: "20歳以上であることは、サイトに入るときと、決済の直前の2回確認します。2回目は画面のチェックボックスだけに頼らず、決済を始めるサーバー側の処理が、確認のない要求を拒否します。Server Actionは画面を通さずに直接呼べるためです。法令の表示は1つのファイルを唯一の出どころにし、まだ確定していない値はそれらしい伏せ字で埋めず、空のまま扱います。伏せ字は本物に見えたまま公開されうるからです。",
        },
      },
    ],
    built: [
      {
        en: "Pages for five sakes, reading on the water, the rice and the brewing, food pairings, Japanese / English",
        ja: "5銘柄の商品ページ、水・米・造りの読みもの、料理との合わせ方、日本語・英語対応",
      },
      {
        en: "Accounts with email verification, cart, Stripe Checkout and order confirmation by webhook",
        ja: "メール認証つきの会員登録、カート、Stripe Checkoutによる決済と、Webhookでの注文確定",
      },
      {
        en: "Stockist registration and review, with wholesale prices and a by-the-case price list shown only once approved",
        ja: "取扱店の登録と審査、承認後にだけ表示する卸価格とケース単位の価格表",
      },
      {
        en: "Stock reserved during checkout, and a stock alert sent only when a threshold is crossed",
        ja: "決済中の在庫の引き当てと、しきい値をまたいだときだけ届く在庫の通知",
      },
      {
        en: "Order history, a receipt made for printing, and cancellation requests before shipping",
        ja: "注文の詳細、印刷して使える領収書、発送前のキャンセル依頼",
      },
      {
        en: "An admin with a sales dashboard, order filters and CSV export, packing slips, full and partial refunds, price and stock editing, stockist review, enquiries, and staff invites with two roles",
        ja: "管理画面：売上ダッシュボード、注文の絞り込みとCSV書き出し、納品書、全額・一部返金、価格と在庫の編集、取扱店の審査、問い合わせ、2段階の権限をもつスタッフ招待",
      },
      {
        en: "Age confirmation, the underage-drinking notice and the specified commercial transactions disclosures",
        ja: "年齢確認、未成年飲酒防止の表示、特定商取引法にもとづく表記",
      },
      {
        en: "Rate limiting on sign-in, registration and enquiries, product structured data, per-page metadata and sitemap",
        ja: "ログイン・登録・問い合わせのレート制限、商品の構造化データ、ページごとのメタデータとサイトマップ",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Cloudflare Workers",
      "D1",
      "Drizzle",
      "Better Auth",
      "Stripe",
      "Resend",
      "Tailwind CSS",
      "Jest",
    ],
    screens: { desktop: "/works/fujisan.webp", mobile: "/works/fujisan-mobile.webp" },
  },
  {
    slug: "worx-mt-fuji",
    index: "05",
    name: "worx mt.fuji",
    title: ["WORX", "MT.FUJI"],
    client: { en: "Kikkodo, Kondo Pharmacy — 橘香堂（近藤薬局）", ja: "橘香堂（近藤薬局）" },
    sector: { en: "Coworking / Booking", ja: "コワーキング / 予約" },
    kind: { en: "Coworking / Booking", ja: "コワーキング / 予約" },
    place: { en: "Yoshiwara, Fuji, Shizuoka", ja: "静岡県富士市吉原" },
    role: {
      en: "Design, development, booking system, admin, SEO, operation",
      ja: "デザイン、開発、予約システム、管理画面、SEO、運用",
    },
    year: "2026",
    url: "https://worxmtfuji.com",
    statement: {
      en: "The site for Kikkodo (worx mt.fuji), a coworking space in Yoshiwara, Fuji. Alongside the space and its prices, it takes bookings without an account, gives each customer a page for their bookings without a password, and gives the staff a dashboard to run them.",
      ja: "富士市吉原のコワーキングスペース「橘香堂（worx mt.fuji）」のサイト。施設と料金の案内に、会員登録なしで使える予約、パスワードのいらないマイページ、スタッフ用の予約管理画面を組み合わせました。",
    },
    brief: [
      {
        en: "Kikkodo is a coworking space in Yoshiwara, Fuji, seating 80 and holding 150 standing. It is used by the hour, by monthly members, as a meeting room and as a registered business address, and it is hired out for events or for a whole day. The site covers the space and its equipment, prices, access and common questions, with a page for each way of using it.",
        ja: "橘香堂は富士市吉原にある、着席80名・立席150名まで入るコワーキングスペースです。時間単位のビジター利用、月額の会員、会議室、住所登録のほか、イベントや1日貸切にも使われています。サイトでは空間と設備、料金、アクセス、よくある質問を、利用シーンごとのページに分けて案内しています。",
      },
      {
        en: "Booking takes four steps — the kind of use, a free day and time on the calendar, contact details, a final check — and needs no account. The confirmation email carries a link to that booking, where it can be checked and cancelled until 17:00 the day before. Every booking made with one email address is gathered on a customer page, opened through a sign-in link sent by email.",
        ja: "予約は、利用種別、カレンダーでの日時選択、連絡先の入力、確認の4ステップで、会員登録は求めません。受付メールには予約ごとの確認リンクが付き、そこから内容の確認と、前日17時までのキャンセルができます。同じメールアドレスの予約は、メールで届くログインリンクから開くマイページにまとまります。",
      },
      {
        en: "The staff side is a booking dashboard. It opens on today, the next seven days and what is awaiting confirmation, and covers search by name or phone number, confirming and cancelling, entering bookings taken by phone, moving a date or time, and a note the customer never sees. I handled it end to end: design, implementation, the booking system, the admin, SEO, deployment to Cloudflare and operation.",
        ja: "スタッフ側には予約管理の画面を用意しました。今日・今後7日間・確認待ちの件数から始まり、名前や電話番号での検索、確定とキャンセル、電話で受けた予約の登録、日時の変更、お客様には見えない店内メモまでを扱えます。デザインと実装から、予約の仕組み、管理画面、SEO、Cloudflareへのデプロイと運用まで一貫して担当しています。",
      },
    ],
    mechanism: [
      {
        title: { en: "One slot, one booking", ja: "同じ枠を2人に渡さない" },
        body: {
          en: "What counts as a clash follows how the space is used: visitors and coworking share the floor and never block each other, meeting rooms clash only when their hours overlap, and a day hired out whole blocks everything. The calendar shows only free slots, but a slot can fill between opening the calendar and pressing send, so the server checks again before writing. Two requests arriving together would both pass that check, so after inserting, each reads the day again and backs out if an earlier booking now overlaps it. Earlier means created first, with the ID breaking a tie, so both sides rank the pair the same way and never both back out. The one that loses is removed before any email is sent.",
          ja: "何を重なりとみなすかは、施設の使われ方に合わせています。ビジターやコワーキングはフロアを共有するので互いを妨げず、会議室は時間帯が重なったときだけ、1日貸切はその日のすべての予約とぶつかります。カレンダーには空いている枠しか出しませんが、開いてから送信するまでに埋まることがあるので、サーバーは書き込む前にもう一度確かめます。ほぼ同時に届いた2件はどちらもこの確認を通ってしまうため、登録した後にその日の予約を読み直し、先に入った予約と重なっていれば自分を取り消します。「先」は作成時刻で決め、同時なら予約IDで決めるので、2件の順番の見方が食い違うことはなく、両方が取り消し合うこともありません。取り消す側は、メールを送る前に消えます。",
        },
      },
      {
        title: { en: "Staff are warned, not stopped", ja: "管理画面では止めずに知らせる" },
        body: {
          en: "When staff enter or move a booking that overlaps another, they are warned and can save knowing it is there. After saving, the server checks again, since a web booking or a second member of staff may have taken the slot between the check and the save. Confirming and cancelling only apply to a booking still in the state they expect, so a customer cancelling at the same moment is not overwritten by a confirmation — the staff member is told it has already changed. A customer's cancellation works the same way, and emails go out only when a row actually changed, so a double click does not send two. A cancelled booking cannot be reinstated, because its slot may have gone to someone else; it is entered again instead.",
          ja: "スタッフが登録・変更する予約がほかと重なる場合は、止めずに警告し、承知の上で保存できるようにしています。保存した後にもサーバーで確かめ直します。確認から保存までの間に、Web予約やもう一人のスタッフが同じ枠を押さえているかもしれないためです。確定とキャンセルは、想定した状態のままの予約にだけ効くので、お客様が同じ瞬間にキャンセルした予約を確定で上書きすることはなく、スタッフには状態が変わっていると伝えます。お客様のキャンセルも同じ仕組みで、実際に行が変わったときだけメールを送るので、二重に押しても2通は届きません。キャンセル済みの予約は元に戻せません。その枠がほかの人に渡っているかもしれないため、登録し直す運用にしています。",
        },
      },
      {
        title: { en: "No account, and nothing to store", ja: "アカウントなしで、保存するものもない" },
        body: {
          en: "The link in a confirmation email is the booking's ID with an HMAC signature, so only its recipient can open or cancel it, and nothing is stored to make that work. The cancellation deadline, 17:00 the day before, is computed in Japan time whatever clock the server runs on, across the end of a month or a year. The customer page signs in by email: a 15-minute link, then a 30-day httpOnly cookie, and the two are signed for different purposes so one cannot stand in for the other. The sign-in form gives the same answer whether or not an address has bookings, and sends the email after responding, so not even the response time gives it away.",
          ja: "受付メールのリンクは予約IDにHMACの署名を付けたもので、受け取った本人だけが確認とキャンセルをできます。そのためにデータベースへ何かを保存することはありません。前日17時というキャンセルの締切は、サーバーの時計がどのタイムゾーンでも日本時間で計算し、月末や年末をまたいでも正しく出ます。マイページはメールでログインします。15分有効のリンクから30日間のhttpOnly Cookieに切り替わり、2つは別の用途として署名しているので、互いの代わりには使えません。ログインの画面は、そのアドレスに予約があってもなくても同じ応答を返し、メールは応答した後に送ります。応答時間からも、予約の有無が分からないようにするためです。",
        },
      },
      {
        title: { en: "The admin checks its own gate", ja: "管理画面は入口の外でも確かめる" },
        body: {
          en: "The dashboard sits behind Cloudflare Access, which sends a one-time code to approved addresses. The app does not take that on trust: every admin action verifies the token Access signs — issuer, audience, algorithm and an email on the allow-list — so a policy left misconfigured, or a request sent straight to the workers.dev address, still gets no booking data. With the settings missing it refuses rather than opens. In the database, row-level security is on with no policies and the public roles hold no grants, so names, emails and phone numbers are reachable only from server code with the service key, in modules marked server-only.",
          ja: "管理画面はCloudflare Accessの内側にあり、許可したメールアドレスにだけワンタイムコードが届きます。アプリ側はそれを前提にせず、管理用の操作のたびにAccessが署名したトークンを自分で検証します（発行元、対象、署名方式、許可リストにあるメールアドレス）。Accessの設定が漏れていても、workers.devのアドレスに直接来たリクエストでも、予約データは返りません。設定そのものがなければ、開けずに拒否します。データベースは行レベルセキュリティを有効にしたうえでポリシーを置かず、公開用のロールには権限を与えていません。名前・メール・電話番号に触れられるのは、server-onlyを付けたモジュールでサービスキーを持つサーバーのコードだけです。",
        },
      },
      {
        title: { en: "Pages stay static; data comes through actions", ja: "ページは静的に、データはアクションで" },
        body: {
          en: "It runs on Cloudflare Workers' free plan, which allows 10 ms of CPU per request. With no incremental cache configured, even the pages generated at build time were being rendered again on every request, and past that limit the site answered with Error 1102. Built pages are now served from the static-asset cache without passing through Next.js at all. What depends on the visitor — the customer page, a booking's page, the admin — is read in the browser and fetched through server actions, so the page itself stays static.",
          ja: "動いているのはCloudflare Workersの無料プランで、1リクエストあたりのCPU時間は10msまでです。incremental cacheが未設定だったため、ビルド時に生成したページまでリクエストのたびに描画し直し、この上限を超えてError 1102を返していました。いまは生成済みのページを静的アセットのキャッシュから、Next.jsの処理を通さずに返しています。マイページや予約の確認ページ、管理画面のように見る人によって変わる部分はブラウザ側で読み込み、データはサーバーアクション経由で取るので、ページ自体は静的なままです。",
        },
      },
    ],
    built: [
      {
        en: "Pages for the space, prices, access and common questions, with four more for each way of using it",
        ja: "施設・空間・料金・アクセス・よくある質問のページと、利用シーン別の4つの詳細ページ",
      },
      {
        en: "Four-step booking with live availability, a start-to-end range for meeting rooms and whole-day hire, no account required",
        ja: "空き状況を反映したカレンダー、会議室の開始〜終了の範囲指定、1日貸切に対応した、会員登録のいらない4ステップの予約",
      },
      {
        en: "A confirmation email with a signed link to each booking, and cancellation online until 17:00 the day before",
        ja: "予約ごとの署名付きリンクを載せた受付メールと、前日17時までのWebキャンセル",
      },
      {
        en: "A customer page reached by an emailed sign-in link: upcoming and past bookings, cancellation, and a booking form that opens with the email, name and phone already in",
        ja: "メールのログインリンクで開くマイページ：今後と過去の予約、キャンセル、メールアドレス・名前・電話番号を入れた状態で開く予約フォーム",
      },
      {
        en: "A booking dashboard: today, seven-day and awaiting counts, five views, search, confirm and cancel with an optional email, phone bookings, date changes with an overlap warning, and a staff note",
        ja: "予約管理画面：今日・7日間・確認待ちの件数、5つの表示切替、検索、メール通知を選べる確定とキャンセル、電話予約の登録、重なりを警告する日時変更、店内メモ",
      },
      {
        en: "A contact form with six enquiry types, a notice to the space and a copy to the sender",
        ja: "6種類の問い合わせフォームと、施設への通知・送信者への控え",
      },
      {
        en: "Drawing-style figures of the facilities that draw themselves in and loop in CSS alone, and hold still for anyone who prefers reduced motion",
        ja: "設備と間取りを描いた製図風のSVGと、CSSだけで動く描き出しとループ（動きを減らす設定では静止）",
      },
      {
        en: "Bot checks on every public form, a limit on sign-in emails, LocalBusiness structured data, per-page titles and share cards, and redirects onto one canonical domain",
        ja: "公開フォームすべてのボット対策、ログインメールの送信回数制限、店舗の構造化データ、ページごとのタイトルとSNS表示、正規ドメインへのリダイレクト",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Cloudflare Workers",
      "Cloudflare Access",
      "Supabase",
      "Resend",
      "Turnstile",
      "Tailwind CSS",
      "Jest",
    ],
    screens: { desktop: "/works/worx-mt-fuji.webp", mobile: "/works/worx-mt-fuji-mobile.webp" },
  },
  {
    slug: "jurakuen",
    index: "06",
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
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);

/**
 * The half-width copy of a screen, written by scripts/gen-screens.mjs.
 *
 * The originals are 1600px — right for a retina desktop, four times what a
 * phone can use. Offering both through srcset lets the browser pick.
 */
export const halfWidth = (src: string) => src.replace(/\.webp$/, "-800.webp");
