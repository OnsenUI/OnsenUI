/*! react-onsenui.js for onsenui - v2.0.0-beta.6 - 2016-02-10 */
var OnsNavigator = React.createClass({
  displayName: 'OnsNavigator',

  componentDidMount: function () {
    var node = ReactDOM.findDOMNode(this);
    var page = this.props.children;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }

    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = function (navigatorElement, target, options, callback) {

      console.log('link');

      if (node.firstChild._pages.length == 1 && !this.insert) {
        node.firstChild.innerHTML = node.firstChild._initialHTML;
      }

      lastLink(navigatorElement, target, options, callback);
      console.log('link finished');
    }.bind(this);

    this.elements = [];
    this.elements.push({ elem: this.props.children });

    this.myDom = ReactDOM.render(React.createElement(
      'ons-navigator',
      this.props,
      page
    ), node);
  },

  popPage: function () {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    navNode.popPage();

    console.log('pop');
    console.log(navNode);
    this.elements.pop();

    var help = [];

    for (var i = 0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var node = ReactDOM.findDOMNode(this);
    var node2 = ReactDOM.render(React.createElement(
      'ons-navigator',
      null,
      help
    ), node);
  },
  render: function () {
    return React.createElement('div', null);
  },

  componentWillReceiveProps: function (newProps) {
    var props = newProps || this.props;

    var help = [];
    this.elements = [];
    this.elements.push({ elem: props.children });

    for (var i = 0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var node = ReactDOM.findDOMNode(this);

    ReactDOM.render(React.createElement(
      'ons-navigator',
      null,
      help
    ), node);
  },

  insertComponent: function (reactPage, insertPos) {

    var node = ReactDOM.findDOMNode(this);
    insertPos = node.firstChild._normalizeIndex(insertPos);

    this.insert = true;
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react inserts needs to render to <ons-page>");
    }

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);
    this.elements.splice(insertPos, 0, { elem: reactPage });

    var help = [];
    for (var i = 0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var elements = this.elements;
    node.firstChild.insertPage(insertPos, '', { pageHTML: htmlString }).then(function () {
      this.insert = false;
      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        null,
        help
      ), node);

      for (var i = 0; i < elements.length - 1; i++) {
        var index = i;
        if (index >= insertPos + 1) index++;
        node.firstChild._pages[i].element = node.firstChild.children[index];
      }
      node.firstChild.removeChild(node.firstChild.children[insertPos + 1]);
    }.bind(this));
  },

  pushComponent: function (reactPage) {
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react pushes needs to render to <ons-page>");
    }

    this.elements.push({ elem: reactPage });
    var elements = this.elements;

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    var node = ReactDOM.findDOMNode(this);
    node.firstChild._pushPage(null, { pageHTML: htmlString }).then(function () {
      var help = [];
      for (var i = 0; i < elements.length; i++) {
        help.push(elements[i].elem);
      }

      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        null,
        help
      ), node);

      node2._pages[elements.length - 1].element = node2.children[elements.length - 1];
      node2.removeChild(node2.children[elements.length]);
    });
  }
});
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsPage = React.createClass({
  displayName: "OnsPage",

  render: function () {
    var toolbar;
    var otherChildren = [];

    React.Children.forEach(this.props.children, function (child) {
      if (reactUtil.rendersToOnsToolbar(child)) {
        toolbar = child;
      } else {
        otherChildren.push(child);
      }
    });

    return React.createElement(
      "ons-page",
      _extends({}, this.props, { _compiled: "true" }),
      toolbar,
      React.createElement(
        "div",
        { className: "page__background" },
        " "
      ),
      React.createElement(
        "div",
        { className: "page__content" },
        otherChildren
      )
    );
  }
});
var ReactTestUtils = React.addons.TestUtils;
var reactUtil = {};

reactUtil.rendersToOnsPage = function (obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-page');
};

reactUtil.rendersToOnsToolbar = function (obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-toolbar');
};