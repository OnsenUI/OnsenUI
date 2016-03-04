var OnsTabbar = React.createClass({
  componentDidMount: function() {
     var node = this.node = ReactDOM.findDOMNode(this);
     
     for (var i=0; i < node.children[1].children.length; i++) {
       node.children[1].children[i]._pageElement = node.firstChild.children[i];
     }
     
     for (var i =0; i < node.firstChild.children.length; i++) {
       node.firstChild.children[i].style.display = 'none';
     }
     
     node.setActiveTab(this.activeIndex);
  },

  setActiveTab: function(index, options) {
    ReactDOM.findDOMNode(this).setActiveTab(index, options);
  },

  getActiveTabIndex: function() {
    return ReactDOM.findDOMNode(this).getActiveTabIndex();
  },

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {

    var lastReady = window.OnsTabbarElement.rewritables.ready;
    window.OnsTabbarElement.rewritables.ready = function(node, callback) {
      for (var i=0; i < node.children[1].children.length; i++) {
        node.children[1].children[i]._pageElement = node.firstChild.children[i];
      }
      
      for (var i =0; i < node.firstChild.children.length; i++) {
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


    React.Children.forEach(this.props.children, function(child) {
      index++;
      child = React.cloneElement(child, {modifier: newModifier});

      var counter = -1;

      var myChildren = React.Children.map(child.props.children, function(child2) {
        counter++;
        return React.cloneElement(child2, {'data-ons-react':  counter});
      });

      this.childIndex.push(child.props.page);
      if (child.props.active) {
        self.activeIndex = index;
      }

      var mychild=  React.cloneElement(child, {}, myChildren);
      var renderString = ReactDOMServer.renderToStaticMarkup(mychild);

      var el = document.createElement('div');
      el.innerHTML = renderString;
      CustomElements.upgrade(el.firstChild);

      var newElement = buildComponent(el.firstChild, React.Children.toArray(child.props.children));

      children.push(newElement);
    }.bind(this));

    var newNode = React.cloneElement(this, {}, null);

    var renderString = ReactDOMServer.renderToStaticMarkup(
      <ons-tabbar {...newNode.props} >
        {children}
      </ons-tabbar>
    );

    var el = document.createElement('div');
    el.innerHTML = renderString;
    CustomElements.upgrade(el.firstChild);


    var contentClass = el.firstChild.children[0].className;
    var barClass = el.firstChild.children[1].className;

    this.activeIndex = self.activeIndex;

    return (
      <ons-tabbar {...newNode.props} _compiled="true">
        <div no-status-bar-fill className={contentClass}> 
          {this.props.pages}
        </div> 
        <div className={barClass}>
          {children} 
        </div>
      </ons-tabbar>
    );
  }, 
});

var buildComponent = function(domElement, reactChildren) {
  if (domElement.hasAttribute('data-ons-react')) {
    var index = parseInt(domElement.getAttribute('data-ons-react'));
    return reactChildren[index];
  } else {
    var children = [];
    for (var i=0; i < domElement.children.length; i++) {
      children.push(buildComponent(domElement.children[i], reactChildren));
    }

    if (children.length > 0 ) {
      return <MyElem domNode={domElement} myClass={domElement.className} styleString={domElement.style.cssText}>
        {children}
      </MyElem>;
    } else {
      return <MyElem domNode={domElement} myClass={domElement.className} styleString={domElement.style.cssText} /> ;
    }
  }
};

var OnsTab = React.createClass({
  render: function() {
    return <ons-tab {...this.props}> {this.props.children} </ons-tab>;
  }, 
});

var MyElem = React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    var elem = this.props.domNode;
    for (var i = 0; i < elem.attributes.length; i++) {
      var attrib = elem.attributes[i];
      node.setAttribute(attrib.name, attrib.value);
    }
  },
  render: function() {
    var obj = {'_compiled': 'true'};
    var str = this.props.domNode.innerHTML;
    if (!this.props.children && str.length > 0 ) {
      return React.createElement(this.props.domNode.nodeName.toLowerCase(), obj, str);
   } else {
     return React.createElement(this.props.domNode.nodeName.toLowerCase(), obj, this.props.children);
   }
  },
});

var OnsTemplate = React.createClass({
  componentDidMount: function() {
    reactUtil.templateMap[this.props.id] = this;
  },
  render: function() {
    return (
      <ons-template type="text/ons-template" id={this.props.id}>
        {this.props.children}
      </ons-template>
   );
  }, 
});
