import { describe, expect, it } from "vitest";
import { tokenize, type TokenKind } from "./highlight";

/** The kind the lexer gave a particular piece of text, or undefined. */
const kindOf = (line: string, text: string): TokenKind | undefined =>
  tokenize(line).find((t) => t.text === text)?.kind;

/** Every token, as "text:kind" — for asserting on a whole short line. */
const shape = (line: string) => tokenize(line).map((t) => `${t.text}:${t.kind ?? "-"}`);

describe("nothing is dropped", () => {
  it("puts the line back together exactly", () => {
    for (const line of [
      "score = means / stds",
      "dis   = distance.iloc[:, 2:]",
      "# One row per residue pair, one column per chain.",
      "",
      "   ",
      "x=1",
      "d = {'a': [1, 2], 'b': (3.5,)}",
    ]) {
      expect(tokenize(line).map((t) => t.text).join("")).toBe(line);
    }
  });

  it("returns nothing for an empty line", () => {
    expect(tokenize("")).toEqual([]);
  });

  it("keeps whitespace, and leaves it unkinded", () => {
    expect(shape("a = 1")).toEqual(["a:var", " :-", "=:op", " :-", "1:num"]);
  });
});

describe("literals", () => {
  it("reads a comment to the end of the line, code inside it and all", () => {
    expect(tokenize("# score = means / stds")).toEqual([
      { text: "# score = means / stds", kind: "com" },
    ]);
  });

  it("reads a trailing comment without swallowing the code before it", () => {
    expect(shape("x = 1  # note")).toEqual([
      "x:var", " :-", "=:op", " :-", "1:num", "  :-", "# note:com",
    ]);
  });

  it("reads single and double quoted strings", () => {
    expect(kindOf("a = 'columns'", "'columns'")).toBe("str");
    expect(kindOf('a = "columns"', '"columns"')).toBe("str");
  });

  it("does not end a string at an escaped quote", () => {
    expect(kindOf("a = 'it\\'s'", "'it\\'s'")).toBe("str");
  });

  it("does not treat a # inside a string as a comment", () => {
    expect(tokenize("a = '# not a comment'")).toContainEqual({
      text: "'# not a comment'",
      kind: "str",
    });
  });

  it("reads integers and floats", () => {
    expect(kindOf("a = 0", "0")).toBe("num");
    expect(kindOf("a = 3.5", "3.5")).toBe("num");
  });
});

describe("names are read from what surrounds them", () => {
  it("calls a name followed by a bracket a call", () => {
    expect(kindOf("total(x)", "total")).toBe("fn");
  });

  it("calls a name after a dot and a bracket a method", () => {
    expect(kindOf("dis.mean(axis='columns')", "mean")).toBe("fn");
  });

  it("calls a name after a dot with no bracket an attribute", () => {
    expect(kindOf("distance.iloc[:, 2:]", "iloc")).toBe("attr");
  });

  it("leaves the name before the dot alone", () => {
    expect(kindOf("distance.iloc[:, 2:]", "distance")).toBe("var");
  });

  it("marks a builtin being called as a keyword rather than as a call", () => {
    expect(kindOf("n = len(rows)", "len")).toBe("key");
    expect(kindOf("n = len(rows)", "rows")).toBe("var");
  });

  it("marks a reserved word wherever it appears", () => {
    expect(kindOf("for row in rows:", "for")).toBe("key");
    expect(kindOf("for row in rows:", "in")).toBe("key");
    expect(kindOf("x = None", "None")).toBe("key");
  });

  it("marks a plain name as a variable", () => {
    expect(kindOf("score = means / stds", "score")).toBe("var");
    expect(kindOf("score = means / stds", "stds")).toBe("var");
  });
});

describe("keyword arguments, which is where = changes meaning", () => {
  it("marks a name before = inside brackets as an argument", () => {
    expect(kindOf("dis.std(axis='columns', ddof=0)", "axis")).toBe("arg");
    expect(kindOf("dis.std(axis='columns', ddof=0)", "ddof")).toBe("arg");
  });

  it("does not mark an assignment at statement level as an argument", () => {
    expect(kindOf("axis = 1", "axis")).toBe("var");
  });

  it("does not mistake a comparison inside brackets for an argument", () => {
    expect(kindOf("f(a == b)", "a")).toBe("var");
  });

  it("goes back to statement level once the brackets close", () => {
    expect(kindOf("f(a=1)\nb = 2".split("\n")[0], "a")).toBe("arg");
    expect(kindOf("g(x=1) ; after = 2", "after")).toBe("var");
  });

  it("tracks nesting, not just the first bracket", () => {
    expect(kindOf("outer(inner(deep=1))", "deep")).toBe("arg");
  });
});

describe("the listing that ships", () => {
  const lines = [
    "# One row per residue pair, one column per chain.",
    "dis   = distance.iloc[:, 2:]",
    "means = dis.mean(axis='columns')",
    "stds  = dis.std(axis='columns', ddof=0)",
    "",
    "# Hold the same distance everywhere -> high score.",
    "score = means / stds",
  ];

  it("gives every line back unchanged", () => {
    for (const line of lines) {
      expect(tokenize(line).map((t) => t.text).join("")).toBe(line);
    }
  });

  it("colours the two comments and nothing else on those lines", () => {
    for (const line of [lines[0], lines[5]]) {
      expect(tokenize(line)).toEqual([{ text: line, kind: "com" }]);
    }
  });

  it("reads the division line as three names and two operators", () => {
    expect(shape(lines[6])).toEqual([
      "score:var", " :-", "=:op", " :-", "means:var", " :-", "/:op", " :-", "stds:var",
    ]);
  });
});
