import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const kebabize = camelString =>
  camelString.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();

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

  const propTypes = options.propTypes || {};
  const notAttributes = options.notAttributes || [];

  const properties = {};

  for (const [prop, value] of Object.entries(props)) {
    const jsName = kebabize(prop);

    if (notAttributes.includes(prop)) {
      useEffect(() => {
        ref.current[prop] = value;
      });
    } else if (/^on[A-Z]/.test(prop)) {
      useCustomElementListener(ref, prop, value);
    } else if (propTypes[prop] === PropTypes.bool) {
      properties[jsName] = value ? '' : null;
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
