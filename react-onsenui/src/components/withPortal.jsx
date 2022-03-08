import React from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.container
    );
  }
}

const withPortal = WrappedComponent =>
  React.forwardRef((props, ref) => (
    <Portal>
      <WrappedComponent {...props} ref={ref}>
        {props.children}
      </WrappedComponent>
    </Portal>
  ));

export default withPortal;
