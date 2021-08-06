import setup from './setup.js'; // Add polyfills
import ons from './ons/index.js'; // External dependency, always hoisted

setup(ons); // Setup initial listeners

export default ons;
