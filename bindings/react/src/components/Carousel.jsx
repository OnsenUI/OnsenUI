import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import Util from './Util.js';

/**
 * @original ons-carousel
 * @category carousel
 * @tutorial react/Reference/carousel
 * @description
 * [en] Carousel component. A carousel can be used to display several items in the same space.
 *     The component supports displaying content both horizontally and vertically. The user can scroll through the items by dragging and it can also be controller programmatically.
 [/en]
 * [ja][/ja]
 * @example
 *    <Carousel
          onPostChange={() => console.log('onPostChange')}
          onOverscroll={() => console.log('onOverscroll')}
          onRefresh={() => console.log('onRefresh')}
          ref={(carousel) => { this.carousel = carousel; }}
          swipeable
          overscrollable
          autoScroll
          fullscreen
          autoScrollRatio={0.2}
      >
          <CarouselItem style={{backgroundColor: 'gray'}}>
            <div className='item-label'>GRAY</div>
          </CarouselItem>
          <CarouselItem style={{backgroundColor: '#085078'}}>
            <div className='item-label'>BLUE</div>
          </CarouselItem>
        </Carousel>

 */
class Carousel extends SimpleWrapper {
  constructor(...args) {
    super(...args);

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onChange = callback.bind(this, 'onPostChange');
    this.onRefresh = callback.bind(this, 'onRefresh');
    this.onOverscroll = callback.bind(this, 'onOverscroll');
  }

  _getDomNodeName() {
    return 'ons-carousel';
  }

  componentDidMount() {
    super.componentDidMount();
    const node = findDOMNode(this);
    node.addEventListener('postchange', this.onChange);
    node.addEventListener('refresh', this.onRefresh);
    node.addEventListener('overscroll', this.onOverscroll);
  }

  componentWillUnmount() {
    const node = findDOMNode(this);
    node.removeEventListener('postchange', this.onPostChange);
    node.removeEventListener('refresh', this.onRefresh);
    node.removeEventListener('overscroll', this.onOverscroll);
  }

  componentWillReceiveProps(props) {
    const node = findDOMNode(this);

    if (this.props.index !== props.index) {
      node.setActiveIndex(props.index, props.animationOptions);
    }
  }

  componentDidUpdate(props) {
    const node = findDOMNode(this);

    if (this.props.children.length !== props.children.length) {
      node.refresh();
    }
  }

  render() {
    const {...others} = this.props;

    ['fullscreen', 'swipeable', 'disabled', 'centered', 'overscrollable', 'centered'].forEach((el) => {
      Util.convert(others, el);
    });

    Util.convert(others, 'itemWidth', {fun: Util.sizeConverter, newName: 'item-width'});
    Util.convert(others, 'itemHeight', {fun: Util.sizeConverter, newName: 'item-height'});
    Util.convert(others, 'autoScroll', {newName: 'auto-scroll'});
    Util.convert(others, 'autoRefresh', {newName: 'auto-refresh'});
    Util.convert(others, 'autoScrollRatio', {newName: 'auto-scroll-ratio'});
    Util.convert(others, 'index', {newName: 'initial-index'});
    Util.convert(others, 'animationOptions', {fun: Util.animationOptionsConverter, newName: 'animation-options'});

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }
}

Carousel.propTypes = {

  /**
   * @name direction
   * @type string
   * @required false
   * @description
   *  [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
   *  [ja][/ja]
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @name fullscreen
   * @type bool
   * @description
   *  [en]If true, the carousel will cover the whole screen.[/en]
   *  [ja][/ja]
   */
  fullscreen: PropTypes.bool,

  /**
   * @name overscrollable
   * @type bool
   * @description
   *  [en]If true, the carousel will be scrollable over the edge. It will bounce back when released.[/en]
   *  [ja][/ja]
   */
  overscrollable: PropTypes.bool,

  /**
   * @name centered
   * @type bool
   * @description
   *  [en]If true, the carousel then the selected item will be in the center of the carousel instead of the beginning. Useful only when the items are smaller than the carousel.[/en]
   *  [ja][/ja]
   */
  centered: PropTypes.bool,

  /**
   * @name itemWidth
   * @type number
   * @description
   *  [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
   *  [ja][/ja]
   */
  itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * @name itemHeight
   * @type number
   * @description
   *  [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
   *  [ja][/ja]
   */
  itemHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * @name autoScroll
   * @type bool
   * @description
   *  [en]If true, the carousel will be automatically scrolled to the closest item border when released.[/en]
   *  [ja][/ja]
   */
  autoScroll: PropTypes.bool,

  /**
   * @name autoScrollRatio
   * @type number
   * @description
   *  [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[/en]
   *  [ja][/ja]
   */
  autoScrollRatio: PropTypes.number,

  /**
   * @name swipeable
   * @type bool
   * @description
   *  [en]If true, the carousel can be scrolled by drag or swipe.[/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]If true, the carousel will be disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name index
   * @type number
   * @description
   *  [en]Specify the index of the ons-carousel-item to show. Default is 0.[/en]
   *  [ja][/ja]
   */
  index: PropTypes.number,

  /**
   * @name autoRefresh
   * @type bool
   * @description
   *  [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
   *  [ja][/ja]
   */
  autoRefresh: PropTypes.bool,

  /**
   * @name onPostChange
   * @type function
   * @description
   *  [en]Called just after the current carousel item has changed.  [/en]
   *  [ja][/ja]
   */
  onPostChange: PropTypes.func,

  /**
   * @name onRefresh
   * @type function
   * @description
   *  [en]Called when the carousel has been refreshed. [/en]
   *  [ja][/ja]
   */
  onRefresh: PropTypes.func,

  /**
   * @name onOverscroll
   * @type function
   * @description
   *  [en]Called when the carousel has been overscrolled. [/en]
   *  [ja][/ja]
   */
  onOverscroll: PropTypes.func,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object
};

export default Carousel;
