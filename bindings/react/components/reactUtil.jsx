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
