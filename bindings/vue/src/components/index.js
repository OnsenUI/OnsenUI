export { default as VOnsInput } from './VOnsInput.vue';
export { default as VOnsPopover } from './VOnsPopover.vue';
export { default as VOnsAlertDialog } from './VOnsAlertDialog.vue';
export { default as VOnsTabbar } from './VOnsTabbar.vue';
export { default as VOnsTab } from './VOnsTab.vue';
export { default as VOnsNavigator } from './VOnsNavigator.vue';
export { default as VOnsSplitter } from './VOnsSplitter.vue';
export { default as VOnsSplitterSide } from './VOnsSplitterSide.vue';
export { default as VOnsSplitterContent } from './VOnsSplitterContent.vue';
export { default as VOnsRange } from './VOnsRange.vue';
export { default as VOnsSpeedDial } from './VOnsSpeedDial.vue';

// Generic components
import VGeneric from './VGeneric.vue';
import { dialogAPI, fabAPI } from '../internal/mixins/api';
import { clickable, hasOptions } from '../internal/mixins/common';

const extend = (component, mixins = []) => ({ name: 'v-ons-' + component, mixins, extends: VGeneric });

export const VOnsPage = extend('page');
export const VOnsToolbar = extend('toolbar');
export const VOnsToolbarButton = extend('toolbar-button');
export const VOnsButton = extend('button');
export const VOnsIcon = extend('icon');
export const VOnsSwitch = extend('switch');
export const VOnsBottomToolbar = extend('bottom-toolbar');
export const VOnsSpeedDialItem = extend('speed-dial-item');
export const VOnsList = extend('list');
export const VOnsListItem = extend('list-item');
export const VOnsListHeader = extend('list-header');
export const VOnsRipple = extend('ripple');
export const VOnsRow = extend('row');
export const VOnsCol = extend('col');
export const VOnsProgressBar = extend('progress-bar');
export const VOnsSplitterMask = extend('splitter-mask');
export const VOnsPullHook = extend('pull-hook');
export const VOnsCarouselItem = extend('carousel-item');
export const VOnsCarousel= extend('carousel', [hasOptions]);
export const VOnsFab = extend('fab', [fabAPI]);
export const VOnsBackButton = extend('back-button', [clickable, hasOptions]);
export const VOnsDialog = extend('dialog', [dialogAPI]);
export const VOnsModal = extend('modal', [dialogAPI]);

