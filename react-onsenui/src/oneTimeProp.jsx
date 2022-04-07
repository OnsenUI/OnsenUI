import React from 'react';

// For a prop with name `defaultProp`, sets the component's `prop` prop to the
// value of `defaultProp` when the component mounts only.
//
// For example, Input has a defaulttValue prop that should set the inner input's
// value when the component mounted and do nothing afterwards.
const oneTimeProp = (WrappedComponent, defaultProp, prop) => {
  class OneTimeProp extends React.Component {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
    }

    componentDidMount() {
      const value = this.props[defaultProp];
      if (value) {
        this.ref.current[prop] = value;
      }
    }

    render() {
      const {innerRef, ...rest} = this.props;
      delete rest[defaultProp];

      if (innerRef && innerRef !== this.ref) {
        this.ref = innerRef;
      }

      return (
        <WrappedComponent
          ref={this.ref}
          {...rest}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

  return React.forwardRef((props, ref) =>
    <OneTimeProp innerRef={ref} {...props}>{props.children}</OneTimeProp>
  );
};

export default oneTimeProp;
