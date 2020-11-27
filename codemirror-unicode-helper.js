(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CodeMirrorUnicodeHelper = {}));
}(this, (function (exports) { 'use strict';

    const filtered = (items, typed, maxItems = 10) => {
        const scores = items.reduce((o, item) => {
            o[item[0]] = lcsScore(item[0], typed);
            return o;
        }, {});
        return items
            .slice()
            .sort((a, b) => scores[b[0]] - scores[a[0]])
            .slice(0, maxItems);
    };
    const lcsScore = (item, typed) => {
        if (item.length === 0 || typed.length === 0)
            return 0;
        if (item.includes(typed)) {
            return typed.length + 1 / item.length + (item.startsWith(typed) ? 1 : 0);
        }
        const lcs = item.length < typed.length
            ? lcsLength(typed, item)
            : lcsLength(item, typed);
        if (item[0].toLowerCase() === typed[0].toLowerCase()) {
            return lcs + 1 + (item[0] === typed[0] ? 1 : 0);
        }
        return lcs;
    };
    const lcsLength = (x, y) => {
        const m = x.length;
        const n = y.length;
        const L = [0];
        for (let i = 1; i <= n; ++i)
            L[i] = 0;
        for (let i = 1; i <= m; ++i) {
            for (let j = 1, prev = L[0]; j <= n; ++j) {
                const tmp = L[j];
                L[j] = x[i - 1] === y[j - 1] ? prev + 1 : Math.max(L[j - 1], L[j]);
                prev = tmp;
            }
        }
        return L[n];
    };

    const unicodeHelperWith = (pairs) => (editor) => {
        const to = editor.getCursor();
        const str = editor.getLine(to.line).slice(0, to.ch);
        const from = { line: to.line, ch: str.lastIndexOf("\\") };
        const typed = editor.getRange(from, to);
        return {
            from,
            to,
            list: filtered(pairs, typed, 10).map(([seq, sym]) => ({
                text: sym,
                displayText: `${sym} \\${seq}`,
                hint: (cm) => cm.replaceRange(sym, from, to, "complete"),
            })),
        };
    };

    const defaultPairs = [
        ["div", "÷"],
        ["pi", "π"],
        ["euler", "ℯ"],
        ["in", "∈"],
        ["notin", "∉"],
        ["ni", "∋"],
        ["nni", "∌"],
        ["circ", "∘"],
        ["sqrt", "√"],
        ["cbrt", "∛"],
        ["cap", "∩"],
        ["cup", "∪"],
        ["approx", "≈"],
        ["napprox", "≉"],
        ["ne", "≠"],
        ["equiv", "≡"],
        ["nequiv", "≢"],
        ["le", "≤"],
        ["ge", "≥"],
        ["subseteq", "⊆"],
        ["supseteq", "⊇"],
        ["nsubseteq", "⊈"],
        ["nsupseteq", "⊉"],
        ["subsetneq", "⊊"],
        ["supsetneq", "⊋"],
        ["veebar", "⊻"],
        ["lambda", "λ"],
        ["epsilon", "ϵ"],
        ["theta", "θ"],
        ["Delta", "Δ"],
        ["_0", "₀"],
        ["_1", "₁"],
        ["_2", "₂"],
        ["_3", "₃"],
        ["_4", "₄"],
        ["_5", "₅"],
        ["_6", "₆"],
        ["_7", "₇"],
        ["_8", "₈"],
        ["_9", "₉"],
        ["^0", "⁰"],
        ["^1", "¹"],
        ["^2", "²"],
        ["^3", "³"],
        ["^4", "⁴"],
        ["^5", "⁵"],
        ["^6", "⁶"],
        ["^7", "⁷"],
        ["^8", "⁸"],
        ["^9", "⁹"],
    ];

    const unicodeHelper = unicodeHelperWith(defaultPairs);

    exports.unicodeHelper = unicodeHelper;
    exports.unicodeHelperWith = unicodeHelperWith;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
