import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-list-header';

import onsCustomElement from '../onsCustomElement';

/**
 * @original ons-list-header
 * @category list
 * @tutorial react/Reference/list
 * @description
 * [en] Header element for list items. Must be put inside ons-list component.
 [/en]
 * [ja][/ja]
 * @example
   <List
     dataSource={this.state.data}
     renderHeader={() =>
        <ListHeader style={{fontSize: 15}} className="testClass"> Header Text </ListHeader> }
    renderRow={(row, idx) => (
      <ListItem > {row} </ListItem>
    )}
  />
 */
const ListHeader = onsCustomElement('ons-list-header');

ListHeader.propTypes = {
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

export default ListHeader;
