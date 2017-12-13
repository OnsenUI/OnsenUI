import ons from './ons'; // External dependency, always hoisted
import setup from './setup'; // Add polyfills

setup(ons); // Setup initial listeners

export default ons;
