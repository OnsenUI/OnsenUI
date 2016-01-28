
/**
 * @param {Object} params
 * @param {ElementDoc} params.main
 * @param {Array} params.methods
 * @param {Array} params.attributes
 * @param {Array} params.events
 * @param {Array} params.properties
 */
function renderElement(params) {
  var main = params.main;
  var tagdict = main.tagdict;
  var methods = params.methods;
  var attributes = params.attributes;
  var events = params.events;
  var properties = params.properties;

  return {
    name: main.name,
    path: main.file.relativePath,
    category: tagdict.get('category', ''),
    description: main.description || '',
    deprecated: main.isDeprecated,
    note: tagdict.get('note') || undefined,
    examples: tagdict.getMany('example'),
    seealsos: tagdict.getMany('seealso').map(renderNamedDescription),
    guides: tagdict.getMany('guide').map(renderNamedDescription),
    modifiers: tagdict.getMany('modifier').map(renderNamedDescription),
    codepens: tagdict.getMany('codepen').map(renderCodepen),
    events: events.map(renderEvent),
    properties: properties.map(renderProperty),
    attributes: attributes.map(renderAttribute),
    methods: methods.map(renderMethod),
  };
}


/**
 * @param {Object} params
 * @param {ObjectDoc} params.main
 * @param {Array} params.methods
 * @param {Array} params.events
 * @param {Array} params.properties
 */
function renderObject(params) {
  var main = params.main;
  var tagdict = main.tagdict;
  var methods = params.methods;
  var events = params.events;
  var properties = params.properties;

  return {
    name: main.name,
    path: main.file.relativePath,
    category: tagdict.get('category', ''),
    description: main.description || '',
    deprecated: main.isDeprecated,
    note: tagdict.get('note') || undefined,
    examples: tagdict.getMany('example'),
    seealsos: tagdict.getMany('seealso').map(renderNamedDescription),
    guides: tagdict.getMany('guide').map(renderNamedDescription),
    codepens: tagdict.getMany('codepen').map(renderCodepen),
    events: events.map(renderEvent),
    properties: properties.map(renderProperty),
    methods: methods.map(renderMethod),
  };
}

/**
 * @param {EventDoc} event
 * @return {Object}
 */
function renderEvent(event) {
  return {
    name: event.name,
    params: event.params.map(renderParam),
    description: event.description || '',
    examples: event.tagdict.getMany('example'),
    deprecated: event.isDeprecated
  };
}

/**
 * @param {PropertyDoc} property
 * @return {Object}
 */
function renderProperty(property) {
  return {
    name: property.name,
    type: renderType(property.type),
    description: property.description || '',
    initonly: property.tagdict.has('initonly'),
    deprecated: property.isDeprecated
  };
}

/**
 * @param {string}
 * @return {Object}
 */
function renderCodepen(codepen) {
  var matches = ('' + codepen).match(/^\s*(\S+)(?:\s+(\{wide})\s*)$/);
  if (matches) {
    return {
      isWide: true,
      id: matches[1]
    };
  } else {
    return {
      isWide: false,
      id: codepen
    };
  }
}

/**
 * @param {MethodDoc} method
 * @return {Object}
 */
function renderMethod(method) {
  return {
    name: method.name,
    params: method.params.map(renderParam),
    returns: renderReturns(method.returns),
    signature: method.tagdict.get('signature', method.name + '()'),
    description: method.description || '',
    deprecated: method.isDeprecated,
  };
}

function renderParam(param) {
  return {
    name: param.name,
    type: renderType(param.type),
    isOptional: param.isOptional,
    description: param.description
  };
}

function renderAttribute(attribute) {
  return {
    name: attribute.name,
    type: renderType(attribute.type),
    description: attribute.tagdict.get('description', ''),
    deprecated: !!attribute.isDeprecated,
    required: attribute.tagdict.has('required'),
    default: attribute.tagdict.get('default', null),
    initonly: attribute.tagdict.has('initonly')
  };
}

/**
 * @param {string}
 * @return {Object}
 */
function renderNamedDescription(target) {
  var matches = ('' + target).match(/^\s*(\S+)\s+((?:.|\r|\n)+)$/);

  if (matches) {
    return {
      name: matches[1],
      description: matches[2]
    };
  } else {
    return {
      name: '',
      description: target
    };
  }
}

function renderReturns(returns) {
  if (returns && typeof returns.type === 'string') {
    return {
      type: renderType(returns.type),
      description: returns.description || ''
    };
  } else {
    return null;
  }
}

/**
 * @return {string}
 */
function renderType(type) {
  return type ? type.toString() : null;
}

module.exports = {
  renderElement: renderElement,
  renderObject: renderObject
};
