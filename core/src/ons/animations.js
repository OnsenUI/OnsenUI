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
import util from 'ons/util';

const merge = (args) => {
  const result = util.extend({}, ...args);
  const transforms = args.map(e => e && e.transform).filter(e => e);
  if (transforms.length > 1) {
    result.transform = transforms.join(' ');
  }
  return result;
};

const to2D = x => ('' + x).match(/,/) ? x : (x + ', ' + x);


export const fade = {
  out: {
    from: {opacity: 1.0},
    to: {opacity: 0}
  },
  in: {
    from: {opacity: 0},
    to: {opacity: 1.0}
  }
};

export const translate = options => {
  const {from, to} = typeof options === 'object' ? options : {from: options, to: options};
  return {
    from: {transform: 'translate3d(' + to2D(from || 0) + ', 0)'},
    to: {transform: 'translate3d(' + to2D(to || 0) + ', 0)'}
  }
};

export const scale = ({from = 1, to = 1}) => ({
  from: {transform: 'scale3d(' + to2D(from) + ', 1)'},
  to: {transform: 'scale3d(' + to2D(to) + ', 1)'}
});


export const acceleration = {
  from: {transform: 'translate3d(0, 0, 0)'},
  to: {transform: 'translate3d(0, 0, 0)'}
};

export const animate = values => {
  const result = {from: {}, to: {}};
  util.each(values, (key, value) => {
    value = Array.isArray(value) ? value : [value, value];
    result.from[key] = value[0];
    result.to[key] = value.length > 1 ? value[1] : value[0];
  });
  return result;
};

export const partialFade = k => ({
  in: animate({opacity: [k, 1]}),
  out: animate({opacity: [1, k]})
});

export const union = (...animations) => ({
  from: merge(animations.map(e => e.from)),
  to: merge(animations.map(e => e.to))
});



// export default const animations = {fade, translate, scale, acceleration, union};
