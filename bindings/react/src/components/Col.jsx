import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import Util from './Util.js';

/**
 * @original ons-col
 * @category grid
 * @description
 * [en]
 * Represents a column in the grid system. Use with `<ons-row>` to layout components.
 * [/en]
 * [ja][/ja]
 * <Row>
 *   <Col width={50}>
  *   <ons-icon icon="fa-twitter"></ons-icon>
 *   </Col>
 *   <Col>Text</Col>
 * </Row>
 */
class Col extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-col';
  }

  render() {
    var {...others} = this.props;

    Util.convert(others, 'verticalAlign', {newName: 'vertical-align'});
    Util.convert(others, 'width', {fun: Util.sizeConverter});

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }

}

Col.propTypes = {

  /**
  * @name verticalAlign
  * @type {String}
  * @description
  *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
  *   [ja][/ja]
  */
  verticalAlign: PropTypes.oneOf(['top', 'bottom', 'center']),

  /**
  * @name width
  * @type {String}
  * @description
  *   [en]The width of the column. Valid values are css width values ("10%", 50).[/en]
  *   [ja][/ja]
  */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Col;
