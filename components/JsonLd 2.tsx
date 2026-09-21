/**
 * Structured data, in the body.
 *
 * It has to be a real <script type="application/ld+json"> element: routing it
 * through Next's `metadata.other` turns it into a <meta> tag, which Google
 * does not read as structured data at all.
 *
 * `<` is escaped so a string in the graph can never close this script tag.
 */
export default function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
