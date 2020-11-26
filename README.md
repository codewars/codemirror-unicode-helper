# codemirror-unicode-helper

CodeMirror extension for entering Unicode characters using LaTeX-like abbreviations.

Provides functions `unicodeHelper` and `unicodeHelperWith`.

- `unicodeHelper`: Hint helper with preconfigured sequences.
- `unicodeHelperWith(pairs: [seq: string, sym: string][])`: Returns a hint helper with privided pairs.

## Usage

Using with preconfigured sequences:

```javascript
import CodeMirror from "codemirror";
import "codemirror/addon/hint/show-hint";
import { unicodeHelper } from "@codewars/codemirror-unicode-helper";

CodeMirror.registerGlobalHelper(
  "hint",
  "unicode-helper",
  predicate,
  unicodeHelper
);
```

Using with custom sequences:

```javascript
import CodeMirror from "codemirror";
import "codemirror/addon/hint/show-hint";
import { unicodeHelperWith } from "@codewars/codemirror-unicode-helper";

CodeMirror.registerGlobalHelper(
  "hint",
  "unicode-helper",
  predicate,
  unicodeHelperWith([
    ["div", "÷"],
    ["pi", "π"],
    ["sqrt", "√"],
    ["cbrt", "∛"],
  ])
);
```
