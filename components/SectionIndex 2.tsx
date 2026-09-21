import type { Lang } from "@/lib/i18n";

/**
 * The contents list at the top of a case study.
 *
 * A case study runs several thousand words past four to six numbered
 * sections, and until now the only way to reach the last of them was to
 * scroll the whole way. The labels are the section headers verbatim, so the
 * list and the page cannot drift apart.
 */
export default function SectionIndex({
  items,
  lang,
}: {
  items: { id: string; label: string }[];
  lang: Lang;
}) {
  return (
    <nav className="sectionIndex" aria-label={lang === "ja" ? "このページの内容" : "On this page"}>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
