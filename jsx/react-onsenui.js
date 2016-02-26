'use strict';

var ReactTestUtils = React.addons.TestUtils;

var createDialogClass = function createDialogClass(domName, showFun) {

  var myClass = {
    show: function show() {
      this.node.firstChild.show();
    },
    hide: function hide() {
      this.node.firstChild.hide();
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      this.node = document.createElement('div');
      document.body.appendChild(this.node);

      this.node.addEventListener('cancel', function () {
        console.log('cance???');
        _this.props.onCancel;
      });
      this.renderPortal(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
      this.renderPortal(newProps);
    },
    componentWillUnmount: function componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    },
    _update: function _update() {
      CustomElements.upgrade(this.node.firstChild);
      if (this.props.isOpen) {
        this.show();
      } else {
        this.hide();
      }
    },
    renderPortal: function renderPortal(props) {
      var element = React.createElement(domName, this.props);
      ReactDOM.render(element, this.node, this._update);
    },
    render: function render() {
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

var showFun = function showFun() {
  console.log('showFun');
  var target = this.props.getTarget();
  if (ReactTestUtils.isElement(target)) {
    target = ReactDOM.findDOMNode(target);
  }
  console.log('showFun');
  console.log(target);
  return this.node.firstChild.show(target);
};

var OnsPopover = createDialogClass('ons-popover', showFun);
'use strict';

var util = window.ons._util;

var OnsNavigator = React.createClass({
  displayName: 'OnsNavigator',

  componentDidMount: function componentDidMount() {
    this.counter = 0;
    var node = this.node = ReactDOM.findDOMNode(this);
    var page = this.props.children;

    this.init = true;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error('OnsNavigator has to contain exactly one child that renders to ons-page');
    }

    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = (function (navigatorElement, target, options, callback) {
      if (this.init) {
        this.init = false;
        node.firstChild.innerHTML = node.firstChild._initialHTML;
        lastLink(navigatorElement, node.firstChild.children[0], options, callback);
      } else {
        node.firstChild._pages[0].element = node.firstChild.children[0];
        lastLink(navigatorElement, target, options, callback);
      }
    }).bind(this);

    this.elements = [];
    this.elements.push({ elem: this.props.children });

    this.myDom = ReactDOM.render(React.createElement(
      'ons-navigator',
      this.props,
      page
    ), node);
  },

  resetToPage: function resetToPage(reactPage, options) {
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

    this.node.firstChild.resetToPage('', options).then((function () {
      var newNode = node.firstChild.children[0];
      for (var i = 0; i < children.length; i++) {
        children[i].style.display = i == 0 ? 'block' : 'none';
        node.firstChild.insertBefore(children[i], newNode);
      }

      this.myDom = ReactDOM.render(React.createElement(
        'ons-navigator',
        this.props,
        page
      ), node);

      node.firstChild.removeChild(newNode);
      node.firstChild._pages[0].element = node.firstChild.children[0];
    }).bind(this));
  },

  popPage: function popPage(options) {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    var lastChild = reactUtil.lastChild(this.node.firstChild).cloneNode(true);

    navNode.popPage(options).then((function () {

      this.elements.pop();
      var help = [];

      lastChild.style.display = 'none';

      // this can happen in animation, that there is some div
      if (util.lastChild(navNode).nodeName == 'ONS-PAGE') {
        navNode.appendChild(lastChild);
      } else {
        navNode.insertBefore(lastChild, util.lastChild(navNode));
      }

      for (var i = 0; i < this.elements.length; i++) {
        help.push(this.elements[i].elem);
      }

      var node = ReactDOM.findDOMNode(this);
      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        this.props,
        help
      ), node);
    }).bind(this));
  },
  render: function render() {
    return React.createElement('div', null);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
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
      this.props,
      help
    ), node);
  },

  replacePage: function replacePage(reactPage, options) {
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

    this.node.firstChild.replacePage('', options).then((function () {

      var lastNode = navNode.children[navNode.children.length - 1];

      navNode.insertBefore(deleteElem, navNode.children[navNode.children.length - 1]);
      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        this.props,
        help
      ), node);

      var index = navNode.children.length - 2;
      navNode.children[index].style.display = 'block';
      navNode._pages[index].element = node.firstChild.children[index];
      navNode.removeChild(lastNode);
    }).bind(this));
  },

  insertComponent: function insertComponent(reactPage, insertPos, options) {

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;

    this.counter++;
    var node = ReactDOM.findDOMNode(this);
    var navNode = node.firstChild;
    insertPos = node.firstChild._normalizeIndex(insertPos);

    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react inserts needs to render to <ons-page>");
    }

    this.elements.splice(insertPos, 0, { elem: reactPage });

    var help = [];
    for (var i = 0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var counter = this.counter;

    var elements = this.elements;
    node.firstChild.insertPage(insertPos, '', options).then((function () {

      // delete the node again
      navNode.removeChild(navNode.children[insertPos]);
      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        this.props,
        help
      ), node);

      for (var i = 0; i < navNode.children.length - 1; i++) {
        navNode.children[i].style.display = 'none';
      }

      for (var i = 0; i < navNode.children.length; i++) {
        navNode._pages[i].element = navNode.children[i];
      }
    }).bind(this));
  },

  pushComponent: function pushComponent(reactPage, options) {
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
    node.firstChild._pushPage(options).then((function () {
      var help = [];
      for (var i = 0; i < elements.length; i++) {
        help.push(elements[i].elem);
      }

      var node2 = ReactDOM.render(React.createElement(
        'ons-navigator',
        this.props,
        help
      ), node);

      node2._pages[elements.length - 1].element = node2.children[elements.length - 1];
      node2.removeChild(node2.children[elements.length]);
    }).bind(this));
  }
});
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsPage = React.createClass({
  displayName: "OnsPage",

  render: function render() {
    var toolbar;
    var modal;
    var otherChildren = [];

    React.Children.forEach(this.props.children, function (child) {
      if (child == null) return;
      if (reactUtil.rendersToOnsToolbar(child)) {
        toolbar = child;
      } else if (reactUtil.rendersToOnsModal(child)) {
        modal = child;
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
      ),
      React.createElement(
        "div",
        { className: "page__extra", style: { zIndex: 10001 } },
        modal
      )
    );
  }
});
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsTabbar = React.createClass({
  displayName: 'OnsTabbar',

  componentDidMount: function componentDidMount() {

    // var lastLink = window.OnsTabbarElement.rewritables.link;
    // window.OnsTabbarElement.rewritables.link = function(el, target, options, callback) {
    //   lastLink(el, target, options, callback);
    // }.bind(this);
    //
    // var node = this.node = ReactDOM.findDOMNode(this);
    //
    // for (var i=0; i < node.children[1].children.length; i++) {
    //   node.children[1].children[i]._pageElement =
    //           node.firstChild.children[i];
    // }
    //
    // for (var i =0; i < node.firstChild.children.length; i++) {
    //   node.firstChild.children[i].style.display = 'none';
    // }
    //
    // node.setActiveTab(this.activeIndex);
  },

  setActiveTab: function setActiveTab(index, options) {
    ReactDOM.findDOMNode(this).setActiveTab(index, options);
  },

  getActiveTabIndex: function getActiveTabIndex() {
    return ReactDOM.findDOMNode(this).getActiveTabIndex();
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },

  render: function render() {

    var lastReady = window.OnsTabbarElement.rewritables.ready;
    window.OnsTabbarElement.rewritables.ready = function (node, callback) {
      for (var i = 0; i < node.children[1].children.length; i++) {
        node.children[1].children[i]._pageElement = node.firstChild.children[i];
      }

      for (var i = 0; i < node.firstChild.children.length; i++) {
        node.firstChild.children[i].style.display = 'none';
      }
      lastReady(node, callback);
    };

    var children = [];
    this.childIndex = [];

    var newModifier = this.props.modifier;

    var self = this;

    self.activeIndex = -1;
    var index = -1;

    React.Children.forEach(this.props.children, (function (child) {
      index++;
      child = React.cloneElement(child, { modifier: newModifier });

      counter = -1;

      var myChildren = React.Children.map(child.props.children, function (child2) {
        counter++;
        return React.cloneElement(child2, { 'data-ons-react': counter });
      });

      this.childIndex.push(child.props.page);
      if (child.props.active) {
        self.activeIndex = index;
      }

      var mychild = React.cloneElement(child, {}, myChildren);
      var renderString = ReactDOMServer.renderToStaticMarkup(mychild);

      var el = document.createElement('div');
      el.innerHTML = renderString;
      CustomElements.upgrade(el.firstChild);

      var newElement = buildComponent(el.firstChild, React.Children.toArray(child.props.children));

      children.push(newElement);
    }).bind(this));

    var newNode = React.cloneElement(this, {}, null);

    var renderString = ReactDOMServer.renderToStaticMarkup(React.createElement(
      'ons-tabbar',
      newNode.props,
      children
    ));

    var el = document.createElement('div');
    el.innerHTML = renderString;
    CustomElements.upgrade(el.firstChild);

    var contentClass = el.firstChild.children[0].className;
    var barClass = el.firstChild.children[1].className;

    this.activeIndex = self.activeIndex;

    return React.createElement(
      'ons-tabbar',
      _extends({}, newNode.props, { _compiled: 'true' }),
      React.createElement(
        'div',
        { 'no-status-bar-fill': true, className: contentClass },
        this.props.pages
      ),
      React.createElement(
        'div',
        { className: barClass },
        children
      )
    );
  }
});

var buildComponent = function buildComponent(domElement, reactChildren) {
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

  render: function render() {
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

  render: function render() {

    var obj = { '_compiled': 'true' };

    var elem = this.props.domNode;
    for (var i = 0; i < elem.attributes.length; i++) {
      var attrib = elem.attributes[i];

      if (attrib.name == 'class') {
        obj.className = attrib.value;
        obj.class = attrib.value;
      } else if (attrib.name == 'label') {
        obj.label = attrib.value;
      } else if (attrib.name == 'active') {
        obj.active = attrib.value;
      } else if (attrib.name == 'icon') {
        obj.icon = attrib.value;
      } else if (attrib.name == 'type') {
        obj.type = attrib.value;
      } else if (attrib.name == 'style') {
        var style = attrib.value;

        var parts = style.split(";");
        var styleObj = {};
        for (var i = 0; i < parts.length; i++) {
          var subParts = parts[i].split(':');
          subParts[0] = subParts[0].trim();

          if (subParts[0].length == 0) continue;

          if (subParts[0] == 'display') {
            styleObj.display = subParts[1];
          } else if (subParts[0] == 'font-size') {
            styleObj.fontSize = subParts[1];
          } else if (subParts[0] == 'line-height') {
            styleObj.lineHeight = subParts[1];
          } else if (subParts[0] == 'vertical-align') {
            styleObj.verticalAlign = subParts[1];
          } else {
            throw new Error('.' + subParts[0] + '.');
          }
        }
        obj.style = styleObj;
      } else {}
    }

    var str = elem.innerHTML;
    if (!this.props.children && str.length > 0) {
      return React.createElement(this.props.domNode.nodeName.toLowerCase(), obj, str);
    } else {
      return React.createElement(this.props.domNode.nodeName.toLowerCase(), obj, this.props.children);
    }
  }
});

var OnsTemplate = React.createClass({
  displayName: 'OnsTemplate',

  componentDidMount: function componentDidMount() {
    reactUtil.templateMap[this.props.id] = this;
  },
  render: function render() {
    return React.createElement(
      'ons-template',
      { type: 'text/ons-template', id: this.props.id },
      this.props.children
    );
  }
});
'use strict';

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

reactUtil.rendersToOnsModal = function (obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-modal');
};

reactUtil.lastChild = function (el) {
  return el.children[el.children.length - 1];
};

reactUtil.createCustomDialog = function (component) {
  var body = document.body;
  var container = document.createElement('div');
  body.appendChild(container);

  return new Promise(function (resolve) {
    ReactDOM.render(component, container, function () {
      resolve(container.firstChild);
    });
  });
};

reactUtil.templateMap = {};