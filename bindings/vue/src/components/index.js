export { default as VOnsPopover } from './VOnsPopover.vue';
export { default as VOnsAlertDialog } from './VOnsAlertDialog.vue';
export { default as VOnsSpeedDial } from './VOnsSpeedDial.vue';
export { default as VOnsTab } from './VOnsTab.vue';
export { default as VOnsTabbar } from './VOnsTabbar.vue';
export { default as VOnsNavigator } from './VOnsNavigator.vue';

// Generic components
import VGeneric from './VGeneric.vue';
import { dialogAPI, fabAPI } from '../mixins';
import { VuePageLoader } from '../mixins';
import { clickable, hasOptions, destroyable } from '../mixins';

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
export const VOnsSplitterMask = extend('splitter-mask');
export const VOnsPullHook = extend('pull-hook');
export const VOnsCarouselItem = extend('carousel-item');
export const VOnsCarousel= extend('carousel', [hasOptions]);
export const VOnsPage = extend('page', [destroyable]);
export const VOnsFab = extend('fab', [fabAPI]);
export const VOnsDialog = extend('dialog', [dialogAPI]);
export const VOnsModal = extend('modal', [dialogAPI]);
export const VOnsSplitter = extend('splitter', [destroyable]);
export const VOnsSplitterContent = extend('splitter-content', [VuePageLoader, destroyable]);
export const VOnsSplitterSide = extend('splitter-side', [VuePageLoader, destroyable, hasOptions]);
export const VOnsBackButton = extend('back-button', [clickable, hasOptions]);

