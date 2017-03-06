// Properties reserved by Custom Elements v1 and Onsen UI Core.
const _reservedProps = [
  /^_.*$/,
  /^init$/, // Polyfill v1 syntax equivalent to 'constructor'
  /^constructor$/,
  /^connectedCallback$/,
  /^disconnectedCallback$/,
  /^attributeChangedCallback$/,
  /^adoptedCallback$/,
];

const _isReserved = prop => _reservedProps.some(v => v.test(prop));

const getHandlers = target => {
  return Object.keys(Object.getOwnPropertyDescriptors(target.prototype))
    .filter(prop => /^on[A-Z]/.test(prop) && !_isReserved(prop));
};

export { getHandlers };
