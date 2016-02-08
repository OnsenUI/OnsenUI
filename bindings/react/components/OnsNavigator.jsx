var OnsNavigator = React.createClass({
  componentDidMount: function() {
    var node = this.node = ReactDOM.findDOMNode(this);
    
    var page = this.props.children;

    if (!reactUtil.rendersToOnsPage(page)) {
      throw new Error("OnsNavigator has to contain exactly one child of type OnsPage");
    }
    
    var lastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = function(navigatorElement, target, options, callback) {

      if (node.firstChild._pages.length == 1 && !this.insert) {
          node.firstChild.innerHTML = node.firstChild._initialHTML;
      } 
       lastLink(navigatorElement, target, options, callback);
       console.log('link finished');
    }.bind(this);

     this.elements = [];
     this.elements.push({elem:this.props.children});
    
     this.myDom = ReactDOM.render(
       <ons-navigator {...this.props}>
          {page}
       </ons-navigator>, node
     );
  },



  resetToPage: function(reactPage) {
    var page = arguments.length > 0 ? reactPage : this.elements[0].elem;
    this.elements = [];
    this.elements.push({elem:page});

    var node = this.node;
    this.node.firstChild.children[0].style.display = 'block';

    var htmlString = ReactDOMServer.renderToStaticMarkup(page);

    var children = [];
    for (var i =0; i < this.node.firstChild.children.length; i++) {
      children.push(this.node.firstChild.children[i].cloneNode(true));
    }

    var node = this.node;

     this.node.firstChild.resetToPage('', {pageHTML: htmlString}).then(
       function() {
         var newNode = node.firstChild.children[0];
         for (var i =0; i < children.length; i++) {
           children[i].style.display = i==0 ? 'block' : 'none';
           node.firstChild.insertBefore(children[i], newNode);
         }

         this.myDom = ReactDOM.render(
           <ons-navigator>
               {page}
           </ons-navigator>, node
         );

         node.firstChild.removeChild(newNode);
         node.firstChild._pages[0].element = node.firstChild.children[0];
     });
  },

  popPage: function() {
    var navNode = ReactDOM.findDOMNode(this).firstChild;
    navNode.popPage();

    this.elements.pop();

    var help = [];

    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }
  
    var node = ReactDOM.findDOMNode(this);
        var node2 =ReactDOM.render(
            <ons-navigator >
              {help}
            </ons-navigator>, 
            node
          );
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
      <ons-navigator >
        {help}
      </ons-navigator>, 
      node
    );
  },


  insertComponent: function(reactPage, insertPos) {

    var node =  ReactDOM.findDOMNode(this)
    insertPos = node.firstChild._normalizeIndex(insertPos);

    this.insert = true;
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react inserts needs to render to <ons-page>");
    }

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);
    this.elements.splice(insertPos, 0, {elem: reactPage});

    var help = [];
    for (var i =0; i < this.elements.length; i++) {
      help.push(this.elements[i].elem);
    }

    var elements = this.elements;
    node.firstChild.insertPage( insertPos, '', {pageHTML: htmlString})
      .then(function() {
        this.insert = false;
        var node2 =ReactDOM.render(
          <ons-navigator >
            {help}
          </ons-navigator>, 
          node
        );

       for (var i=0; i < elements.length -1; i++) {
          var index = i;
          if (index >= insertPos + 1) index++;
            node.firstChild._pages[i].element = node.firstChild.children[index];
          }
          node.firstChild.removeChild(node.firstChild.children[insertPos+1]);
       }.bind(this));
  },

  pushComponent: function(reactPage) {
    if (!reactUtil.rendersToOnsPage(reactPage)) {
      throw new Error("The component that react pushes needs to render to <ons-page>");
    }


    this.elements.push({elem:reactPage});
    var elements = this.elements;

    var htmlString = ReactDOMServer.renderToStaticMarkup(reactPage);

    var node =  ReactDOM.findDOMNode(this)
    node.firstChild._pushPage(null, {pageHTML: htmlString}).then(function() {
       var help = [];
       for (var i =0; i < elements.length; i++) {
         help.push(elements[i].elem);
       }



       var node2 =ReactDOM.render(
         <ons-navigator >
           {help}
         </ons-navigator>, 
         node
       );

        node2._pages[elements.length-1].element = node2.children[elements.length-1];
        node2.removeChild(node2.children[elements.length]);
    });
  },
});
