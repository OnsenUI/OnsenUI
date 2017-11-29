import ons from './ons'; // Add ons internals
import setup from './setup'; // Add polyfills

// Add and register Custom Elements
import './elements/ons-template';
import './elements/ons-if';
import './elements/ons-action-sheet';
import './elements/ons-action-sheet-button';
import './elements/ons-alert-dialog';
import './elements/ons-alert-dialog-button';
import './elements/ons-back-button';
import './elements/ons-bottom-toolbar';
import './elements/ons-button';
import './elements/ons-card';
import './elements/ons-carousel-item';
import './elements/ons-carousel';
import './elements/ons-col';
import './elements/ons-dialog';
import './elements/ons-fab';
import './elements/ons-gesture-detector';
import './elements/ons-icon';
import './elements/ons-lazy-repeat';
import './elements/ons-list-header';
import './elements/ons-list-title';
import './elements/ons-list-item';
import './elements/ons-list';
import './elements/ons-input';
import './elements/ons-checkbox';
import './elements/ons-radio';
import './elements/ons-search-input';
import './elements/ons-modal';
import './elements/ons-navigator';
import './elements/ons-page';
import './elements/ons-popover';
import './elements/ons-progress-bar';
import './elements/ons-progress-circular';
import './elements/ons-pull-hook';
import './elements/ons-range';
import './elements/ons-ripple';
import './elements/ons-row';
import './elements/ons-segment';
import './elements/ons-select';
import './elements/ons-speed-dial-item';
import './elements/ons-speed-dial';
import './elements/ons-splitter-content';
import './elements/ons-splitter-mask';
import './elements/ons-splitter-side';
import './elements/ons-splitter';
import './elements/ons-switch';
import './elements/ons-tab';
import './elements/ons-tabbar';
import './elements/ons-toast';
import './elements/ons-toolbar-button';
import './elements/ons-toolbar';

setup(ons); // Setup initial listeners
window._superSecretOns = ons;

export default ons;
