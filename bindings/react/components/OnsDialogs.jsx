var ReactTestUtils = React.addons.TestUtils;

var createDialogClass = function(domName, showFun) {
  var myClass = {
    show: function() {
      this.node.firstChild.show();
    },
    hide: function() {
      this.node.firstChild.hide();
    },
    componentDidMount: function() {
      console.log('mounting');
      this.node = document.createElement('div');
      document.body.appendChild(this.node);

      this.node.addEventListener('cancel', () => {
        this.props.onCancel();
      });
      this.renderPortal(this.props);
    },
    componentWillReceiveProps: function(newProps) {

      if (newProps.isOpen != this.props.isOpen) {
        console.log('true');
        this.animateShow = true;
      }
      this.renderPortal(newProps);
    },
    componentWillUnmount: function() {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    },
    _update: function() {
      CustomElements.upgrade(this.node.firstChild);
      if (this.props.isOpen) {
        if (this.animateShow) {
          console.log('show');
          this.show();
        }
        this.animateShow = false;
      } else {
        this.hide();
      }
    },
    renderPortal: function(props) {
      var element = React.createElement(domName, props);
      ReactDOM.render(element, this.node, this._update);
    },
    shouldComponentUpdate: function() {
      return false;
    },
    render: function() {
      return React.DOM.noscript();
    }
  };
  if (showFun) {
    myClass.show = showFun;
  };

  return React.createClass(myClass);
};

var OnsAlertDialog = createDialogClass('ons-alert-dialog');
var OnsDialog = createDialogClass('ons-dialog');

var showFun = function() {
  var target = this.props.getTarget();
  if (ReactTestUtils.isElement(target)) {
    target = ReactDOM.findDOMNode(target);
  }
  return this.node.firstChild.show(target);
};

var OnsPopover = createDialogClass('ons-popover', showFun);
