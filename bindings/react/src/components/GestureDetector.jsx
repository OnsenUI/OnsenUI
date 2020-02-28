import SimpleWrapper from './SimpleWrapper.jsx';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

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
class GestureDetector extends SimpleWrapper {

  constructor(props) {
    super(props);

    this.gestures = [
      'drag', 'dragleft', 'dragright', 'dragup', 'dragdown',
      'hold', 'release',
      'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
      'tap', 'doubletap',
      'pinch', 'pinchin', 'pinchout',
      'touch', 'transform', 'rotate'
    ];
  }

  _getDomNodeName() {
    return 'ons-gesture-detector';
  }

  propFromEvent(event) {
    return 'on' + event.charAt(0).toUpperCase() + event.slice(1);
  }

  componentDidMount() {
    const node = findDOMNode(this);
    this.gestures.forEach(gesture =>
      node.addEventListener(gesture, this.props[this.propFromEvent(gesture)]));
  }

  componentWillUnmount() {
    const node = findDOMNode(this);
    this.gestures.forEach(gesture =>
      node.removeEventListener(gesture, this.props[this.propFromEvent(gesture)]));
  }
}


GestureDetector.propTypes = {


  /**
   * @name onDrag
   * @type function
   * @description
   *  [en]Called when the user drags in any direction.[/en]
   *  [ja][/ja]
   */
  onDrag: PropTypes.func,

  /**
   * @name onDragleft
   * @type function
   * @description
   *  [en]Called when the user drags left.[/en]
   *  [ja][/ja]
   */
  onDragleft: PropTypes.func,

  /**
   * @name onDragright
   * @type function
   * @description
   *  [en]Called when the user drags right.[/en]
   *  [ja][/ja]
   */
  onDragright: PropTypes.func,

  /**
   * @name onDragup
   * @type function
   * @description
   *  [en]Called when the user drags up.[/en]
   *  [ja][/ja]
   */
  onDragup: PropTypes.func,

  /**
   * @name onDragdown
   * @type function
   * @description
   *  [en]Called when the user drags down.[/en]
   *  [ja][/ja]
   */
  onDragdown: PropTypes.func,

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
   * @name onSwipeleft
   * @type function
   * @description
   *  [en]Called when the user swipes left.[/en]
   *  [ja][/ja]
   */
  onSwipeleft: PropTypes.func,

  /**
   * @name onSwiperight
   * @type function
   * @description
   *  [en]Called when the user swipes right.[/en]
   *  [ja][/ja]
   */
  onSwiperight: PropTypes.func,

  /**
   * @name onSwipeup
   * @type function
   * @description
   *  [en]Called when the user swipes up.[/en]
   *  [ja][/ja]
   */
  onSwipeup: PropTypes.func,

  /**
   * @name onSwipedown
   * @type function
   * @description
   *  [en]Called when the user swipes down.[/en]
   *  [ja][/ja]
   */
  onSwipedown: PropTypes.func,

  /**
   * @name onTap
   * @type function
   * @description
   *  [en]Called when the user taps.[/en]
   *  [ja][/ja]
   */
  onTap: PropTypes.func,

  /**
   * @name onDoubletap
   * @type function
   * @description
   *  [en]Called when the user double taps.[/en]
   *  [ja][/ja]
   */
  onDoubletap: PropTypes.func,

  /**
   * @name onPinch
   * @type function
   * @description
   *  [en]Called when the user pinches in or out.[/en]
   *  [ja][/ja]
   */
  onPinch: PropTypes.func,

  /**
   * @name onPinchin
   * @type function
   * @description
   *  [en]Called when the user pinches in.[/en]
   *  [ja][/ja]
   */
  onPinchin: PropTypes.func,

  /**
   * @name onPinchout
   * @type function
   * @description
   *  [en]Called when the user pinches out.[/en]
   *  [ja][/ja]
   */
  onPinchout: PropTypes.func,

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

export default GestureDetector;
