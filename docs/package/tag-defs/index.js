var extractName = require('./extract-name');
var extend = require('extend');

module.exports = [
  {name: 'example'},
  {name: 'id'},
  {name: 'note'},
  {name: 'default'},
  {
    name: 'type',
    transforms: function(doc, tag, value) {
      return tag.typeExpression;
    }
  },
  {
    name: 'extension',
    multi: true,
    docProperty: 'extensions',
    transforms: function(doc, tag, value) {
      return value;
    }
  },
  {
    name: 'initonly',
    transforms: function(doc, tag, value) {
      return true;
    }
  },
  {
    name: 'category',
    multi: true,
    docProperty: 'categories',
    transforms: function(doc, tag, value) {
      return ('' + value).trim();
    }
  },
  {
    name: 'signature',
    transforms: function(doc, tag, value) {
      doc.tags.tagsByName.obj.name = extend(
        {},
        doc.tags.tagsByName.obj.signature,
        {tagName: 'name'}
      );

      return value;
    },
    priority: 100
  },
  {
    name: 'optional',
    transforms: function(doc, tag, value) {
      return true;
    }
  },
  {
    name: 'required',
    transforms: function(doc, tag, value) {
      return true;
    }
  },
  {
    name: 'seealso',
    multi: true,
    docProperty: 'seealsos',
    transforms: function(doc, tag, value) {
      return {
        name: value.split(' ')[0],
        description: value.split(' ').slice(1).join(' ')
      };
    }
  },
  {
    name: 'guide',
    multi: true,
    docProperty: 'guides',
    transforms: function(doc, tag, value) {
      return {
        name: value.split(' ', 2)[0],
        description: value.split(' ').slice(1).join(' ')
      };
    }
  },
  {
    name: 'codepen',
    transforms: function(doc, tag, value) {
      return {
        id: value.split(' ', 2)[0],
        isWide: !!value.match(/\{wide}/)
      };
    }
  },
  {
    name: 'modifier',
    multi: true,
    docProperty: 'modifiers',
    transforms: function(doc, tag, value) {
      var matches = value.match(/^ *([-_a-zA-Z0-9]+) *((.|\r|\n)*)/);
      return {
        name: matches[1],
        description: matches[2]
      };
    }
  }
];
