export const hyphenate = string => string.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();

export const camelize = string => string.toLowerCase().replace(/-([a-z])/g, (m, l) => l.toUpperCase());

export const eventToHandler = name => '_on' + name.charAt(0).toUpperCase() + name.slice(1);

export const handlerToProp = name => name.slice(2).charAt(0).toLowerCase() + name.slice(2).slice(1);
