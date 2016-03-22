import './setup';
import * as browser from 'angular2/platform/browser'
import {Type} from 'angular2/core';

export * from 'angular2/core';
export * from './ons-navigator';
export function bootstrap(type: Type, providers: Array<any> = []) {
  return browser.bootstrap(type, providers);
};
