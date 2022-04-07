import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-gesture-detector';

import onsCustomElement from '../onsCustomElement';

const propTypes = {

  /**
   * @name onDrag
   * @type function
   * @description
   *  [en]Called when the user drags in any direction.[/en]
   *  [ja][/ja]
   */
  onDrag: PropTypes.func,

  /**
   * @name onDragLeft
   * @type function
   * @description
   *  [en]Called when the user drags left.[/en]
   *  [ja][/ja]
   */
  onDragLeft: PropTypes.func,

  /**
   * @name onDragRight
   * @type function
   * @description
   *  [en]Called when the user drags right.[/en]
   *  [ja][/ja]
   */
  onDragRight: PropTypes.func,

  /**
   * @name onDragUp
   * @type function
   * @description
   *  [en]Called when the user drags up.[/en]
   *  [ja][/ja]
   */
  onDragUp: PropTypes.func,

  /**
   * @name onDragDown
   * @type function
   * @description
   *  [en]Called when the user drags down.[/en]
   *  [ja][/ja]
   */
  onDragDown: PropTypes.func,

  /**
   * @name onHold
   * @type function
   * @description
   *  [en]Called when the user holds.[/en]
   *  [ja][/ja]
   */
  onHold: PropTypes.func,

  /**
   * @name onRelease
   * @type function
   * @description
   *  [en]Called when the user releases.[/en]
   *  [ja][/ja]
   */
  onRelease: PropTypes.func,

  /**
   * @name onSwipe
   * @type function
   * @description
   *  [en]Called when the user swipes in any direction.[/en]
   *  [ja][/ja]
   */
  onSwipe: PropTypes.func,

  /**
   * @name onSwipeLeft
   * @type function
   * @description
   *  [en]Called when the user swipes left.[/en]
   *  [ja][/ja]
   */
  onSwipeLeft: PropTypes.func,

  /**
   * @name onSwipeRight
   * @type function
   * @description
   *  [en]Called when the user swipes right.[/en]
   *  [ja][/ja]
   */
  onSwipeRight: PropTypes.func,

  /**
   * @name onSwipeUp
   * @type function
   * @description
   *  [en]Called when the user swipes up.[/en]
   *  [ja][/ja]
   */
  onSwipeUp: PropTypes.func,

  /**
   * @name onSwipeDown
   * @type function
   * @description
   *  [en]Called when the user swipes down.[/en]
   *  [ja][/ja]
   */
  onSwipeDown: PropTypes.func,

  /**
   * @name onTap
   * @type function
   * @description
   *  [en]Called when the user taps.[/en]
   *  [ja][/ja]
   */
  onTap: PropTypes.func,

  /**
   * @name onDoubleTap
   * @type function
   * @description
   *  [en]Called when the user double taps.[/en]
   *  [ja][/ja]
   */
  onDoubleTap: PropTypes.func,

  /**
   * @name onPinch
   * @type function
   * @description
   *  [en]Called when the user pinches in or out.[/en]
   *  [ja][/ja]
   */
  onPinch: PropTypes.func,

  /**
   * @name onPinchIn
   * @type function
   * @description
   *  [en]Called when the user pinches in.[/en]
   *  [ja][/ja]
   */
  onPinchIn: PropTypes.func,

  /**
   * @name onPinchOut
   * @type function
   * @description
   *  [en]Called when the user pinches out.[/en]
   *  [ja][/ja]
   */
  onPinchOut: PropTypes.func,

  /**
   * @name onTouch
   * @type function
   * @description
   *  [en]Called when the user touches.[/en]
   *  [ja][/ja]
   */
  onTouch: PropTypes.func,

  /**
   * @name onTransform
   * @type function
   * @description
   *  [en]Called when the user transforms.[/en]
   *  [ja][/ja]
   */
  onTransform: PropTypes.func,

  /**
   * @name onRotate
   * @type function
   * @description
   *  [en]Called when the user rotates.[/en]
   *  [ja][/ja]
   */
  onRotate: PropTypes.func
};

/**
 * @original ons-gesture-detector
 * @category gesture
 * @tutorial react/Reference/gesture-detector
 * @description
 * [en]Component to detect finger gestures within a wrapped element.
 [/en]
 * [ja][/ja]
 * @example
 * <GestureDetector
 *   onTap={() => console.log('tap')}
 *   onSwipeleft={() => console.log('swipe left')}
 * >
 *   <div style={{backgroundColor: 'pink', width: '100px', height: '100px'}}>
 *     Swipe Here
 *   </div>
 * </GestureDetector>
 *
 */
const GestureDetector = onsCustomElement('ons-gesture-detector', {propTypes});
GestureDetector.propTypes = propTypes;

export default GestureDetector;
