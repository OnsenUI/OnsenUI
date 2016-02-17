const util = window.ons._util;

var OnsNavigator = React.createClass({
  componentDidMount: function() {
    this.counter = 0;
    var node = this.node = ReactDOM.findDOMNode(this);
    var page = this.props.children;

    this.init = true;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }

    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = 
      function(navigatorElement, target, options, callback) {
        if (this.init) {
          this.init = false;
          node.firstChild.innerHTML = node.firstChild._initialHTML;
        } 
        lastLink(navigatorElement, target, options, callback);
      }.bind(this);

    this.elements = [];
    this.elements.push({elem:this.props.children});

    this.myDom = ReactDOM.render(
      <ons-navigator {...this.props}>
        {page}
      </ons-navigator>, node
    );
  },

  resetToPage: function(reactPage, options) {
    var page = arguments.length > 0 ? reactPage : this.elements[0].elem;
    this.elements = [];
    this.elements.push({elem:page});

    var node = this.node;
    this.node.firstChild.children[0].style.display = 'block';

    var htmlString = ReactDOMServer.renderToStaticMarkup(page);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;

    var children = [];
    for (var i =0; i < this.node.firstChild.children.length; i++) {
      children.push(this.node.firstChild.children[i].cloneNode(true));
    }

    var node = this.node;

    this.node.firstChild.resetToPage('', options).then(
      function() {
        var newNode = node.firstChild.children[0];
        for (var i =0; i < children.length; i++) {
          children[i].style.display = i==0 ? 'block' : 'none';
          node.firstChild.insertBefore(children[i], newNode);
        }

        this.myDom = ReactDOM.render(
          <ons-navigator {...this.props}  >
            {page}
          </ons-navigator>, node
        );

        node.firstChild.removeChild(newNode);
        node.firstChild._pages[0].element = node.firstChild.children[0];
      }.bind(this));
  },

  popPage: function(options) {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    var lastChild =  reactUtil.lastChild(this.node.firstChild).cloneNode(true);

    

    navNode.popPage(options).then(function() {

      console.log('pop');

      this.elements.pop();
      var help = [];

      lastChild.style.display = 'none';

      // this can happen in animation, that there is some div
      if (util.lastChild(navNode).nodeName == 'ONS-PAGE') {
        navNode.appendChild(lastChild);
      } else {
        navNode.insertBefore(lastChild, util.lastChild(navNode)); 
      }
 
      for (var i =0; i < this.elements.length; i++) {
        help.push(this.elements[i].elem);
      }

      var node = ReactDOM.findDOMNode(this);
      var node2 =ReactDOM.render(
        <ons-navigator {...this.props} >
          {help}
        </ons-navigator>, 
        node
      );
    }.bind(this));

  },
  render: function() {
    return <div />;
  }, 


  componentWillReceiveProps: function(newProps) {
    var props = newProps || this.props;

    var help = [];
    this.elements = [];
    this.elements.push({elem: props.children});

    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var node = ReactDOM.findDOMNode(this);

    ReactDOM.render(
      <ons-navigator {...this.props}>
        {help}
      </ons-navigator>, 
      node
    );
  },

  replacePage: function(reactPage, options) {
    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;


    var node = this.node;
    var navNode = this.node.firstChild;

    this.elements.pop();
    this.elements.push({elem: reactPage});
    var help = [];
    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var deleteElem = navNode.children[navNode.children.length - 1];

    this.node.firstChild.replacePage('', options)
    .then(function(){

      var lastNode = navNode.children[navNode.children.length -1];

      navNode.insertBefore(
        deleteElem, 
        navNode.children[navNode.children.length -1]
      );
      var node2 =ReactDOM.render(
        <ons-navigator {...this.props}>
          {help}
        </ons-navigator>, 
        node
      );

      var index = navNode.children.length - 2;
      navNode.children[index].style.display = 'block';
      navNode._pages[index].element = node.firstChild.children[index];
      navNode.removeChild(lastNode);
    }.bind(this));
  },


  insertComponent: function(reactPage, insertPos, options) {

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;




    this.counter ++;
    var node =  ReactDOM.findDOMNode(this)
    var navNode = node.firstChild;
    insertPos = node.firstChild._normalizeIndex(insertPos);

    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react inserts needs to render to <ons-page>");
    }

    this.elements.splice(insertPos, 0, {elem: reactPage});

    var help = [];
    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var counter = this.counter;

    var elements = this.elements;
    node.firstChild.insertPage( insertPos, '', options)
    .then(function() {

      // delete the node again
      navNode.removeChild(navNode.children[insertPos]);
      // console.log(navNode._pages);
      var node2 =ReactDOM.render(
        <ons-navigator {...this.props}>
          {help}
        </ons-navigator>, 
        node
      );

      for (var i=0;  i< navNode.children.length-1; i++) {
        navNode.children[i].style.display = 'none';
      }
      
      for (var i=0; i < navNode.children.length; i++) {
        navNode._pages[i].element = navNode.children[i];
      }

    }.bind(this));
  },

  pushComponent: function(reactPage, options) {
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react pushes needs to render to <ons-page>");
    }

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    if (options == undefined) {
      options = {};
    }
    options.pageHTML = htmlString;

    this.elements.push({elem:reactPage});
    var elements = this.elements;

    var node =  ReactDOM.findDOMNode(this)
    node.firstChild._pushPage(options).then(function() {
      var help = [];
      for (var i =0; i < elements.length; i++) {
        help.push(elements[i].elem);
      }

      var node2 =ReactDOM.render(
        <ons-navigator {...this.props}>
          {help}
        </ons-navigator>, 
        node
      );

      node2._pages[elements.length-1].element = node2.children[elements.length-1];
      node2.removeChild(node2.children[elements.length]);
    }.bind(this));
  },
});
