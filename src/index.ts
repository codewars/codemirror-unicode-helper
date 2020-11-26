import { unicodeHelperWith } from "./unicode-helper";
import { defaultPairs } from "./default";

// CodeMirror hint helper function with preconfigured pairs.
export const unicodeHelper = unicodeHelperWith(defaultPairs);
// Export the function to create helper with custom pairs.
export { unicodeHelperWith };
