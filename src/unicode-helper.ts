/// <reference types="codemirror/addon/hint/show-hint" />
import type { Editor, Hints } from "codemirror";

import { filtered } from "./filter";

export type Pair = [seq: string, sym: string];

// Returns CodeMirror hint helper function with given pairs.
export const unicodeHelperWith = (pairs: Pair[]) => (editor: Editor): Hints => {
  const to = editor.getCursor();
  const str = editor.getLine(to.line).slice(0, to.ch);
  const from = { line: to.line, ch: str.lastIndexOf("\\") };
  // Exclude the backslash when searching
  const typed = editor.getRange({ line: from.line, ch: from.ch + 1 }, to);
  return {
    from,
    to,
    // Return at most 10 candidates. We can make this configurable if needed.
    list: !typed
      ? []
      : filtered(pairs, typed, 10).map(([seq, sym]) => ({
          text: sym,
          displayText: `${sym} \\${seq}`,
          hint: (cm: Editor) => cm.replaceRange(sym, from, to, "complete"),
        })),
  };
};
