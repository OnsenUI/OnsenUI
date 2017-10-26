import setup from './setup.js'; // Add polyfills -- Must be first
const ons = require('./ons/ons').default; // 'require' avoids external dependency hoisting

setup(ons); // Setup initial listeners

export default ons;
