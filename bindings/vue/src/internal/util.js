import ons from 'onsenui';

export const hyphenate = string => string.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();

export const camelize = string => string.toLowerCase().replace(/-([a-z])/g, (m, l) => l.toUpperCase());

export const getClassFromTag = tagName => {
  const className = camelize(tagName.slice(3)) + 'Element';
  return ons[className];
};

export const eventToHandler = name => '_on' + name.charAt(0).toUpperCase() + name.slice(1);
