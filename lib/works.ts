/**
 * Selected work, carried over from Portfolio2026-ver4.
 * Copy prioritises the project, responsibility and delivered functionality.
 * Technology is supporting information rather than the main story.
 */
export type Work = {
  slug: string;
  index: string;
  name: string;
  title: string[];
  client: string;
  sector: string;
  kind: string;
  place?: string;
  role: string;
  year: string;
  url: string;
  statement: string;
  brief: string[];
  built: string[];
  stack: string[];
  screens: { desktop: string; mobile: string };
};

export const works: Work[] = [
  {
    slug: "caroot",
    index: "01",
    name: "CaRoot",
    title: ["CAROOT"],
    client: "CaRoot — own product",
    sector: "Consumer app / Nutrition",
    kind: "AI / MOBILE PRODUCT",
    place: "iOS & Android",
    role: "Planning, UI/UX, development, operations",
    year: "2026",
    url: "https://www.caroot.app",
    statement:
      "A personal calorie and nutrition management app designed to reduce the effort of everyday meal logging.",
    brief: [
      "CaRoot is a personal product developed from planning through UI/UX, frontend, backend, AI features, database design and App Store release work.",
      "Users can analyse a meal from a photo, scan a barcode or read a nutrition label, then manage calories and PFC from the resulting record. The app also supports manual entry, weight and water tracking, weekly reports, meal reminders and Japanese / English use.",
      "Food data includes Japan's official food composition data and restaurant / chain menu data based on published nutrition information. AI photo analysis is handled through a server-side function, while the core logging features remain available without relying on the photo-analysis connection.",
    ],
    built: [
      "AI meal-photo analysis with editable calorie and PFC estimates",
      "Barcode scanning and nutrition-label photo reading",
      "Calorie / PFC targets based on profile, activity and goal settings",
      "Manual food entry, weight and water tracking, weekly reports and meal reminders",
      "Japanese / English support and App Store release preparation",
      "End-to-end product development from planning and UI/UX through frontend, backend and database work",
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "Gemini"],
    screens: { desktop: "/works/caroot.webp", mobile: "/works/caroot-mobile.webp" },
  },
  {
    slug: "hakuho",
    index: "02",
    name: "Hakuho",
    title: ["HAKUHO"],
    client: "Hakuho Inc. — 株式会社白萌",
    sector: "Manufacturing / Precision machining",
    kind: "PRECISION MACHINING / WEB",
    place: "Shimizu, Shizuoka",
    role: "Planning, design, development, SEO, launch",
    year: "2026",
    url: "https://www.hakuhofactory.com",
    statement:
      "A corporate website for a precision-machining company, structured to help prospective customers understand capabilities and move directly to a quote request.",
    brief: [
      "Hakuho manufactures more than 24,000 parts a year for over 200 clients. The site organises its machining capabilities, equipment, quality information and production examples so prospective customers can judge whether their requirements can be handled.",
      "The quote flow accepts drawings and specification files including PDF, DXF, DWG, STEP and IGES, allowing enquiries to arrive with the information needed for an actual manufacturing discussion.",
      "I handled the project end to end: requirements and information architecture, UI/UX, frontend and backend implementation, the quote and email flow, SEO, testing and launch.",
    ],
    built: [
      "Information architecture centred on machining capabilities and quote conversion",
      "Drawing-upload quote form with specification fields and email delivery",
      "Structured presentation of materials, sizes, lot sizes, tolerances, equipment and quality information",
      "Responsive UI and motion design",
      "SEO foundations including canonical URLs and sitemap",
      "Automated tests for key site functionality",
    ],
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Resend", "Jest"],
    screens: { desktop: "/works/hakuho.webp", mobile: "/works/hakuho-mobile.webp" },
  },
  {
    slug: "goodwill-legal",
    index: "03",
    name: "Goodwill Legal",
    title: ["GOODWILL", "LEGAL"],
    client: "行政書士グッドウィル法務事務所",
    sector: "Professional services / Legal",
    kind: "LEGAL / CONTENT PLATFORM",
    place: "Sapporo, Hokkaido",
    role: "Planning, design, development, CMS, SEO, operations",
    year: "2026",
    url: "https://goodwill-legal.jp",
    statement:
      "A website for a Sapporo administrative scrivener's office, designed to explain its services clearly and connect consultation enquiries with ongoing content publishing.",
    brief: [
      "The project covers the office's service information, consultation flow, profile and access information together with a continuously updated column section.",
      "A CMS was introduced so articles can be published and organised without modifying the site code. The enquiry flow sends consultation details to the office and returns a confirmation to the sender.",
      "I handled the project from site planning and UI/UX through implementation, CMS integration, enquiry functionality, SEO, launch and ongoing maintenance.",
    ],
    built: [
      "Service and consultation-information pages",
      "CMS-based article publishing and category structure",
      "Contact flow with office notification and automatic confirmation",
      "Office profile and access information",
      "SEO-oriented metadata, sitemap and content structure",
      "Ongoing maintenance and content-operation support",
    ],
    stack: ["Next.js", "React", "TypeScript", "microCMS", "Resend", "GSAP"],
    screens: { desktop: "/works/goodwill.webp", mobile: "/works/goodwill-mobile.webp" },
  },
  {
    slug: "jurakuen",
    index: "04",
    name: "Jurakuen",
    title: ["JURAKUEN"],
    client: "聚楽苑 — Jurakuen",
    sector: "Commerce / Organic tea",
    kind: "COMMERCE / ORGANIC TEA",
    place: "Fuji, Shizuoka",
    role: "Design, development, commerce, multilingual, SEO",
    year: "2025",
    url: "https://www.jurakuen.com",
    statement:
      "A bilingual direct-to-consumer website for an organic tea producer in Fuji, combining brand communication with online purchasing.",
    brief: [
      "The site presents the producer, cultivation and organic JAS information alongside a product catalogue and online purchasing flow. Japanese and English pages allow the same brand and product information to reach both domestic and overseas visitors.",
      "The commerce flow includes cart and Stripe checkout. Search visibility was addressed through locale-specific canonical URLs, sitemap generation, structured product data and index control for transactional pages.",
    ],
    built: [
      "Product catalogue, cart and online checkout",
      "Japanese / English site structure",
      "Producer, cultivation and organic JAS information pages",
      "Product structured data and search-engine metadata",
      "Dynamic sitemap and index control for cart / payment-result pages",
      "SEO landing pages and internal-link structure for organic tea and matcha searches",
    ],
    stack: ["Next.js", "React", "TypeScript", "Stripe", "next-intl", "Framer Motion"],
    screens: { desktop: "/works/jurakuen.webp", mobile: "/works/jurakuen-mobile.webp" },
  },
  {
    slug: "dmc-fuji",
    index: "05",
    name: "DMC Fuji",
    title: ["DMC", "FUJI"],
    client: "DMC LLC — DMC FUJI",
    sector: "Studio / Photography & experience",
    kind: "STUDIO / PHOTOGRAPHY",
    place: "Fuji, Shizuoka",
    role: "Design, development, CMS, gallery, multilingual",
    year: "2025",
    url: "https://www.dmc123.jp",
    statement:
      "A bilingual website for DMC Fuji, bringing its photography and related services into one clear digital experience.",
    brief: [
      "The site organises multiple services under one brand while giving photography a central role. Visitors can move between service information, the gallery, articles, access information and enquiries in Japanese or English.",
      "The implementation includes a managed photo gallery, CMS-backed content and an enquiry flow, allowing the business to update visual and editorial content without rebuilding the site.",
    ],
    built: [
      "Service pages and information architecture across the DMC Fuji offering",
      "Photo gallery backed by managed storage",
      "CMS-backed blog and content management",
      "Japanese / English page delivery",
      "Contact and enquiry functionality",
      "Responsive UI and motion implementation",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "microCMS", "next-intl"],
    screens: { desktop: "/works/dmc-fuji.webp", mobile: "/works/dmc-fuji-mobile.webp" },
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
