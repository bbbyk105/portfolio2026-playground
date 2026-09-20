import { tokenize } from "@/lib/highlight";

/**
 * A short listing, set the way an editor would set it: a file tab, a line
 * number gutter that stays put while the code scrolls under it, and the
 * source coloured by token.
 *
 * The colouring is done here rather than by a library — these listings are a
 * handful of lines each, the site exports to static files, and a syntax
 * highlighter would be several times the weight of everything it ever
 * highlights. The lexer itself lives in lib/highlight.ts; this file only
 * decides what a token looks like.
 *
 * The palette is the site's own — off-white through grey, with the teal for
 * literals — so the block sits in the page instead of importing an editor
 * theme's colours along with its layout.
 */

type Props = {
  filename: string;
  /** The language, shown on the tab. Only "Python" is lexed; anything else is left plain. */
  label: string;
  lines: string[];
};

export default function CodeBlock({ filename, label, lines }: Props) {
  const python = label.toLowerCase() === "python";

  return (
    <figure className="codeBlock">
      <figcaption className="codeTabs">
        <span className="codeTab">{filename}</span>
        <span className="codeLang">{label}</span>
      </figcaption>

      <div className="codeBody">
        <span className="codeGutter" aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </span>
        <div className="codeScroll">
          <pre>
            <code>
              {lines.map((line, i) => (
                <span className="codeLine" key={i}>
                  {python
                    ? tokenize(line).map((token, j) =>
                        token.kind ? (
                          <span className={`t-${token.kind}`} key={j}>
                            {token.text}
                          </span>
                        ) : (
                          <span key={j}>{token.text}</span>
                        )
                      )
                    : line}
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <div className="codeStatus">
        <span>{label}</span>
        <span>{lines.length} LINES</span>
      </div>
    </figure>
  );
}
