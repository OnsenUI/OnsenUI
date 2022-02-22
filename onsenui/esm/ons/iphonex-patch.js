/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

// This object should not be exposed to users. Please keep this private.
const iPhoneXPatch = {};

iPhoneXPatch.isIPhoneXPortraitPatchActive = () => {
  return document.documentElement.getAttribute('onsflag-iphonex-portrait') != null && window.innerWidth < window.innerHeight;
};

iPhoneXPatch.isIPhoneXLandscapePatchActive = () => {
  // If width === height, treat it as landscape
  return document.documentElement.getAttribute('onsflag-iphonex-landscape') != null && window.innerWidth >= window.innerHeight;
};

/**
 * Returns the safe area lengths based on the current state of the safe areas.
 */
iPhoneXPatch.getSafeAreaLengths = () => {
  let safeAreaLengths;
  if (iPhoneXPatch.isIPhoneXPortraitPatchActive()) {
    safeAreaLengths = {
      top: 44,
      right: 0,
      bottom: 34,
      left: 0
    };
  } else if (iPhoneXPatch.isIPhoneXLandscapePatchActive()) {
    safeAreaLengths = {
      top: 0,
      right: 44,
      bottom: 21,
      left: 44
    };
  } else {
    safeAreaLengths = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  return safeAreaLengths;
};

/**
 * Returns the safe area rect based on the current state of the safe areas.
 */
iPhoneXPatch.getSafeAreaDOMRect = () => {
  let safeAreaRect;
  if (iPhoneXPatch.isIPhoneXPortraitPatchActive()) {
    safeAreaRect = {
      x: 0,
      y: 44, /* 0 + 44 (top safe area) */
      width: window.innerWidth,
      height: window.innerHeight - 78 /* height - 44 (top safe area) - 34 (bottom safe area) */
    };
  } else if (iPhoneXPatch.isIPhoneXLandscapePatchActive()) {
    safeAreaRect = {
      x: 44, /* 0 + 44 (left safe area) */
      y: 0,
      width: window.innerWidth - 88, /* width - 44 (left safe area) - 34 (right safe area) */
      height: window.innerHeight - 21 /* height - 21 (bottom safe area) */
    };
  } else {
    safeAreaRect = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  return {
    ...safeAreaRect,
    left: safeAreaRect.x,
    top: safeAreaRect.y,
    right: safeAreaRect.x + safeAreaRect.width,
    bottom: safeAreaRect.y + safeAreaRect.height
  };
};

export default iPhoneXPatch;
