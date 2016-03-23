var MyPage  = React.createClass({
  getInitialState: function() {
     return {isOpen: false};
  },
  showClick: function(target) {
      console.log('target: ' +  target);
      this.setState({isOpen: true, target: target});
  },
  getTarget: function() {
    return this.state.target;
  },
  cancel: function() {
    console.log('cancel');
    this.setState({isOpen: false});
  },
  render: function() {
    return (
      <Ons.Page>
      <div className="navigation-bar">
        <div className="navigation-bar__left">
          <span ref="navigation" onClick={() => this.showClick(this.refs.navigation)} className="toolbar-button--outline navigation-bar__line-height">
            <i className="ion-navicon" style={{fontSize: 32, verticalAlign: -6}}></i>
          </span>
        </div>

        <div className="navigation-bar__center">
          Popover demo!
        </div>

        <div className="navigation-bar__right">
          <span ref="topRight" onClick={() => this.showClick(this.refs.topRight)} className="toolbar-button--outline navigation-bar__line-height">Button</span>
        </div>
      </div>

      <div style={{textAlign: 'center'}}>
        <br />
        <br />
        <Ons.Button ref="button" onClick={() => this.showClick(this.refs.button)}>Click me!</Ons.Button>
      </div>

      <div className="tab-bar">
        <label onClick={() => this.showClick(this.refs.stop)} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" defaultChecked="checked" />
          <button ref="stop" className="tab-bar__button">
            <i className="tab-bar__icon ion-stop"></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.refs.record)} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button ref="record" className="tab-bar__button">
            <i className="tab-bar__icon ion-record"></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.refs.star)}  className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button ref="star" className="tab-bar__button">
            <i className="tab-bar__icon ion-star"></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.refs.cloud)} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button ref="cloud" className="tab-bar__button">
            <i className="tab-bar__icon ion-ios-cloud-outline"></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.refs.pie)} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button ref="pie" className="tab-bar__button">
            <i className="tab-bar__icon ion-ios-pie"></i>
          </button>
        </label>
      </div>
      <Ons.Popover isOpen={this.state.isOpen} onCancel={this.cancel} getTarget={this.getTarget} direction="up down" cancelable>
        <div style={{textAlign: 'center', opacity: 0.5}}>
          <p>This is a popover!</p>
          <p><small>Click the background to remove the popover.</small></p>
        </div>
        </Ons.Popover>
    </Ons.Page>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
