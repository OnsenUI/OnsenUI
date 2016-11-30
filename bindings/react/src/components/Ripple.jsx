import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';

/**
 * @original ons-ripple
 * @category visual
 * @tutorial react/Reference/ripple
 * @description
 * [en]
 *   Adds a Material Design "ripple" effect to an element.
 * [/en]
 * [jp][/jp]
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
   *  [jp] [/jp]
   */
  color: React.PropTypes.string,

  /**
   * @name background
   * @type string
   * @required false
   * @description
   *  [en]Color of the background.[/en]
   *  [jp] [/jp]
   */
  background: React.PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [jp] [/jp]
   */
  disabled: React.PropTypes.bool
};

export default Ripple;
