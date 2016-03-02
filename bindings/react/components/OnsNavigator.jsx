class OnsNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: []
    };
  }

  pushPage(comp, options = {}) {
    const pages = this.state.pages;

    pages.push(comp);

    this.setState({pages: pages}, () => {
      if (pages.length > 1) {
        const [leave, enter] = this.childNodes.slice(-2);

        this.navi._myPushPage(
          {element: enter},
          {element: leave},
          options
        );
      }
    });
  }

  popPage(options = {}) {
    const pages = this.state.pages;
    const [enter, leave] = this.childNodes.slice(-2);

    this.navi._myPopPage(
      {element: enter},
      {element: leave},
      options
    ).then(
      () => {
        console.log(this.refs.navi.children);
        return;
        const pages = this.state.pages;
        pages.pop();
        this.setState({pages: pages});
      }
    );
  }

  get childNodes() {
    return Array.prototype.slice
      .apply(
        ReactDOM.findDOMNode(this).children
      )
      .filter((el) => {
        return el.tagName.toLowerCase() === 'ons-page';
      });
  }

  get navi() {
    return this.refs.navi;
  }

  render() {
    return (
      <ons-navigator ref="navi">
        {this.state.pages}
      </ons-navigator>
    );
  }
}
