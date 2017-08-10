import {getQueryParams} from './util';

export function getPlatform() {
  var platform = getQueryParams()['platform'];
  if (platform === 'android' || platform === 'ios') {
    return platform;
  }
  return 'all';
}

