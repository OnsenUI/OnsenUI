import SimpleWrapper from './SimpleWrapper.jsx';
import {findDOMNode} from 'react-dom';

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

export default GestureDetector;
