import React, { useRef, useEffect } from 'react';
const kebabize = camelString =>
  camelString.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();

const addDeprecated = (props, deprecated) => {
  const propsCopy = { ...props };

  for (const [oldName, newName] of Object.entries(deprecated)) {
    if (propsCopy[newName] === undefined && propsCopy[oldName] !== undefined) {
      propsCopy[newName] = propsCopy[oldName];
    }
  }

  return propsCopy;
}

function useCustomElementListener(ref, prop, handler) {
  const event = prop.slice(2).toLowerCase();
  useEffect(() => {
    ref.current.addEventListener(event, handler);

    return function cleanup() {
      ref.current.removeEventListener(event, handler);
    };
  }, [ref, handler]);
}

function useCustomElement(props, options = {}) {
  const ref = useRef();

  const notAttributes = options.notAttributes || [];
  const deprecated = options.deprecated || {};

  const {children, ...rest} = props; // remove children

  const properties = {};
  for (const [prop, value] of Object.entries(addDeprecated(rest, deprecated))) {
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

  return {ref, properties};
}

export default function onsCustomElement(WrappedComponent, options) {
  return function (props) {

    const {ref, properties} = useCustomElement(props, options);

    return (
      <WrappedComponent
        ref={ref}
        {...properties}
      >
        {props.children}
      </WrappedComponent>
    );
  };
}