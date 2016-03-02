class OnsNavigatorPage extends React.Component {
  render() {
    return this.props.children;
  }
}

class OnsNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.running = false;

    this.state = {
      pages: []
    };
  }

  _runPushAnimation(options) {
    const pages = this.state.pages;

    const [leave, enter] = [
      this.refs[`item${pages.length - 2}`],
      this.refs[`item${pages.length - 1}`]
    ].map((c) => ReactDOM.findDOMNode(c));

    this.running = true;

    return new Promise((resolve) => {
      this.refs.navi
        ._myPushPage(
          {element: enter},
          {element: leave},
          options
        )
        .then(() => {
          this.running = false;
          resolve();
        });
    });
  }

  pushPage(comp, options = {}) {
    if (this.running) {
      return;
    }

    const pages = this.state.pages;
    pages.push(comp);

    this.setState({pages: pages}, () => {
      if (pages.length > 1) {
        this._runPushAnimation(options);
      }
    });
  }

  insertPage(comp, idx, options = {}) {
    if (this.running) {
      return;
    }

    const pages = this.state.pages;
    pages.splice(idx, 0, comp);

    this.setState({pages: pages}, () => {
      if (pages[ pages.length - 1] === comp) {
        this._runPushAnimation(options);
      }
    });
  }

  replacePage(comp, options = {}) {
    if (this.running) {
      return;
    }

    const pages = this.state.pages;
    pages.push(comp);

    this.setState({pages: pages}, () => {
      this._runPushAnimation(options)
        .then(() => {
          pages.splice(pages.length - 2, 1);
          this.setState({pages: pages});
          console.log(pages.length);
        });
    });
  }

  popPage(options = {}) {
    if (this.running) {
      return;
    }

    const pages = this.state.pages;

    if (pages.length < 2) {
      return;
    }

    const [enter, leave] = [
      this.refs[`item${pages.length - 2}`],
      this.refs[`item${pages.length - 1}`]
    ].map((c) => ReactDOM.findDOMNode(c));

    this.running = true;

    this.refs.navi._myPopPage(
      {element: enter},
      {element: leave},
      options
    ).then(
      () => {
        const pages = this.state.pages;
        pages.pop();
        this.setState({pages: pages});
        this.running = false;
      }
    );
  }

  componentDidMount() {
    if (typeof this.props.children !== 'undefined') {
      this.pushPage(this.props.children);
    }
    this.refs.navi.popPage = this.popPage.bind(this);
  }

  render() {
    return (
      <ons-navigator ref="navi">
        {
          this.state.pages.map((page, idx) => {
            return <OnsNavigatorPage ref={`item${idx}`}>{page}</OnsNavigatorPage>
          })
        }
      </ons-navigator>
    );
  }
}
