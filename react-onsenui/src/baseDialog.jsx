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

const baseDialog = DialogComponent =>
  React.forwardRef((props, ref) => {
    // visible prop should be applied last since it depends on animation and
    // maskColor props being set first
    const {visible, ...rest} = props;

    return (
      <Portal>
        <DialogComponent
          {...rest}
          visible={visible}

          ref={ref}
        >
          {props.children}
        </DialogComponent>
      </Portal>
    );
  });

export default baseDialog;
