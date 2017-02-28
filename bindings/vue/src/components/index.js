export { default as VOnsPopover } from './VOnsPopover.vue';
export { default as VOnsAlertDialog } from './VOnsAlertDialog.vue';
export { default as VOnsSpeedDial } from './VOnsSpeedDial.vue';
export { default as VOnsCarousel } from './VOnsCarousel.vue';
export { default as VOnsTab } from './VOnsTab.vue';
export { default as VOnsTabbar } from './VOnsTabbar.vue';
export { default as VOnsBackButton } from './VOnsBackButton.vue';
export { default as VOnsNavigator } from './VOnsNavigator.vue';
export { default as VOnsSplitterSide } from './VOnsSplitterSide.vue';

// Generic components
import VGeneric from './VGeneric.vue';
import { clickable, hidable, hasOptions, destroyable, deriveProperties, selfProvider } from '../mixins';

const extend = (component, mixins = []) => ({ name: 'v-ons-' + component, mixins, extends: VGeneric });

export const VOnsToolbar = extend('toolbar');
export const VOnsToolbarButton = extend('toolbar-button');
export const VOnsButton = extend('button');
export const VOnsIcon = extend('icon');
export const VOnsSwitch = extend('switch');
export const VOnsInput = extend('input');
export const VOnsRange = extend('range');
export const VOnsSelect = extend('select');
export const VOnsBottomToolbar = extend('bottom-toolbar');
export const VOnsSpeedDialItem = extend('speed-dial-item');
export const VOnsList = extend('list');
export const VOnsListItem = extend('list-item');
export const VOnsListHeader = extend('list-header');
export const VOnsRipple = extend('ripple');
export const VOnsRow = extend('row');
export const VOnsCol = extend('col');
export const VOnsProgressBar = extend('progress-bar');
export const VOnsProgressCircular = extend('progress-circular');
export const VOnsPullHook = extend('pull-hook');
export const VOnsCarouselItem = extend('carousel-item');
export const VOnsSplitterMask = extend('splitter-mask');
export const VOnsSplitterContent = extend('splitter-content', [destroyable]);
export const VOnsSplitter = extend('splitter', [deriveProperties, selfProvider]);
export const VOnsPage = extend('page', [destroyable]);
export const VOnsFab = extend('fab', [hidable, clickable]);
export const VOnsDialog = extend('dialog', [hidable, hasOptions]);
export const VOnsModal = extend('modal', [hidable, hasOptions]);

