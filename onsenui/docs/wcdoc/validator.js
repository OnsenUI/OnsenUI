var Validator = require('jsonschema').Validator;

var validator = new Validator();
validator.addSchema(require('./method.schema.json'));
validator.addSchema(require('./object.schema.json'));
validator.addSchema(require('./extra-object.schema.json'));
validator.addSchema(require('./element.schema.json'));
validator.addSchema(require('./extra-element.schema.json'));
validator.addSchema(require('./attribute.schema.json'));
validator.addSchema(require('./event.schema.json'));
validator.addSchema(require('./property.schema.json'));
validator.addSchema(require('./parameter.schema.json'));
validator.addSchema(require('./input.schema.json'));
validator.addSchema(require('./output.schema.json'));
validator.addSchema(require('./codepen.schema.json'));

module.exports = validator.validate.bind(validator);
