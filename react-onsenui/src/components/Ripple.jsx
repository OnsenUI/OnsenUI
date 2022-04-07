import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-ripple';

import onsCustomElement from '../onsCustomElement';

/**
 * @original ons-ripple
 * @category visual
 * @tutorial react/Reference/ripple
 * @description
 * [en]
 *   Adds a Material Design "ripple" effect to an element.
 * [/en]
 * [ja][/ja]
 * @example
   <div className='myList'>
     <Ripple color='red' />
   </div>
 */
const Ripple = onsCustomElement('ons-ripple');

Ripple.propTypes = {
  /**
   * @name color
   * @type string
   * @required false
   * @description
   *  [en]Color of the ripple effect.[/en]
   *  [ja][/ja]
   */
  color: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the ripple effect.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name background
   * @type string
   * @required false
   * @description
   *  [en]Color of the background.[/en]
   *  [ja][/ja]
   */
  background: PropTypes.string,

  /**
   * @name size
   * @type string
   * @required false
   * @description
   *  [en]Sizing of the wave on ripple effect. Set "cover" or "contain". Default is "cover".[/en]
   *  [ja][/ja]
   */
  size: PropTypes.string,

  /**
   * @name size
   * @type string
   * @required false
   * @description
   *  [en]Changes the position of wave effect to center of the target element.[/en]
   *  [ja][/ja]
   */
  center: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

export default Ripple;
