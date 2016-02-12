var OnsNavigator = React.createClass({
  displayName: 'OnsNavigator',

  componentDidMount: function () {
    var node = this.node = ReactDOM.findDOMNode(this);

    var page = this.props.children;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }

    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = (function (navigatorElement, target, options, callback) {

      if (node.firstChild._pages.length == 1 && !this.insert) {
        node.firstChild.innerHTML = node.firstChild._initialHTML;
      }
      lastLink(navigatorElement, target, options, callback);
      console.log('link finished');
    }).bind(this);

    this.elements = [];
    this.elements.push({ elem: this.props.children });

    this.myDom = ReactDOM.render(React.createElement(
      'ons-navigator',
      this.props,
      page
    ), node);
  },

  resetToPage: function (reactPage, options) {
    var page = arguments.length > 0 ? reactPage : this.elements[0].elem;
    this.elements = [];
    this.elements.push({ elem: page });

    var node = this.node;
    this.node.firstChild.children[0].style.display = 'block';

    var htmlString = ReactDOMServer.renderToStaticMarkup(page);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;

    var children = [];
    for (var i = 0; i < this.node.firstChild.children.length; i++) {
      children.push(this.node.firstChild.children[i].cloneNode(true));
    }

    var node = this.node;

    this.node.firstChild.resetToPage('', options).then(function () {
      var newNode = node.firstChild.children[0];
      for (var i = 0; i < children.length; i++) {
        children[i].style.display = i == 0 ? 'block' : 'none';
        node.firstChild.insertBefore(children[i], newNode);
      }

      this.myDom = ReactDOM.render(React.createElement(
        'ons-navigator',
        null,
        page
      ), node);

      node.firstChild.removeChild(newNode);
      node.firstChild._pages[0].element = node.firstChild.children[0];
    });
  },

  popPage: function (options) {

    var navNode = ReactDOM.findDOMNode(this).firstChild;
    navNode.popPage(options);

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

  replacePage: function (reactPage, options) {
    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;

    var node = this.node;
    var navNode = this.node.firstChild;

    this.elements.pop();
    this.elements.push({ elem: reactPage });
    var help = [];
    for (var i = 0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var deleteElem = navNode.children[navNode.children.length - 1];

    this.node.firstChild.replacePage('', options).then(function () {

      var lastNode = navNode.children[navNode.children.length - 1];

      navNode.insertBefore(deleteElem, navNode.children[navNode.children.length - 1]);
      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        null,
        help
      ), node);

      var index = navNode.children.length - 2;
      navNode.children[index].style.display = 'block';
      navNode._pages[index].element = node.firstChild.children[index];
      navNode.removeChild(lastNode);
    });
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
    node.firstChild.insertPage(insertPos, '', { pageHTML: htmlString }).then((function () {
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
    }).bind(this));
  },

  pushComponent: function (reactPage, options) {
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react pushes needs to render to <ons-page>");
    }

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    if (options == undefined) {
      options = {};
    }

    options.pageHTML = htmlString;
    this.elements.push({ elem: reactPage });
    var elements = this.elements;

    var node = ReactDOM.findDOMNode(this);
    node.firstChild._pushPage(null, options).then(function () {
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
var OnsTabbar = React.createClass({
  displayName: 'OnsTabbar',

  render: function () {
    var children = [];

    React.Children.forEach(this.props.children, function (child) {
      // TODO CHECK FOR onsTab
      counter = -1;
      var myChildren = React.Children.map(child.props.children, function (child2) {
        counter++;
        return React.cloneElement(child2, { 'data-ons-react': counter });
      });

      var mychild = React.cloneElement(child, {}, myChildren);
      var renderString = ReactDOMServer.renderToStaticMarkup(mychild);

      var el = document.createElement('div');
      el.innerHTML = renderString;
      console.log(el.innerHTML);

      var newElement = buildComponent(el.firstChild, React.Children.toArray(child.props.children));

      children.push(newElement);
    });

    return React.createElement(
      'ons-tabbar',
      { 'var': 'tabbar', animation: 'fade', _compiled: '', 'class': 'ng-scope' },
      React.createElement('div', { className: 'ons-tab-bar__content tab-bar__content' }),
      React.createElement(
        'div',
        { className: 'tab-bar ons-tab-bar__footer ons-tabbar-inner' },
        children
      )
    );
  }
});

var buildComponent = function (domElement, reactChildren) {
  if (domElement.hasAttribute('data-ons-react')) {
    var index = parseInt(domElement.getAttribute('data-ons-react'));
    return reactChildren[index];
  } else {
    var children = [];
    for (var i = 0; i < domElement.children.length; i++) {
      children.push(buildComponent(domElement.children[i], reactChildren));
    }

    if (children.length > 0) {
      return React.createElement(
        MyElem,
        { domNode: domElement, myClass: domElement.className, styleString: domElement.style.cssText },
        children
      );
    } else {
      return React.createElement(MyElem, { domNode: domElement, myClass: domElement.className, styleString: domElement.style.cssText });
    }
  }
};

var OnsTab = React.createClass({
  displayName: 'OnsTab',

  render: function () {
    return React.createElement(
      'ons-tab',
      this.props,
      ' ',
      this.props.children,
      ' '
    );
  }
});

var MyElem = React.createClass({
  displayName: 'MyElem',

  componentDidMount: function () {

    var elem = this.props.domNode;
    for (var i = 0; i < elem.attributes.length; i++) {
      var attrib = elem.attributes[i];
      ReactDOM.findDOMNode(this).setAttribute(attrib.name, attrib.value);
    }

    if (!this.props.children) {
      ReactDOM.findDOMNode(this).innerHTML = elem.innerHTML;
    }
  },
  render: function () {
    return React.createElement(this.props.domNode.nodeName, { '_compiled': '' }, this.props.children);
  }
});

var OnsTemplate = React.createClass({
  displayName: 'OnsTemplate',

  render: function () {
    return React.createElement(
      'ons-template',
      { type: 'text/ons-template', id: this.props.id },
      this.props.children
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