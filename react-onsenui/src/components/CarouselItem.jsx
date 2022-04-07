import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-carousel-item';

import onsCustomElement from '../onsCustomElement';

/**
 * @original ons-carousel-item
 * @category carousel
 * @tutorial react/Reference/carousel
 * @description
 * [en] Carousel item component. Used as a child of the `<ons-carousel>` element.
 [/en]
 * [ja][/ja]
 * @example
*  <Carousel swipeable overscrollable autoScroll fullscreen >
     <CarouselItem style={{backgroundColor: 'gray'}}>
       <div className='item-label'>GRAY</div>
     </CarouselItem>
     <CarouselItem style={{backgroundColor: '#085078'}}>
       <div className='item-label'>BLUE</div>
     </CarouselItem>
   </Carousel>
 */
const CarouselItem = onsCustomElement('ons-carousel-item');

CarouselItem.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

export default CarouselItem;
