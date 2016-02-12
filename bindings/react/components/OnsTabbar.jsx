var OnsTabbar = React.createClass({
  render: function() {
    var children= [];


    React.Children.forEach(this.props.children, function(child) {
      // TODO CHECK FOR onsTab
      counter = -1;
      var myChildren = React.Children.map(child.props.children, function(child2) {
        counter++;
        return React.cloneElement(child2, {'data-ons-react':  counter});
      });

      var mychild=  React.cloneElement(child, {}, myChildren);
      var renderString = ReactDOMServer.renderToStaticMarkup(mychild);

      var el = document.createElement('div');
      el.innerHTML = renderString;
      console.log(el.innerHTML);

      var newElement = buildComponent(el.firstChild, React.Children.toArray(child.props.children));

      children.push(newElement);
    });



    return (
      <ons-tabbar var="tabbar" animation="fade" _compiled="" class="ng-scope">
        <div className="ons-tab-bar__content tab-bar__content"> 
        </div> 
        <div className="tab-bar ons-tab-bar__footer ons-tabbar-inner">
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
    return (<ons-tab {...this.props} > {this.props.children} </ons-tab>);
  }, 
});

var MyElem = React.createClass({
  componentDidMount: function() {

    var elem = this.props.domNode;
    for (var i = 0; i < elem.attributes.length; i++) {
      var attrib = elem.attributes[i];
        ReactDOM.findDOMNode(this).setAttribute(attrib.name, attrib.value);
    }

    if (!this.props.children) {
      ReactDOM.findDOMNode(this).innerHTML = elem.innerHTML;
    }
  },
  render: function() {
    return React.createElement(this.props.domNode.nodeName, {'_compiled': ''}, this.props.children);
  },
});

var OnsTemplate = React.createClass({
  render: function() {
    return (
      <ons-template type="text/ons-template" id={this.props.id}>
        {this.props.children}
      </ons-template>
   );
  }, 
});
