/**
 * A very small Python lexer, for the listings in the research case studies.
 *
 * It is here rather than pulled from a package because those listings are a
 * handful of lines each and a syntax highlighter would be several times the
 * weight of everything it ever highlights. It is a separate module from the
 * component that draws it so the part with the decisions in it — is this name
 * an attribute, a call or a keyword argument? — can be tested on its own.
 *
 * It is not a Python parser and does not try to be. It knows strings from
 * comments from numbers, and it reads a name from what surrounds it, which is
 * what makes a listing look like code rather than like coloured noise.
 */

export type TokenKind =
  | "com" // comment
  | "str" // string literal
  | "num" // number literal
  | "key" // keyword, or a builtin being called
  | "fn" // a name being called
  | "attr" // a name reached through a dot
  | "arg" // a keyword argument's name
  | "op" // operator or bracket
  | "var"; // anything else — a plain name

/** A slice of a line. Whitespace comes back with no kind. */
export type Token = { text: string; kind?: TokenKind };

const KEYWORDS = new Set([
  "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif",
  "else", "except", "False", "finally", "for", "from", "global", "if", "import", "in", "is",
  "lambda", "None", "nonlocal", "not", "or", "pass", "raise", "return", "True", "try", "while",
  "with", "yield",
]);

const BUILTINS = new Set([
  "abs", "all", "any", "dict", "enumerate", "float", "int", "len", "list", "max", "min", "open",
  "print", "range", "round", "set", "sorted", "str", "sum", "tuple", "zip",
]);

/** comment · string · number · name · whitespace · everything else, in that order. */
const TOKEN =
  /(#[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+)|([^\s])/g;

/**
 * Splits one line into tokens. Concatenating every `text` back together
 * returns the line unchanged, so nothing can be dropped on the floor.
 */
export function tokenize(line: string): Token[] {
  const out: Token[] = [];
  let depth = 0;
  let afterDot = false;

  TOKEN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN.exec(line))) {
    const [, comment, string, number, name, space, punct] = m;

    if (comment) {
      out.push({ text: comment, kind: "com" });
    } else if (string) {
      out.push({ text: string, kind: "str" });
    } else if (number) {
      out.push({ text: number, kind: "num" });
    } else if (name) {
      const next = line.slice(m.index + name.length).trimStart();
      let kind: TokenKind;
      if (KEYWORDS.has(name)) kind = "key";
      else if (afterDot) kind = next.startsWith("(") ? "fn" : "attr";
      else if (next.startsWith("(")) kind = BUILTINS.has(name) ? "key" : "fn";
      // A lone `=` inside brackets is a keyword argument; at statement level
      // the same character is an assignment, and `==` is neither.
      else if (depth > 0 && /^=[^=]/.test(next)) kind = "arg";
      else kind = "var";
      out.push({ text: name, kind });
      afterDot = false;
      continue;
    } else if (space) {
      out.push({ text: space });
    } else if (punct) {
      if ("([{".includes(punct)) depth++;
      else if (")]}".includes(punct)) depth = Math.max(0, depth - 1);
      out.push({ text: punct, kind: "op" });
      afterDot = punct === ".";
      continue;
    }
    afterDot = false;
  }

  return out;
}
