import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import Util from './Util.js';

/**
 * @original ons-row
 * @category grid
 * @description
 * [en]
 * Represents a row in the grid system. Use with `Col` to layout components.
 * [/en]
 * [ja][/ja]
 * <Row>
 *   <Col width={50}>
  *   <ons-icon icon="fa-twitter"></ons-icon>
 *   </Col>
 *   <Col>Text</Col>
 * </Row>
 */
class Row extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-row';
  }

  render() {
    var {...others} = this.props;

    Util.convert(others, 'verticalAlign', {newName: 'vertical-align'});

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }

}

Row.propTypes = {

  /**
  * @name verticalAlign
  * @type {String}
  * @description
  *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
  *   [ja][/ja]
  */
  verticalAlign: PropTypes.oneOf(['top', 'bottom', 'center'])

};

export default Row;
