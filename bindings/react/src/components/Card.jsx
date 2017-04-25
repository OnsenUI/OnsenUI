import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';

/**
 * @original ons-card
 * @category visual
 * @tutorial react/Reference/visual
 * @description
 * [en]Card component that can be used to display content.[/en]
 * [jp] どうしよう[/jp]
 * @example
 *
<Card>
  <p>Some content</p>
</Card>
 */
class Card extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-card';
  }
}

Card.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [jp] どうしよう[/jp]
   */
  modifier: React.PropTypes.string
};

export default Card;
