import React from 'react';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-carousel';

import onsCustomElement from '../onsCustomElement';

const deprecated = {
  index: 'activeIndex'
};

const Element = onsCustomElement('ons-carousel', {deprecated});

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
const Carousel = React.forwardRef((props, ref) => {
  const {itemWidth, itemHeight, ...rest} = props;

  // string values for itemWidth and itemHeight are deprecated but handle them
  // safely anyway to avoid breaking user code
  const stringify = x => typeof x === 'number' ? `${x}px` : x;
  const realItemWidth = stringify(itemWidth);
  const realItemHeight = stringify(itemHeight);

  return (
    <Element
      itemWidth={realItemWidth}
      itemHeight={realItemHeight}
      ref={ref}
      {...rest}
    >
      {props.children}
    </Element>
  );
});

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
   * @type string
   * @description
   *  [en]ons-carousel-item's width. Only works when the direction is set to "horizontal". Can be in pixels or a percentage.[/en]
   *  [ja][/ja]
   */
  itemWidth: PropTypes.string,

  /**
   * @name itemHeight
   * @type string
   * @description
   *  [en]ons-carousel-item's height. Only works when the direction is set to "vertical". Can be in pixels or a percentage.[/en]
   *  [ja][/ja]
   */
  itemHeight: PropTypes.string,

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
   * @name activeIndex
   * @type number
   * @description
   *  [en]Specify the index of the ons-carousel-item to show. Default is 0.[/en]
   *  [ja][/ja]
   */
  activeIndex: PropTypes.number,

  /**
   * @name index
   * @type number
   * @description
   *  [en]DEPRECATED! Use `activeIndex` instead.[/en]
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
   * @name onPreChange
   * @type function
   * @description
   *  [en]Called just before the current carousel item changes.[/en]
   *  [ja][/ja]
   */
  onPreChange: PropTypes.func,

  /**
   * @name onPostChange
   * @type function
   * @description
   *  [en]Called just after the current carousel item has changed.[/en]
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
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]If this prop is set to "none" the transitions will not be animated.[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

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
   * @name onSwipe
   * @type function
   * @description
   *  [en]Hook called whenever the user slides the carousel. It gets a decimal index and an animationOptions object as arguments.[/en]
   *  [ja][/ja]
   */
  onSwipe: PropTypes.func
};

export default Carousel;
