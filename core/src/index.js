import setup from './setup'; // Add polyfills
import ons from './ons'; // External dependency, always hoisted

setup(ons); // Setup initial listeners

export default ons;
