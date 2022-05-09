import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-popover';

import onsCustomElement from '../onsCustomElement';
import baseDialog from '../baseDialog';

const deprecated = {
  onCancel: 'onDialogCancel',
  isDisabled: 'disabled',
  isCancelable: 'cancelable'
};

const notAttributes = ['onDeviceBackButton'];

const Elem = onsCustomElement(baseDialog('ons-popover'), {deprecated, notAttributes});

/**
 * @original ons-popover
 * @category dialog
 * @tutorial react/Reference/popover
 * @description
 *   [en]
 *     A component that displays a popover next to an element. The popover can be used to display extra information about a component or a tooltip.
 *    Another common way to use the popover is to display a menu when a button on the screen is tapped.
 *   [/en]
 * [ja][/ja]
 * @example
 * <Page>
 *  <Button
 *    ref={(btn) => { this.btn = btn; }}
 *    onClick={() =>
 *      this.setState({target: this.btn, isOpen: true})
 *    }
 *  />
    <Popover
      isOpen={this.state.isOpen}
      onCancel={() => this.setState({isOpen: false})}
      getTarget={() => this.state.target}
    >
      <div style={{textAlign: 'center', opacity: 0.5}}>
        <p>This is a popover!</p>
          <p><small>Click the background to remove the popover.</small></p>
        </div>
        </Popover>
 * </Page>
 */
const Popover = React.forwardRef((props, forwardedRef) => {
  const {isOpen, getTarget, children, ...rest} = props;
  const ref = forwardedRef || useRef();

  useEffect(() => {
    if (isOpen !== ref.current.visible) {
      if (isOpen) {
        let target = getTarget();

        // if React ref was returned instead of DOM Element, use ref.current instead
        const isElement = x => x instanceof Element || x instanceof HTMLDocument;
        if (!isElement(target) && target.current) {
          target = target.current;
        }

        ref.current.show({target});
      } else {
        ref.current.hide();
      }
    }
  });

  return (
    <Elem
      ref={ref}
      {...rest}
    >
      {children}
    </Elem>
  );
});

Popover.propTypes = {
  /**
   * @name getTarget
   * @type function
   * @required true
   * @description
   *  [en]
   *  This function should return a ref to the DOM node that the popover will target.
   *  [/en]
   *  [ja][/ja]
   */
  getTarget: PropTypes.func.isRequired,

  /**
   * @name onDialogCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called only if isCancelable is true. It will be called after tapping the background or by pressing the back button on Android devices.
   *  [/en]
   *  [ja][/ja]
   */
  onDialogCancel: PropTypes.func,

  /**
   * @name onCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  DEPRECATED! Use `onDialogCancel` instead.
   *  [/en]
   *  [ja][/ja]
   */
  onCancel: PropTypes.func,

  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the dialog is open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name cancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is cancelable or not.
   *  A cancelable dialog will call onCancel  when tapping the background or or  pressing the back button on Android devices
   *  [/en]
   *  [ja][/ja]
   */
  cancelable: PropTypes.bool,

  /**
   * @name isCancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  DEPRECATED! Use `cancelable` instead.
   *  [/en]
   *  [ja][/ja]
   */
  isCancelable: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name isDisabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  DEPRECATED! Use `disabled` instead.
   *  [/en]
   *  [ja][/ja]
   */
  isDisabled: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]
   *  The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.
   *  [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name maskColor
   * @type string
   * @required false
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)"[/en]
   *  [ja][/ja]
   */
  maskColor: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

export default Popover;
