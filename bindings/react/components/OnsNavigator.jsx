class OnsNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  update(pages, obj) {
    return new Promise((resolve) => {
      this.setState({}, resolve);
    });
  }

  pushPage(route, options = {}) {
    var newPage = this.props.renderScene(this, route);
    this.refs.navi._pushPage(options, this.update.bind(this), this.pages, newPage);
  }

  popPage(options = {}) {
    this.refs.navi._popPage(options, this.update.bind(this), this.pages);
  }

  componentDidMount() {
    this.refs.navi.popPage = this.popPage.bind(this);
    this.setState({routes: [this.props.initialRoute]});
    this.pages = [this.props.renderScene(this, this.props.initialRoute)];
  }

  render() {
    return (
      <ons-navigator {...this.props} ref="navi">
        {this.pages}
      </ons-navigator>
    );
  }
}
