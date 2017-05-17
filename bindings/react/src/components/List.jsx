import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from './BasicComponent.jsx';

/**
 * @original ons-list
 * @category list
 * @tutorial react/Reference/list
 * @description
 *   [en]
 *     Component for representing a list. It takes an array called datasource and calls renderRow(row, index) for every row.  Furthermore, the header and the footer can be specified with `renderRow` and `renderHeader` respectivly. [/en]
 * [ja][/ja]
 * @example
  <List
    dataSource={['Row 1', 'Row 2']}
    renderHeader={this.renderHeader}
    renderRow={(row, idx) => (
      <ListItem modifier={idx === this.state.data.length - 1 ? 'longdivider' : null}>
      {row}
  <Button modifier="quiet" onClick={this.remove.bind(this, idx)}>Remove</Button>
  </ListItem>
  )}
  renderFooter={this.renderFooter}
  />
 */
class List extends BasicComponent {
  render() {
    var pages = this.props.dataSource.map((data, idx) => this.props.renderRow(data, idx));

    return (
      <ons-list {...this.props} ref={(list) => { this._list = list; }}>
        {this.props.renderHeader()}
        {pages}
        {this.props.children}
        {this.props.renderFooter()}
      </ons-list>
    );
  }
}

List.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

   /**
   * @name dataSource
   * @type string
   * @description
   *  [en]
   *    Source of the list data. Should be an array.
   *  [/en]
   *  [ja][/ja]
   */
  dataSource: PropTypes.array,

   /**
   * @name renderRow
   * @type function
   * @description
   *  [en]
   *  Function to specify the rendering function for every element in
   *  in the dataSource.
   *  [/en]
   *  [ja][/ja]
   */
  renderRow: PropTypes.func,

   /**
   * @name renderHeader
   * @type function
   * @description
   *  [en]
   *  Function to specify the rendering function for the header
   *  [/en]
   *  [ja][/ja]
   */
  renderHeader: PropTypes.func,

   /**
   * @name renderFooter
   * @type function
   * @description
   *  [en]
   *  Function to specify the rendering function for the footer
   *  [/en]
   *  [ja][/ja]
   */
  renderFooter: PropTypes.func
};

List.defaultProps = {
  dataSource: [],
  renderRow: () => null,
  renderHeader: () => null,
  renderFooter: () => null
};

export default List;
