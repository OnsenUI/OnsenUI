var ReactTestUtils = React.addons.TestUtils;
var reactUtil = {};

reactUtil.rendersToOnsPage =  function(obj) {
   var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
   return htmlString.startsWith('<ons-page');
};

reactUtil.rendersToOnsToolbar = function(obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-toolbar');
};

reactUtil.rendersToOnsModal = function(obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  console.log(htmlString);
  return htmlString.startsWith('<ons-modal');
};



reactUtil.lastChild = function(el) {
  return el.children[el.children.length - 1];
};

reactUtil.templateMap = {};
