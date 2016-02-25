// var OnsAlertDialog = React.createClass({
//   show: function() {
//     this.node.firstChild.show();
//   },
//   hide: function() {
//      this.node.firstChild.hide();
//   },
//   componentDidMount: function() {
//     this.node = document.createElement('div');
//     document.body.appendChild(this.node);
//     this.renderPortal(this.props);
//   },
//   componentWillReceiveProps: function(newProps) {
//     this.renderPortal(newProps);
//   },
//   componentWillUnmount: function() {
//     ReactDOM.unmountComponentAtNode(this.node);
//     document.body.removeChild(this.node);
//   },
//   renderPortal: function(props) {
//     ReactDOM.render(<ons-alert-dialog {...this.props} />, this.node,
//                     function() {
//                       if (this.props.isOpen) {
//                         this.show();
//                       } else {
//                         this.hide();
//                       }
//                     }.bind(this));
//   },
//   render: function() {
//       return React.DOM.noscript();
//   }
// });

var createDialogClass = function(domName) {
 return React.createClass({
  show: function() {
    this.node.firstChild.show();
  },
  hide: function() {
     this.node.firstChild.hide();
  },
  componentDidMount: function() {
    this.node = document.createElement('div');
    document.body.appendChild(this.node);

    this.node.addEventListener('cancel', function()  {
      console.log('call cancel');
      this.props.onCancel();
    }.bind(this));
    this.renderPortal(this.props);
  },
  componentWillReceiveProps: function(newProps) {
    this.renderPortal(newProps);
  },
  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  },
  renderPortal: function(props) {
    var element = React.createElement(domName, this.props);
    ReactDOM.render(element, this.node,
                    function() {


                      if (this.props.isOpen) {
                        this.show();
                      } else {
                        this.hide();
                      }
                    }.bind(this));
  },
  render: function() {
    return React.DOM.noscript();
  }
});
};

var OnsAlertDialog = createDialogClass('ons-alert-dialog');
var OnsDialog = createDialogClass('ons-dialog');
