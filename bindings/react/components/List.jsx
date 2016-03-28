import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var pages = this.props.dataSource.map((data, idx) => this.props.renderRow(data, idx));

    return (
      <ons-list {...this.props} ref="list">
        {this.props.renderHeader()}
        {pages}
        {this.props.renderFooter()}
      </ons-list>
    );
  }
}

List.defaultProps = {
  renderHeader: () => null,
  renderFooter: () => null
};

export default List;
