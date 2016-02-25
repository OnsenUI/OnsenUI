var Popover = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return (<ons-popover direction="up down" cancelable>
        <div style={{textAlign: 'center', opacity: 0.5}}>
          <p>This is a popover!</p>
          <p><small>Click the background to remove the popover.</small></p>
        </div>
      </ons-popover>);
  }
});

var MyPage  = React.createClass({
  show: function(name) { 
    reactUtil.createCustomDialog(
      <Popover />
    ).then(function(obj) {
      obj.show(name);
    });

  },
  render: function() {
    return (
      <OnsPage>
      <div className="navigation-bar">
        <div className="navigation-bar__left">
          <span id="navigation" onClick={this.show.bind(this, '#navigation')} className="toolbar-button--outline navigation-bar__line-height">
            <i className="ion-navicon" style={{fontSize:32, verticalAlign: -6}}></i>
          </span>
        </div>

        <div className="navigation-bar__center">
          Popover demo!
        </div>

        <div className="navigation-bar__right">
          <span id="top-right" onClick={this.show.bind(this, '#top-right')} className="toolbar-button--outline navigation-bar__line-height">Button</span>
        </div>
      </div>

      <div style={{textAlign: 'center'}}>
        <br />
        <br />
        <ons-button id="button" onClick={this.show.bind(this, '#button')}>Click me!</ons-button>
      </div>

      <div className="tab-bar">
        <label onClick={this.show.bind(this, '#stop')} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" checked="checked" />
          <button id="stop" className="tab-bar__button">
            <i className="tab-bar__icon ion-stop"></i>
          </button>
        </label>

        <label onClick={this.show.bind(this, '#record')} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button id="record" className="tab-bar__button">
            <i className="tab-bar__icon ion-record"></i>
          </button>
        </label>

        <label onClick={this.show.bind(this, '#star')} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button id="star" className="tab-bar__button">
            <i className="tab-bar__icon ion-star"></i>
          </button>
        </label>

        <label onClick={this.show.bind(this, '#cloud')} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button id="cloud" className="tab-bar__button">
            <i className="tab-bar__icon ion-ios-cloud-outline"></i>
          </button>
        </label>

        <label onClick={this.show.bind(this, '#pie')} className="tab-bar__item">
          <input type="radio" name="tab-bar-b" />
          <button id="pie" className="tab-bar__button">
            <i className="tab-bar__icon ion-ios-pie"></i>
          </button>
        </label>
      </div>
    </OnsPage>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
