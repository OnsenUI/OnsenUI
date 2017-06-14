export { default as VOnsPopover } from './VOnsPopover.vue';
export { default as VOnsAlertDialog } from './VOnsAlertDialog.vue';
export { default as VOnsSpeedDial } from './VOnsSpeedDial.vue';
export { default as VOnsCarousel } from './VOnsCarousel.vue';
export { default as VOnsTab } from './VOnsTab.vue';
export { default as VOnsTabbar } from './VOnsTabbar.vue';
export { default as VOnsBackButton } from './VOnsBackButton.vue';
export { default as VOnsNavigator } from './VOnsNavigator.vue';
export { default as VOnsSplitterSide } from './VOnsSplitterSide.vue';
export { default as VOnsLazyRepeat } from './VOnsLazyRepeat.vue';
export { default as VOnsSelect } from './VOnsSelect.vue';

// Generic components
import VGeneric from './VGeneric.vue';
import {
  hidable, hasOptions, dialogCancel,
  deriveDBB, deriveHandler, selfProvider,
  portal, modelInput, modelCheckbox, modelRadio
} from '../mixins';

const extend = (component, mixins = []) => ({ name: 'v-ons-' + component, mixins, extends: VGeneric });

export const VOnsToolbar = extend('toolbar');
export const VOnsToolbarButton = extend('toolbar-button');
export const VOnsButton = extend('button');
export const VOnsIcon = extend('icon');
export const VOnsCard = extend('card');
export const VOnsBottomToolbar = extend('bottom-toolbar');
export const VOnsSpeedDialItem = extend('speed-dial-item');
export const VOnsList = extend('list');
export const VOnsListItem = extend('list-item');
export const VOnsListTitle = extend('list-title');
export const VOnsListHeader = extend('list-header');
export const VOnsActionSheetButton = extend('action-sheet-button');
export const VOnsRipple = extend('ripple');
export const VOnsRow = extend('row');
export const VOnsCol = extend('col');
export const VOnsProgressBar = extend('progress-bar');
export const VOnsProgressCircular = extend('progress-circular');
export const VOnsCarouselItem = extend('carousel-item');
export const VOnsSplitterMask = extend('splitter-mask');
export const VOnsSplitterContent = extend('splitter-content');
export const VOnsSwitch = extend('switch', [modelCheckbox]);
export const VOnsCheckbox = extend('checkbox', [modelCheckbox]);
export const VOnsInput = extend('input', [modelInput]);
export const VOnsSearchInput = extend('search-input', [modelInput]);
export const VOnsRange = extend('range', [modelInput]);
export const VOnsRadio = extend('radio', [modelRadio]);
export const VOnsPullHook = extend('pull-hook', [deriveHandler('onAction')]);
export const VOnsSplitter = extend('splitter', [selfProvider, deriveDBB]);
export const VOnsFab = extend('fab', [hidable]);
export const VOnsPage = extend('page', [deriveDBB, deriveHandler('onInfiniteScroll')]);
export const VOnsDialog = extend('dialog', [hidable, hasOptions, dialogCancel, deriveDBB, portal]);
export const VOnsActionSheet = extend('action-sheet', [hidable, hasOptions, dialogCancel, deriveDBB, portal]);
export const VOnsModal = extend('modal', [hidable, hasOptions, deriveDBB, portal]);
export const VOnsToast = extend('toast', [hidable, hasOptions, deriveDBB, portal]);
