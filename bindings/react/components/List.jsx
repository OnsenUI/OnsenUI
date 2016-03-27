import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var pages = this.props.dataSource.map((data, idx) => this.props.renderRow(data, idx));
    return (
      <ons-list {...this.props} ref="list">
        {pages}
      </ons-list>
    );
  }
}

export default List;
