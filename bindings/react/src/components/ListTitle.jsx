import PropTypes from 'prop-types';
import wrapOnsElement from './Wrappers';

/**
 * @original ons-list-title
 * @category list
 * @tutorial react/Reference/list
 * @description
 * [en] Title element for lists. Usually comes before ons-list component.
 [/en]
 * [ja][/ja]
 * @example
 * <ListTitle>List Title</ListTitle>
   <List
     dataSource={this.state.data}
     renderHeader={() =>
        <ListHeader style={{fontSize: 15}} className="testClass"> Header Text </ListHeader> }
    renderRow={(row, idx) => (
      <ListItem > {row} </ListItem>
    )}
  />
 */
const ListTitle = wrapOnsElement('ons-list-title');

ListTitle.propTypes = {
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

export default ListTitle;
