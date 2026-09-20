import type { Copy } from "./i18n";

/**
 * Research and automation work — the projects that have no public URL, so the
 * case study has to carry the mechanism instead of a screenshot.
 *
 * Everything here is taken from the implementation, not from memory:
 * github.com/bbbyk105/okada_lab (the FastAPI service and the DSA domain code)
 * and github.com/bbbyk105/protein-flexibility-platform (the three-tier
 * platform it grew into).
 */

/** One stage of a pipeline: what goes in, what comes out. */
export type PipelineStep = {
  n: string;
  title: Copy;
  body: Copy;
  /** The concrete artefact this stage hands to the next one. */
  out?: string;
};

/** A tier of the system and what it is responsible for. */
export type Layer = { name: string; role: Copy; stack: string[] };

export type CodeBlock = { label: string; filename: string; lines: string[] };

export type Research = {
  slug: string;
  index: string;
  name: string;
  title: string[];
  kind: Copy;
  sector: Copy;
  role: Copy;
  year: string;
  place?: Copy;
  repo?: string;
  statement: Copy;
  brief: Copy[];
  pipeline: PipelineStep[];
  layers?: Layer[];
  outputs: Copy[];
  code?: CodeBlock;
  stack: string[];
  notes: string[];
};

export const research: Research[] = [
  {
    slug: "protein-flexibility",
    index: "R.01",
    name: "Protein Flexibility Analysis",
    title: ["PROTEIN", "FLEXIBILITY"],
    kind: { en: "University research / Structural biology", ja: "大学研究 / 構造生物学" },
    sector: { en: "Research software", ja: "研究用ソフトウェア" },
    role: {
      en: "Analysis design, engine implementation, API and interface",
      ja: "解析設計、エンジン実装、API、インターフェース",
    },
    year: "2025—2026",
    place: { en: "Gakushuin University / Okada Lab", ja: "学習院大学 / 岡田研究室" },
    repo: "https://github.com/bbbyk105/protein-flexibility-platform",
    statement: {
      en: "DSA — Distance Structure Analysis. Given one UniProt ID, it gathers every solved structure of that protein and measures how much each pair of residues moves between them, without ever superposing the structures.",
      ja: "DSA（Distance Structure Analysis）。UniProt IDをひとつ与えると、そのタンパク質について解かれた構造をすべて集め、残基ペアごとに構造間でどれだけ動いているかを測ります。構造を重ね合わせる必要はありません。",
    },
    brief: [
      {
        en: "The question is which parts of a protein are rigid and which are flexible. The usual way to answer it is to superpose structures on one another, but superposition needs a reference frame, and the answer changes with the frame you pick.",
        ja: "タンパク質のどの部分が硬く、どの部分が柔らかいのかを知りたい、という問いから始まっています。通常は構造同士を重ね合わせて答えを出しますが、重ね合わせには基準系が必要で、どの基準を選ぶかによって答えが変わってしまいます。",
      },
      {
        en: "Distances between Cα atoms do not have that problem: the distance between two residues is the same however the structure is rotated or translated. So the analysis works entirely in distance space. For every pair of residues it collects the Cα–Cα distance across all the structures, then takes the mean and the standard deviation of that distance. A pair whose distance barely changes across dozens of structures is rigid; one whose distance scatters is flexible.",
        ja: "Cα原子間の距離にはその問題がありません。2つの残基の距離は、構造をどう回転・平行移動させても変わらないからです。そこで解析はすべて距離空間で行います。残基ペアごとに全構造でのCα–Cα距離を集め、その平均と標準偏差を取ります。何十という構造を通して距離がほとんど変わらないペアは硬く、ばらつくペアは柔らかい、と判定できます。",
      },
      {
        en: "The hard part is not the arithmetic — it is getting comparable data. The same protein appears in the PDB as dozens of entries with different chains, different constructs, engineered mutations, chimeras, expression tags, missing residues and inconsistent numbering. Most of the code exists to reconcile all of that against one UniProt sequence before a single distance is computed.",
        ja: "難しいのは計算そのものではなく、比較できるデータを揃えるところです。同じタンパク質がPDBには何十というエントリとして存在し、チェーンも構築体も異なり、人工変異やキメラ、発現タグ、欠損残基、不揃いな残基番号が混在しています。コードの大部分は、距離を1つも計算しないうちに、それらをUniProtの配列ひとつに対して突き合わせるために存在しています。",
      },
    ],
    pipeline: [
      {
        n: "01",
        title: { en: "Resolve the protein", ja: "タンパク質を解決する" },
        body: {
          en: "Fetch the UniProt entry as XML and read out the accession list, the canonical sequence and every cross-referenced PDB entry with its method and resolution.",
          ja: "UniProtのエントリをXMLで取得し、アクセッション一覧、正規配列、そして相互参照されている全PDBエントリを構造決定法・分解能つきで読み出します。",
        },
        out: "accessions, FASTA, PDB table",
      },
      {
        n: "02",
        title: { en: "Select structures", ja: "構造を絞り込む" },
        body: {
          en: "Keep only the determination methods asked for — X-ray and cryo-EM by default, NMR off, since an NMR ensemble would skew the spread. Explicitly excluded PDB IDs are dropped here, and the run stops early if too few entries survive.",
          ja: "指定された構造決定法だけを残します。既定はX線と クライオ電顕で、NMRはオフです。NMRのアンサンブルはばらつきを歪めるためです。除外指定されたPDB IDもここで落とし、残るエントリが少なすぎれば実行を打ち切ります。",
        },
        out: "PDB ID list",
      },
      {
        n: "03",
        title: { en: "Download and parse", ja: "取得して解析する" },
        body: {
          en: "Pull each structure as mmCIF through Biopython's PDBList and read it with MMCIF2Dict. Atom records are filtered to ATOM only, alternate locations are resolved to one per residue, and the coordinates are cached per PDB ID so a re-run does not re-download.",
          ja: "各構造をmmCIFとしてBiopythonのPDBList経由で取得し、MMCIF2Dictで読みます。原子レコードはATOMのみに絞り、代替配座（altloc）は残基ごとに1つへ解決し、座標はPDB IDごとにキャッシュして再実行時の再ダウンロードを避けます。",
        },
        out: "atom_coord/{pdbid}.csv",
      },
      {
        n: "04",
        title: { en: "Judge each entry", ja: "エントリを判定する" },
        body: {
          en: "Compare the structure's sequence references against UniProt and classify the entry as normal, substitution, chimera or delins. Differences annotated as expression tag, linker, conflict or microheterogeneity are ignored — they are artefacts of crystallography, not real sequence changes.",
          ja: "構造側の配列参照をUniProtと突き合わせ、エントリをnormal / substitution / chimera / delinsに分類します。expression tag、linker、conflict、microheterogeneityと注釈された差分は無視します。これらは結晶学上の産物であって、実際の配列変化ではないためです。",
        },
        out: "normal / substitution / chimera / delins",
      },
      {
        n: "05",
        title: { en: "Align to one sequence", ja: "ひとつの配列に揃える" },
        body: {
          en: "Lay every chain against the UniProt sequence, padding each to the same length from its alignment range. Chains where too few residues actually have coordinates are dropped by a ratio threshold, duplicate residue numbers are collapsed, and chains that will not align after a bounded shift search are discarded with a note.",
          ja: "各チェーンをUniProt配列に対して並べ、アラインメント範囲から同じ長さになるよう前後を詰めます。実際に座標を持つ残基が少なすぎるチェーンは割合の閾値で落とし、重複する残基番号は畳み込み、範囲を区切ったシフト探索でも整合しないチェーンは理由を残して除外します。",
        },
        out: "aligned residue × chain table",
      },
      {
        n: "06",
        title: { en: "Take the Cα coordinates", ja: "Cα座標を取り出す" },
        body: {
          en: "From the cached atom tables, keep only Cα atoms and assemble one matrix of coordinates: every surviving residue position down the rows, every surviving chain across the columns. Rows with any gap are removed, so every pair is measured on exactly the same set of structures.",
          ja: "キャッシュした原子テーブルからCα原子だけを残し、座標の行列を1枚に組み立てます。行は残った残基位置、列は残ったチェーンです。欠けのある行は取り除くので、すべてのペアがまったく同じ構造集合の上で測られます。",
        },
        out: "residue × chain Cα matrix",
      },
      {
        n: "07",
        title: { en: "Measure every pair", ja: "全ペアを測る" },
        body: {
          en: "For each of the N(N−1)/2 residue pairs, compute the Cα–Cα distance in every chain. The inner distance function is JIT-compiled with numba and rounds coordinates to a fixed precision first, so the same input always gives bit-identical output across runs.",
          ja: "N(N−1)/2 通りの残基ペアそれぞれについて、全チェーンでCα–Cα距離を計算します。内側の距離関数はnumbaでJITコンパイルし、先に座標を固定精度へ丸めるため、同じ入力なら実行のたびにビット単位で同じ結果が出ます。",
        },
        out: "pair × chain distance matrix",
      },
      {
        n: "08",
        title: { en: "Score the flexibility", ja: "揺らぎをスコア化する" },
        body: {
          en: "Per pair, take the mean and the population standard deviation of that distance across chains, then divide: score = mean / std. A pair that holds the same distance in every structure gets a high score; one that scatters gets a low one. Averaging the score over all pairs gives the protein a single number, UMF.",
          ja: "ペアごとにチェーン間での距離の平均と母標準偏差を取り、平均÷標準偏差でスコアとします。どの構造でも同じ距離を保つペアは高スコア、ばらつくペアは低スコアです。全ペアで平均すると、そのタンパク質を1つの数値（UMF）で表せます。",
        },
        out: "score, UMF",
      },
      {
        n: "09",
        title: { en: "Detect cis bonds", ja: "cis結合を検出する" },
        body: {
          en: "Any residue pair whose Cα–Cα distance falls under the threshold — about 3.3 Å against the roughly 3.8 Å of a normal trans peptide bond — is a cis peptide bond. These are counted and scored separately, since a cis bond sitting in a flexible region means something different from one in a rigid core.",
          ja: "Cα–Cα距離が閾値を下回る残基ペア（通常のtransペプチド結合の約3.8 Åに対して3.3 Å前後）をcisペプチド結合として検出します。これらは別途カウントしスコア化します。柔らかい領域にあるcis結合と、硬いコアにあるcis結合とでは意味が違うためです。",
        },
        out: "cis count, cis score",
      },
      {
        n: "10",
        title: { en: "Report", ja: "レポートする" },
        body: {
          en: "Emit a heatmap of the pair scores laid out as a residue × residue matrix, a per-residue score for colouring a 3D model, the full pair table as CSV, and a one-row summary — entries, chains, length, mean resolution, UMF, cis statistics — appended to a running CSV so results accumulate across proteins.",
          ja: "ペアスコアを残基×残基の行列として配置したヒートマップ、3Dモデルの着色に使う残基ごとのスコア、ペア表のCSV全量、そしてエントリ数・チェーン数・長さ・平均分解能・UMF・cis統計を1行にまとめたサマリーを出力します。サマリーは追記式のCSVに積み上がり、タンパク質をまたいで結果が蓄積します。",
        },
        out: "heatmap.png, CSV, summary row",
      },
    ],
    layers: [
      {
        name: "Interface",
        role: {
          en: "Takes UniProt IDs and parameters, creates the job, polls it to completion, then renders the result: the structure in a 3D viewer coloured by per-residue score, the score plots, and the heatmap.",
          ja: "UniProt IDとパラメータを受け取ってジョブを作成し、完了までポーリングしたうえで結果を描画します。残基ごとのスコアで着色した3Dビューア、スコアのプロット、ヒートマップを表示します。",
        },
        stack: ["Next.js", "React", "TypeScript", "Mol*", "Recharts", "TanStack Query", "Zustand"],
      },
      {
        name: "Job API",
        role: {
          en: "Splits a batch of UniProt IDs into one job each, assigns an ID, runs the analysis engine as a subprocess under a timeout, persists status and progress, and serves the finished artefacts. Long analyses survive a page reload because the job, not the request, holds the state.",
          ja: "UniProt IDのまとまりを1件ずつのジョブに分割し、IDを振り、解析エンジンをタイムアウト付きのサブプロセスとして実行し、状態と進捗を永続化して、完成した成果物を配信します。状態を持つのはリクエストではなくジョブなので、長い解析でもページを再読み込みして問題ありません。",
        },
        stack: ["Go", "Gin", "UUID"],
      },
      {
        name: "Analysis engine",
        role: {
          en: "The pipeline above, packaged as an installable library with a CLI. It runs on its own from a terminal, which is what makes it usable in the lab without the rest of the platform.",
          ja: "上記のパイプラインを、CLIを備えたインストール可能なライブラリとしてパッケージしたものです。ターミナルから単体で動くので、プラットフォームの他の部分がなくても研究室で使えます。",
        },
        stack: ["Python", "NumPy", "pandas", "Biopython", "numba", "Pydantic", "Click"],
      },
    ],
    outputs: [
      {
        en: "UMF — one number per protein, the mean of mean/std over all residue pairs",
        ja: "UMF — タンパク質ごとに1つの数値。全残基ペアの平均÷標準偏差の平均",
      },
      {
        en: "Pair scores — every residue pair with its mean distance, standard deviation and score",
        ja: "ペアスコア — 全残基ペアの平均距離、標準偏差、スコア",
      },
      {
        en: "Per-residue scores, used to colour the structure in the 3D viewer",
        ja: "残基ごとのスコア。3Dビューアで構造を着色するのに使用",
      },
      {
        en: "A residue × residue heatmap of the pair scores",
        ja: "ペアスコアの残基×残基ヒートマップ",
      },
      {
        en: "Cis peptide bonds: count, mean distance, spread and score",
        ja: "cisペプチド結合の個数、平均距離、ばらつき、スコア",
      },
      {
        en: "A summary row per run — entries, chains, length covered, mean resolution — appended to a cumulative CSV",
        ja: "実行ごとのサマリー行（エントリ数、チェーン数、カバーした長さ、平均分解能）を累積CSVに追記",
      },
    ],
    code: {
      label: "Python",
      filename: "score.py",
      lines: [
        "# One row per residue pair, one column per chain.",
        "dis   = distance.iloc[:, 2:]",
        "means = dis.mean(axis='columns')",
        "stds  = dis.std(axis='columns', ddof=0)",
        "",
        "# Hold the same distance everywhere -> high score.",
        "score = means / stds",
      ],
    },
    stack: [
      "Python",
      "NumPy",
      "pandas",
      "Biopython",
      "numba",
      "FastAPI",
      "Go",
      "Gin",
      "Next.js",
      "Mol*",
    ],
    notes: ["UniProt / PDB", "Cα distances", "mmCIF", "UMF"],
  },
  {
    slug: "workflow-automation",
    index: "R.02",
    name: "Workflow Automation",
    title: ["WORKFLOW", "AUTOMATION"],
    kind: { en: "Workflow automation / API integration", ja: "業務自動化 / API連携" },
    sector: { en: "Client operations", ja: "クライアント業務" },
    role: {
      en: "Process mapping, integration, implementation, operation",
      ja: "業務整理、連携設計、実装、運用",
    },
    year: "2025—2026",
    statement: {
      en: "Automation for client operations — taking the repetitive parts of how a business already works and connecting them so they run without anyone re-typing anything.",
      ja: "クライアントの業務自動化です。すでにある業務の繰り返し部分を取り出し、誰も入力し直さずに回るようつなぎます。",
    },
    brief: [
      {
        en: "These are not greenfield systems. The work starts from a process a business already runs by hand — an enquiry that gets copied into a spreadsheet, a document that gets produced from that spreadsheet, a notification someone remembers to send — and replaces the copying with an integration.",
        ja: "ゼロから作るシステムではありません。すでに手作業で回っている業務から始めます。問い合わせをスプレッドシートに転記し、そこから書類を作り、誰かが忘れずに通知を送る、といった流れの「転記」の部分を連携に置き換えます。",
      },
      {
        en: "The scope is deliberately small per step and explicit about what happens when something fails, because an automation that silently drops a record is worse than the manual process it replaced.",
        ja: "1ステップあたりの範囲は意図的に小さくし、失敗したときに何が起きるかを明示します。記録を黙って取りこぼす自動化は、置き換えたはずの手作業より悪いからです。",
      },
    ],
    pipeline: [
      {
        n: "01",
        title: { en: "Map the process as it is", ja: "現状の業務を書き出す" },
        body: {
          en: "Write down what actually happens today, including the steps people do not think of as steps. The parts worth automating are usually the ones described as \"and then I just…\".",
          ja: "今実際に起きていることを、本人が手順だと思っていない部分まで含めて書き出します。自動化する価値があるのは、たいてい「あとはちょっと〜するだけ」と説明される部分です。",
        },
      },
      {
        n: "02",
        title: { en: "Pick the trigger", ja: "起点を決める" },
        body: {
          en: "Decide what starts the flow — a form submission, an inbound email, a row appearing, a schedule — and make that the single entry point, so there is one place to look when something did not run.",
          ja: "フォーム送信、受信メール、行の追加、スケジュールなど、何が処理を開始するかを決め、それを唯一の入口にします。動かなかったときに見る場所がひとつで済みます。",
        },
      },
      {
        n: "03",
        title: { en: "Connect the systems", ja: "システムをつなぐ" },
        body: {
          en: "Wire the steps together across whatever the business already uses, with the transforms between them written explicitly rather than assumed.",
          ja: "すでに使っているツールをまたいで各ステップをつなぎます。あいだの変換は暗黙にせず、明示的に書きます。",
        },
      },
      {
        n: "04",
        title: { en: "Handle the failure case", ja: "失敗時を設計する" },
        body: {
          en: "Decide what a failed run does: retry, notify, or park the record for a human. Every flow has to end somewhere a person can see.",
          ja: "失敗した実行がどうなるかを決めます。リトライするか、通知するか、人が見る場所に退避させるか。どの処理も、人が確認できる場所で終わる必要があります。",
        },
      },
      {
        n: "05",
        title: { en: "Hand it over", ja: "引き渡す" },
        body: {
          en: "Leave the client able to see what ran, what did not, and how to change the parts that will need changing.",
          ja: "何が動いて何が動かなかったか、そして今後変えたくなる部分をどう変えるかが、クライアント側で分かる状態にして引き渡します。",
        },
      },
    ],
    outputs: [
      { en: "Manual re-entry removed from the steps that had it", ja: "転記が発生していた工程から手入力をなくす" },
      { en: "One entry point per flow, and one place to check a run", ja: "処理ごとに入口をひとつ、実行を確認する場所もひとつ" },
      { en: "Explicit failure handling rather than silent drops", ja: "黙って取りこぼさない、明示的な失敗時の扱い" },
    ],
    stack: ["Python", "FastAPI", "n8n", "REST APIs"],
    notes: ["n8n", "API integration", "Scheduled jobs"],
  },
];

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);
