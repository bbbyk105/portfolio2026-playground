/**
 * Site-wide copy and navigation, carried over from Portfolio2026-ver4 and
 * rewritten into the Digital Playground register (uppercase display type,
 * monospace meta, numbered sections).
 */

export const site = {
  name: "BYAKKO KONDO",
  role: "ENGINEER / CREATIVE DEVELOPER",
  place: "TOKYO, JAPAN",
  email: "byakkokondo@gmail.com",
  github: "https://github.com/bbbyk105",
  year: "2026",
};

export type NavItem = { label: string; href: string; index: string };

export const navItems: NavItem[] = [
  { label: "HOME", href: "/", index: "00" },
  { label: "WORK", href: "/works", index: "01" },
  { label: "ABOUT", href: "/about", index: "02" },
  { label: "CONTACT", href: "/contact", index: "03" },
];

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

export type CapabilityGroup = { label: string; items: string[] };

export const capabilityGroups: CapabilityGroup[] = [
  { label: "LANGUAGES", items: ["TypeScript", "Python"] },
  { label: "WEB", items: ["Next.js", "React"] },
  { label: "MOBILE", items: ["React Native", "Expo", "Supabase"] },
  { label: "BACKEND / AUTOMATION", items: ["FastAPI", "PostgreSQL", "Docker", "n8n"] },
];

export const about = {
  lede: "I work across product development, web engineering, research software and workflow automation — taking ideas from requirements and structure through design, implementation and operation.",
  profile: [
    "My background began in life science at Gakushuin University. In the Okada Lab, I worked on protein-structure analysis using inter-carbon distances and developed software to automate parts of the structural-data workflow.",
    "After gaining practical experience through レターファン株式会社 and Drumroll株式会社, I moved into freelance engineering. Today my work ranges from mobile products and corporate websites to commerce, backend integrations and automation. I prefer to stay involved across the full path from understanding the problem to shipping and maintaining the final system.",
    "Alongside client work, I develop my own products including CaRoot. Since August 2026, I have also served as a director of NPO Proud, supporting its IT and web initiatives and helping coordinate development of a monitoring service for older adults.",
  ],
  whatIDo: [
    "Product planning and information architecture",
    "UI/UX and frontend engineering",
    "Mobile application development",
    "Backend and API integration",
    "Research software and data pipelines",
    "Workflow automation",
    "Deployment, SEO and ongoing product operation",
  ],
};

export type JourneyEntry = { year: string; title: string; body: string };

export const journey: JourneyEntry[] = [
  {
    year: "UNIVERSITY",
    title: "GAKUSHUIN UNIVERSITY / OKADA LAB",
    body: "Studied life science and worked on software for protein-structure analysis, comparing structures through inter-carbon distances and automating structural-data retrieval and processing from sources including UniProt and PDB.",
  },
  {
    year: "EARLY CAREER",
    title: "レターファン株式会社 / Drumroll株式会社",
    body: "Gained practical development experience through レターファン株式会社 and Drumroll株式会社 before moving into independent client work.",
  },
  {
    year: "2025—",
    title: "FREELANCE ENGINEER",
    body: "Designing and building production websites, commerce experiences, automation workflows and digital systems for clients. Work spans requirements, information architecture, UI/UX, frontend and backend implementation, deployment and ongoing operation.",
  },
  {
    year: "2026—",
    title: "PRODUCT DEVELOPMENT",
    body: "Building CaRoot, a personal calorie and nutrition management product, from planning and UI/UX through mobile development, backend systems, AI features, data design and release operations.",
  },
  {
    year: "2026.08—",
    title: "NPO PROUD / DIRECTOR",
    body: "Supporting IT and web initiatives as a director, including website development and a monitoring-service project for older adults, with responsibility spanning product and project coordination.",
  },
];

export type ResearchProject = {
  id: string;
  title: string;
  meta: string[];
  year: string;
  statement: string;
  notes: string[];
};

/**
 * Practice areas beyond the client register — research and automation work
 * that does not live at a public URL.
 */
export const practice: ResearchProject[] = [
  {
    id: "protein",
    title: "PROTEIN STRUCTURE ANALYSIS",
    meta: ["UNIVERSITY RESEARCH", "STRUCTURAL BIOLOGY"],
    year: "2025—2026",
    statement:
      "University research development for comparing protein structures through inter-carbon distances, with automated retrieval and processing of structural data from UniProt and PDB.",
    notes: ["UniProt / PDB", "Cα distances", "Structure analysis"],
  },
  {
    id: "workflow",
    title: "AUTOMATION SYSTEMS",
    meta: ["WORKFLOW AUTOMATION", "API INTEGRATION"],
    year: "2025—2026",
    statement:
      "Automation work connecting APIs and data-processing steps for research and operational workflows.",
    notes: ["Python", "FastAPI", "n8n"],
  },
];

export const contact = {
  lede: "Tell me what you are working on, what you need, and where the project currently stands. I will reply by email.",
  links: [
    { label: "EMAIL", value: site.email, href: `mailto:${site.email}` },
    { label: "GITHUB", value: "github.com/bbbyk105", href: site.github },
  ],
};
