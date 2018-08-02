import React from 'react';

/**
 * Wraps an ons- element in a React component.
 *
 * @param {string} OnsElement - the string name of the ons- element to wrap e.g. "ons-button".
 * @return {Function} a React component that wraps OnsElement.
 */
const wrapOnsElement = (OnsElement) => {
  return (props) => {
    // Filter out props with value of false.
    // Need this because React coerces false to "false" string which evaluates to true.
    const propsWithoutFalses = {};
    Object.keys(props).forEach(key => {
      if (props[key] !== false) {
        propsWithoutFalses[key] = props[key];
      }
    });

    const { className, ...passThroughProps } = propsWithoutFalses;

    return (
      <OnsElement
        class={ className } // web components use class instead of className
        { ...passThroughProps }
      >
        { props.children }
      </OnsElement>
    );
  };
};

export default wrapOnsElement;
