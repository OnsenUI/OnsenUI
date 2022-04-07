import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-back-button';

import onsCustomElement from '../onsCustomElement';

const notAttributes = ['options'];

/**
 * @original ons-back-button
 * @category navigation
 * @tutorial react/Reference/back-button
 * @description
 * [en]
 *   Back button component for Toolbar. It enables to automatically to pop the top page of the navigator. When only presented with one page, the button is hidden automatically.
 *
 *   The default behavior can be overridden using the `onClick` prop.
 * [/en]
 * [ja][/ja]
 * @example
 * <Toolbar modifier={this.props.modifier} >
      <div className="left"><BackButton modifier={this.props.modifier}>Back</BackButton></div>
      <div className="center">{this.props.title}</div>
   </Toolbar>
 */
const BackButton = onsCustomElement('ons-back-button', {notAttributes});

BackButton.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the back button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en]This function will be called when the button is clicked. To prevent the default click behaviour, call `event.preventDefault()`.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func,

  /**
   * @name options
   * @type object
   * @description
   *  [en]Specifies the animation, animationOptions, and callback.[/en]
   *  [ja][/ja]
   */
  options: PropTypes.shape({
    animation: PropTypes.string,
    animationOptions: PropTypes.object,
    callback: PropTypes.func
  })
};

export default BackButton;
