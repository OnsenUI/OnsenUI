import SimpleWrapper from './SimpleWrapper.jsx';

import PropTypes from 'prop-types';

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
class Ripple extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-ripple';
  }
}

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
   * @name background
   * @type string
   * @required false
   * @description
   *  [en]Color of the background.[/en]
   *  [ja][/ja]
   */
  background: PropTypes.string,

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
