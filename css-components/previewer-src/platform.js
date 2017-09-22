import {getQueryParams} from './util';

export function getPlatform() {
  const platform = getQueryParams()['platform'];
  if (platform === 'android' || platform === 'ios') {
    return platform;
  }
  return 'all';
}

