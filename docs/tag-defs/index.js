var extractName = require('./extract-name');

module.exports = [
  { name: 'demoURL' },
  { name: 'example' },
  { name: 'id' },
  { name: 'note' },
  {
    name: 'seealso',
    multi: true,
    docProperty: 'seealsos',
    transforms: function(doc, tag, value) {
      return {
        name: value.split(" ")[0],
        description: value.split(" ").slice(1).join(" ")
      };
    }
  },
  {
    name: 'guide',
    multi: true,
    docProperty: 'guides',
    transforms: function(doc, tag, value) {
      return {
        name: value.split(" ", 2)[0],
        description: value.split(" ").slice(1).join(" ")
      };
    }
  },
  {
    name: 'codepen',
    transforms: function(doc, tag, value) {
      return {
        id: value.split(" ", 2)[0],
        isWide: !!value.match(/\{wide}/)
      };
    }
  }
];
