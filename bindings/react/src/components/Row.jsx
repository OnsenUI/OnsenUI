import PropTypes from 'prop-types';
import wrapOnsElement from './Wrappers';

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
const Row = wrapOnsElement('ons-row');

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
