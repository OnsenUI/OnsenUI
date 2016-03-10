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

  resetPage(route, options = {}) {
    return this.resetPageStack([route], options);
  }

  resetPageStack(routes, options = {}) {
    return new Promise((resolve) => {
      var lastRoute = routes[routes.length -1];
      var newPage = this.props.renderScene(lastRoute, this);
      this.routes.push(lastRoute);

      this.refs.navi._pushPage(options, this.update.bind(this), this.pages, newPage).then( () => {
          this.routes = routes;

          var renderScene = (route) => {
            this.props.renderScene(route, this);
          };

          this.pages = routes.map(renderScene);
          this.update().then(resolve);
        });
    });
  }

  pushPage(route, options = {}) {
    return new Promise((resolve) => {
      var newPage = this.props.renderScene(route, navigator);

      this.routes.push(route);
      this.refs.navi._pushPage(options,
                               this.update.bind(this),
                               this.pages,
                               newPage).then(resolve);
    });
  }

  popPage(options = {}) {
    return new Promise((resolve) => {
      this.routes.pop();
      this.refs.navi._popPage(options, this.update.bind(this), this.pages).then(resolve);
    });
  }

  componentDidMount() {
    this.refs.navi.popPage = this.popPage.bind(this);

    if (this.props.initialRoute && this.props.initialRoutes) {
      throw 'In OnsNavigator either initalRoute or initalRoutes can be set';
    }

    if (this.props.initialRoute) {
      this.routes= [this.props.initialRoute];
    } else if (this.props.initialRoutes) {
      this.routes= this.props.initialRoutes;
    } else {
      this.routes = [];
    }

    this.pages = this.routes.map(
      (route) => this.props.renderScene(route, this)
    );
    this.setState({});
  }

  render() {
    // render the last two pages
    for (var index = this.pages.length -1;
         index >= this.pages.length -2 && index >= 0; index--) {
      this.pages[index] = this.props.renderScene(this.routes[index], this);
    }

    return (
      <ons-navigator {...this.props} ref="navi">
        {this.pages}
      </ons-navigator>
    );
  }
}
