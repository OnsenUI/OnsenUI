import {getQueryParams} from './util';

export function getPlatform() {
  var platform = getQueryParams()['platform'];
  if (platform === 'android' || platform === 'ios') {
    return platform;
  }
  return 'all';
}

export function getPlatformFilter(platform) {
  if (platform === 'android') {
    return component => component.annotation.name.match(/Material/);
  }
  
  if (platform === 'ios') {
    return component => !component.annotation.name.match(/Material/);
  }

  return () => true;
}
