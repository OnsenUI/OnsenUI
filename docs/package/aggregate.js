
module.exports = function aggregate() {
  return {
    $runAfter: [],
    $runBefore: ['processing-docs'],
    $process: function(docs) {
      var directives = [];
      var objects = [];
      var overviews = [];
      var dict = {
        event: [],
        attribute: [],
        method: []
      };


      docs.forEach(function(doc) {
        var path = doc.fileInfo.filePath;
        var type = doc.docType;

        if (type === 'directive') {
          directives.push(doc);
        } else if (type === 'event' || type === 'method' || type === 'attribute') {
          if (!dict[type][path]) {
            dict[type][path] = [];
          }
          dict[type][path].push(doc);

        } else if (type === 'object') {
          objects.push(doc);
        } else if (type === 'overview') {
          overviews.push(doc);
        } else {
          console.log(doc);
        }

        if (type === 'method') {
          var matches = doc.name.match(/^ *([a-zA-Z0-9_]+)/);
          doc.name = matches[1];
        }
      });

      directives.forEach(function(directive) {
        var path = directive.fileInfo.filePath;
        directive.events = dict['event'][path] || [];
        directive.methods = dict['method'][path] || [];
        directive.attributes = dict['attribute'][path] || [];
      });

      objects.forEach(function(object) {
        var path = object.fileInfo.filePath;
        object.methods = dict['method'][path] || [];
        object.events = dict['event'][path] || [];
      });

      return directives.concat(objects).concat(overviews);
    }
  };
};

