// Caution:
// Do not replace this import statement with codes.
//
// If you replace this import statement with codes,
// the codes will be executed after the following polyfills are imported
// because import statements are hoisted during compilation.
import './polyfill-switches.js';

// Polyfill Custom Elements v1 with global namespace pollution
import './custom-elements/custom-elements.min.js';

// Polyfill MutationObserver with global namespace pollution
import './MutationObserver@0.7.22/MutationObserver.js';

// Polyfill setImmediate with global namespace pollution
import './setImmediate@1.0.2+mod/setImmediate.js';
