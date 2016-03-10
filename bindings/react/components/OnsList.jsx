class OnsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var pages = this.props.dataSource.map( (data) => this.props.renderRow(data));
    return (
      <ons-list {...this.props} ref="list">
        {pages}
      </ons-list>
    );
  }
}
