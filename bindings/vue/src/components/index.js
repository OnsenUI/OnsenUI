export { default as VOnsInput } from './VOnsInput.vue';
export { default as VOnsTabbar } from './VOnsTabbar.vue';
export { default as VOnsTab } from './VOnsTab.vue';
export { default as VOnsNavigator } from './VOnsNavigator.vue';
export { default as VOnsSplitter } from './VOnsSplitter.vue';
export { default as VOnsSplitterSide } from './VOnsSplitterSide.vue';
export { default as VOnsSplitterContent } from './VOnsSplitterContent.vue';

import Vue from 'vue';
import VGeneric from './VGeneric.vue';
const extend = component => Object.assign({name: 'v-ons-' + component}, VGeneric);
export const VOnsPage = extend('page');
export const VOnsToolbar = extend('toolbar');
export const VOnsToolbarButton = extend('toolbar-button');
export const VOnsButton = extend('button');
export const VOnsCarousel = extend('carousel');
export const VOnsCarouselItem = extend('carousel-item');
export const VOnsIcon = extend('icon');
export const VOnsRange = extend('range');
export const VOnsSwitch = extend('switch');
export const VOnsBottomToolbar = extend('bottom-toolbar');
export const VOnsFab = extend('fab');
export const VOnsSpeedDial = extend('speed-dial');
export const VOnsSpeedDialItem = extend('speed-dial-item');
export const VOnsList = extend('speed-list');
export const VOnsListItem = extend('speed-list-item');
export const VOnsListHeader = extend('speed-list-header');

