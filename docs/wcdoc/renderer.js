
/**
 * @param {Object} params
 * @param {ElementDoc} params.main
 * @param {Array} params.methods
 * @param {Array} params.attributes
 * @param {Array} params.events
 * @param {Array} params.properties
 * @param {Array} params.elements
 * @param {Array} params.inputs
 * @param {Array} params.outputs
 */
function renderElement(params) {
  var main = params.main;
  var tagdict = main.tagdict;
  var methods = params.methods;
  var attributes = params.attributes;
  var events = params.events;
  var properties = params.properties;
  var elements = params.elements;
  var inputs = params.inputs;
  var outputs = params.outputs;

  return {
    name: main.name,
    path: main.file.relativePath,
    category: tagdict.get('category', ''),
    description: main.description || '',
    deprecated: main.isDeprecated,
    tutorial: tagdict.get('tutorial') || undefined,
    note: tagdict.get('note') || undefined,
    extensionOf: main.extensionOf,
    examples: tagdict.getMany('example'),
    seealsos: tagdict.getMany('seealso').map(renderNamedDescription),
    guides: tagdict.getMany('guide').map(renderNamedDescription),
    modifiers: tagdict.getMany('modifier').map(renderNamedDescription),
    codepens: tagdict.getMany('codepen').map(renderCodepen),
    attributes: attributes.map(renderAttribute),
    events: events.map(renderEvent),
    properties: properties.map(renderProperty),
    methods: methods.map(renderMethod),
    elements: elements.map(renderExtraElement),
    inputs: inputs.map(renderInput),
    outputs: outputs.map(renderOutput),
  };
}

function renderExtraElement(element) {
  var tagdict = element.tagdict;

  return {
    name: element.name,
    path: element.file.relativePath,
    description: element.description || '',
    deprecated: element.isDeprecated,
    extensionOf: element.extensionOf,
    directive: tagdict.get('directive') || undefined,
    selector: tagdict.get('selector') || undefined,
    note: tagdict.get('note') || undefined,
    tutorial: tagdict.get('tutorial') || undefined,
    examples: tagdict.getMany('example'),
    seealsos: tagdict.getMany('seealso').map(renderNamedDescription),
    guides: tagdict.getMany('guide').map(renderNamedDescription),
    codepens: tagdict.getMany('codepen').map(renderCodepen)
  };
}

/**
 * @param {Object} params
 * @param {ObjectDoc} params.main
 * @param {Array} params.methods
 * @param {Array} params.events
 * @param {Array} params.properties
 * @param {Array} params.objects
 */
function renderObject(params) {
  var main = params.main;
  var tagdict = main.tagdict;
  var methods = params.methods;
  var events = params.events;
  var properties = params.properties;
  var objects = params.objects;

  return {
    name: main.name,
    path: main.file.relativePath,
    category: tagdict.get('category', ''),
    description: main.description || '',
    deprecated: main.isDeprecated,
    extensionOf: main.extensionOf,
    note: tagdict.get('note') || undefined,
    tutorial: tagdict.get('tutorial') || undefined,
    examples: tagdict.getMany('example'),
    seealsos: tagdict.getMany('seealso').map(renderNamedDescription),
    guides: tagdict.getMany('guide').map(renderNamedDescription),
    codepens: tagdict.getMany('codepen').map(renderCodepen),
    events: events.map(renderEvent),
    properties: properties.map(renderProperty),
    methods: methods.map(renderMethod),
    objects: objects.map(renderExtraObject)
  };
}

function renderExtraObject(object) {
  var tagdict = object.tagdict;

  return {
    name: object.name,
    path: object.file.relativePath,
    description: object.description || '',
    deprecated: object.isDeprecated,
    extensionOf: object.extensionOf,
    note: object.tagdict.get('note') || undefined,
    examples: object.tagdict.getMany('example'),
    seealsos: tagdict.getMany('seealso').map(renderNamedDescription),
    guides: tagdict.getMany('guide').map(renderNamedDescription),
    codepens: tagdict.getMany('codepen').map(renderCodepen)
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
    extensionOf: event.extensionOf,
    description: event.description || '',
    examples: event.tagdict.getMany('example'),
    deprecated: event.isDeprecated
  };
}

/**
 * @param {PropertyDoc} property
 * @param {string} [extensionName]
 * @return {Object}
 */
function renderProperty(property) {
  return {
    name: property.name,
    type: renderType(property.type),
    description: property.description || '',
    extensionOf: property.extensionOf,
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
    extensionOf: method.extensionOf,
    signature: method.tagdict.get('signature', method.name + '()'),
    description: method.description || '',
    deprecated: method.isDeprecated,
  };
}

/**
 * @param {InputDoc} input
 * @return {Object}
 */
function renderInput(input) {
  return {
    name: input.name,
    description: input.description || '',
    type: input.type || '',
    deprecated: input.isDeprecated,
    extensionOf: input.extensionOf,
  };
}

/**
 * @param {OutputDoc} output
 * @return {Object}
 */
function renderOutput(output) {
  return {
    name: output.name,
    description: output.description || '',
    type: output.type || '',
    deprecated: output.isDeprecated,
    extensionOf: output.extensionOf,
  };
}

function renderParam(param) {
  return {
    name: param.name,
    type: renderType(param.type),
    isOptional: param.isOptional(),
    description: param.description
  };
}

function renderAttribute(attribute) {
  return {
    name: attribute.name,
    type: renderType(attribute.type),
    description: attribute.tagdict.get('description', ''),
    deprecated: !!attribute.isDeprecated,
    extensionOf: attribute.extensionOf,
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
  if (typeof type === 'string') {
    return type.replace(/^\{|}$/g, '');
  } else {
    return null;
  }
}

module.exports = {
  renderElement: renderElement,
  renderObject: renderObject
};
