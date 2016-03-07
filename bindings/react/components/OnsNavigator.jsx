class OnsNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.pages = [];
    this.state = { };
  }

  update(pages, obj) {
    return new Promise((resolve) => {
      this.setState({}, resolve);
    });
  }

  pushPage(route, options = {}) {
    var newPage = this.props.renderScene(this, route);

    this.routes.push(route);
    this.refs.navi._pushPage(options, this.update.bind(this), this.pages, newPage);
  }

  popPage(options = {}) {
    this.routes.pop();
    this.refs.navi._popPage(options, this.update.bind(this), this.pages);
  }

  componentDidMount() {
    this.refs.navi.popPage = this.popPage.bind(this);
    this.routes= [this.props.initialRoute];
    this.pages = [this.props.renderScene(this, this.props.initialRoute)];
    this.setState({});
  }

  render() {
    // render the last two pages
    for (var index = this.pages.length -1;
         index >= this.pages.length -2 && index >= 0; index--) {
      this.pages[index] = this.props.renderScene(this, this.routes[index]);
    }

    return (
      <ons-navigator {...this.props} ref="navi">
        {this.pages}
      </ons-navigator>
    );
  }
}
