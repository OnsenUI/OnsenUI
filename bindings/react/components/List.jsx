import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var header = this.props.renderHeader ?
      this.props.renderHeader() : null;

    var pages = this.props.dataSource.map((data, idx) => this.props.renderRow(data, idx));
    return (
      <ons-list {...this.props} ref="list">
        {header}
        {pages}
      </ons-list>
    );
  }
}

export default List;
