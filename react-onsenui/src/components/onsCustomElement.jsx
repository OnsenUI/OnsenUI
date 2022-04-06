import React, { useRef, useEffect } from 'react';
const kebabize = camelString =>
  camelString.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();

const addDeprecated = (props, deprecated) => {
  const propsCopy = { ...props };

  const nameMap = {
    className: 'class',
    ...deprecated
  };

  for (const [oldName, newName] of Object.entries(nameMap)) {
    if (propsCopy[newName] === undefined && propsCopy[oldName] !== undefined) {
      propsCopy[newName] = propsCopy[oldName];
      delete propsCopy[oldName];
    }
  }

  return propsCopy;
};

function useCustomElementListener(ref, prop, handler) {
  const event = prop.slice(2).toLowerCase();
  useEffect(() => {
    const current = ref.current;
    current.addEventListener(event, handler);

    return function cleanup() {
      current.removeEventListener(event, handler);
    };
  }, [ref, handler]);
}

function useCustomElement(props, options = {}, ref) {
  const notAttributes = options.notAttributes || [];
  const deprecated = options.deprecated || {};

  const properties = {};
  for (const [prop, value] of Object.entries(addDeprecated(props, deprecated))) {
    const jsName = kebabize(prop);

    if (notAttributes.includes(prop)) {
      useEffect(() => {
        ref.current[prop] = value;
      });
    } else if (/^on[A-Z]/.test(prop)) {
      useCustomElementListener(ref, prop, value);
    } else if (typeof value === 'boolean') {
      properties[jsName] = value ? '' : null;
    } else if (typeof value === 'object' && value !== null) {
      properties[jsName] = JSON.stringify(value);
    } else {
      properties[jsName] = value;
    }
  }

  return {properties};
}

export default function onsCustomElement(WrappedComponent, options) {
  return React.forwardRef((props, _ref) => {
    const ref = _ref || useRef();

    const {style, children, ...rest} = props;
    const {properties} = useCustomElement(rest, options, ref);

    return (
      <WrappedComponent
        ref={ref}
        style={style}
        {...properties}
      >
        {children}
      </WrappedComponent>
    );
  });
}
