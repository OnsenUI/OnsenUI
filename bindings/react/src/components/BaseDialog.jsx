import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Util from './Util.js';

class BaseDialog extends React.Component {

  constructor(...args) {
    super(...args);

    const callback = (name, event) => {
      if (this.props[name] instanceof Function) {
        return this.props[name](event);
      }
    };

    ['onCancel', 'onPreShow', 'onPostShow', 'onPreHide', 'onPostHide']
      .forEach(k => callback.bind(this, k));
  }

  componentDidMount() {
    const node = this._dialog;
    node.addEventListener('dialog-cancel', this.onCancel);
    node.addEventListener('preshow', this.onPreShow);
    node.addEventListener('postshow', this.onPostShow);
    node.addEventListener('prehide', this.onPreHide);
    node.addEventListener('posthide', this.onPostHide);

    this._update();
  }

  componentWillUnmount() {
    const node = this._dialog;
    node.removeEventListener('dialog-cancel', this.onCancel);
    node.removeEventListener('preshow', this.onPreShow);
    node.removeEventListener('postshow', this.onPostShow);
    node.removeEventListener('prehide', this.onPreHide);
    node.removeEventListener('posthide', this.onPostHide);

    if (node.visible) {
      node.hide(); // FIXME
    }
  }

  componentDidUpdate(prevProps) {
    this._update(prevProps);
  }

  _update(prevProps = {}) {
    if (this.props.isOpen !== this._dialog.visible) {
      this._dialog.toggle(this.props.isOpen);
    }

    const dbb = this.props.onDeviceBackButton;
    if (prevProps.onDeviceBackButton !== dbb && dbb instanceof Function) {
      this._dialog.onDeviceBackButton = dbb;
    }
  }

  _getDomNodeName() {
    throw new Error('_getDomNodeName must be implemented');
  }

  render() {
    const { isOpen, ...newProps } = this.props;
    const DomNodeName = this._getDomNodeName();

    Util.convert(newProps, 'isCancelable', {newName: 'cancelable'});
    Util.convert(newProps, 'isDisabled', {newName: 'disabled'});
    Util.convert(newProps, 'maskColor', {newName: 'mask-color'});
    Util.convert(newProps, 'animationOptions', {fun: Util.animationOptionsConverter, newName: 'animation-options'});

    return ReactDOM.createPortal(
      <DomNodeName { ...newProps } ref={ el => (this._dialog = el) }>
        { this.props.children }
      </DomNodeName>,
      document.body
    );
  }
}

BaseDialog.propTypes = {
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  isCancelable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  animation: PropTypes.string,
  maskColor: PropTypes.string,
  animationOptions: PropTypes.object,
  onPreShow: PropTypes.func,
  onPostShow: PropTypes.func,
  onPreHide: PropTypes.func,
  onPostHide: PropTypes.func,
  onDeviceBackButton: PropTypes.func
};

BaseDialog.defaultProps = {
  isCancelable: true,
  isDisabled: false
};

export default BaseDialog;
