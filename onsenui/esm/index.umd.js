import setup from './setup.js'; // Add polyfills
import ons from './ons/index.js'; // Add ons internals

// Add and register Custom Elements
import './elements/ons-template.js';
import './elements/ons-if.js';
import './elements/ons-action-sheet.js';
import './elements/ons-action-sheet-button.js';
import './elements/ons-alert-dialog.js';
import './elements/ons-alert-dialog-button.js';
import './elements/ons-back-button.js';
import './elements/ons-bottom-toolbar.js';
import './elements/ons-button.js';
import './elements/ons-card.js';
import './elements/ons-carousel-item.js';
import './elements/ons-carousel.js';
import './elements/ons-col.js';
import './elements/ons-dialog.js';
import './elements/ons-fab.js';
import './elements/ons-gesture-detector.js';
import './elements/ons-icon.js';
import './elements/ons-lazy-repeat.js';
import './elements/ons-list-header.js';
import './elements/ons-list-title.js';
import './elements/ons-list-item.js';
import './elements/ons-list.js';
import './elements/ons-input.js';
import './elements/ons-checkbox.js';
import './elements/ons-radio.js';
import './elements/ons-search-input.js';
import './elements/ons-modal.js';
import './elements/ons-navigator.js';
import './elements/ons-page.js';
import './elements/ons-popover.js';
import './elements/ons-progress-bar.js';
import './elements/ons-progress-circular.js';
import './elements/ons-pull-hook.js';
import './elements/ons-range.js';
import './elements/ons-ripple.js';
import './elements/ons-row.js';
import './elements/ons-segment.js';
import './elements/ons-select.js';
import './elements/ons-speed-dial-item.js';
import './elements/ons-speed-dial.js';
import './elements/ons-splitter-content.js';
import './elements/ons-splitter-mask.js';
import './elements/ons-splitter-side.js';
import './elements/ons-splitter.js';
import './elements/ons-switch.js';
import './elements/ons-tab.js';
import './elements/ons-tabbar.js';
import './elements/ons-toast.js';
import './elements/ons-toolbar-button.js';
import './elements/ons-toolbar.js';

setup(ons); // Setup initial listeners
window._superSecretOns = ons;

export default ons;
