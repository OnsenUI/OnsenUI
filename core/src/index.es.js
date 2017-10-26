import setup from './setup.js'; // Order matters!
const ons = require('./ons/ons').default; // Avoid external dependency hoisting

setup(ons);
export default ons;
