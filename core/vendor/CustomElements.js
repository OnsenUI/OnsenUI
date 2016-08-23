/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * 2.3
 * http://w3c.github.io/webcomponents/spec/custom/#dfn-element-definition
 * @typedef {{
 *  name: string,
 *  localName: string,
 *  constructor: Function,
 *  connectedCallback: Function,
 *  disconnectedCallback: Function,
 *  attributeChangedCallback: Function,
 *  observedAttributes: Array<string>,
 * }}
 */
var CustomElementDefinition;

(function() {
  'use strict';

  var doc = document;
  var win = window;

  if (win.customElements) {
    if (win.customElements['enableFlush']) {
      win.customElements.flush = function() {
        console.log('CustomElements flush');
      };
    }
    if (!win.customElements.forcePolyfill) {
      return;
    }
  }

  // name validation
  // https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name

  /**
   * @const
   * @type {Array<string>}
   */
  var reservedTagList = [
    'annotation-xml',
    'color-profile',
    'font-face',
    'font-face-src',
    'font-face-uri',
    'font-face-format',
    'font-face-name',
    'missing-glyph',
  ];

  /** @const */
  var customNameValidation = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/;
  function isValidCustomElementName(name) {
    return customNameValidation.test(name) && reservedTagList.indexOf(name) === -1;
  }

  function createTreeWalker(root) {
    // IE 11 requires the third and fourth arguments be present. If the third
    // arg is null, it applies the default behaviour. However IE also requires
    // the fourth argument be present even though the other browsers ignore it.
    return doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null, false);
  }

  function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  function isHtmlImport(element) {
    return element.tagName === 'LINK' &&
        element.rel &&
        element.rel.toLowerCase().split(' ').indexOf('import') !== -1;
  }

  function isConnected(element) {
    var n = element;
    do {
      if (n.__attached || n === document) return true;
      n = n.parentNode || n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && n.host;
    } while(n);
    return false;
  }

  /**
   * A registry of custom element definitions.
   *
   * See https://html.spec.whatwg.org/multipage/scripting.html#customelementsregistry
   *
   * @constructor
   * @property {boolean} polyfilled Whether this registry is polyfilled
   * @property {boolean} enableFlush Set to true to enable the flush() method
   *   to work. This should only be done for tests, as it causes a memory leak.
   */
  function CustomElementsRegistry() {
    /** @private {Map<string, CustomElementDefinition>} **/
    this._definitions = new Map();

    /** @private {Map<Function, CustomElementDefinition>} **/
    this._constructors = new Map();

    this._whenDefinedMap = new Map();

    /** @private {Set<MutationObserver>} **/
    this._observers = new Set();

    /** @private {MutationObserver} **/
    this._attributeObserver =
        new MutationObserver(this._handleAttributeChange.bind(this));

    /** @private {HTMLElement} **/
    this._newInstance = null;

    this._pendingHtmlImportUrls = new Set();

    this.polyfilled = true;
    this['enableFlush'] = false;

    this._observeRoot(document);
  }

  CustomElementsRegistry.prototype = {

    // HTML spec part 4.13.4
    // https://html.spec.whatwg.org/multipage/scripting.html#dom-customelementsregistry-define
    define: function(name, constructor, options) {
      name = name.toString().toLowerCase();

      // 1:
      if (typeof constructor !== 'function') {
        throw new TypeError('constructor must be a Constructor');
      }

      // 2. If constructor is an interface object whose corresponding interface
      //    either is HTMLElement or has HTMLElement in its set of inherited
      //    interfaces, throw a TypeError and abort these steps.
      //
      // It doesn't appear possible to check this condition from script

      // 3:
      if (!isValidCustomElementName(name)) {
        throw new SyntaxError(`The element name '${name}' is not valid.`);
      }

      // 4, 5:
      // Note: we don't track being-defined names and constructors because
      // define() isn't normally reentrant. The only time user code can run
      // during define() is when getting callbacks off the prototype, which
      // would be highly-unusual. We can make define() reentrant-safe if needed.
      if (this._definitions.has(name)) {
        throw new Error(`An element with name '${name}' is already defined`);
      }

      // 6, 7:
      if (this._constructors.has(constructor)) {
        throw new Error(`Definition failed for '${name}': ` +
            `The constructor is already used.`);
      }

      // 8:
      var localName = name;

      // 9, 10: We do not support extends currently.

      // 11, 12, 13: Our define() isn't rentrant-safe

      // 14.1:
      var prototype = constructor.prototype;

      // 14.2:
      if (typeof prototype !== 'object') {
        throw new TypeError(`Definition failed for '${name}': ` +
            `constructor.prototype must be an object`);
      }

      function getCallback(callbackName) {
        var callback = prototype[callbackName];
        if (callback !== undefined && typeof callback !== 'function') {
          throw new Error(`${localName} '${callbackName}' is not a Function`);
        }
        return callback;
      }

      // 3, 4:
      var connectedCallback = getCallback('connectedCallback');

      // 5, 6:
      var disconnectedCallback = getCallback('disconnectedCallback');

      // Divergence from spec: we always throw if attributeChangedCallback is
      // not a function, and always get observedAttributes.

      // 7, 9.1:
      var attributeChangedCallback = getCallback('attributeChangedCallback');

      // 8, 9.2, 9.3:
      var observedAttributes = constructor['observedAttributes'] || [];

      // 15:
      /** @type {CustomElementDefinition} */
      var definition = {
        name: name,
        localName: localName,
        constructor: constructor,
        connectedCallback: connectedCallback,
        disconnectedCallback: disconnectedCallback,
        attributeChangedCallback: attributeChangedCallback,
        observedAttributes: observedAttributes,
      };

      // 16:
      this._definitions.set(localName, definition);
      this._constructors.set(constructor, localName);

      // 17, 18, 19:
      this._addNodes(doc.childNodes);

      // 20:
      var deferred = this._whenDefinedMap.get(localName);
      if (deferred) {
        deferred.resolve(undefined);
        this._whenDefinedMap.delete(localName);
      }
    },

    /**
     * Returns the constructor defined for `name`, or `null`.
     *
     * @param {string} name
     * @return {Function|undefined}
     */
    get: function(name) {
      // https://html.spec.whatwg.org/multipage/scripting.html#custom-elements-api
      var def = this._definitions.get(name);
      return def ? def.constructor : undefined;
    },

    /**
     * Returns a `Promise` that resolves when a custom element for `name` has
     * been defined.
     *
     * @param {string} name
     * @return {Promise}
     */
    whenDefined: function(name) {
      // https://html.spec.whatwg.org/multipage/scripting.html#dom-customelementsregistry-whendefined
      if (!customNameValidation.test(name)) {
        return Promise.reject(
          new SyntaxError(`The element name '${name}' is not valid.`));
      }
      if (this._definitions.has(name)) {
        return Promise.resolve();
      }
      var deferred = {
        promise: null,
      };
      deferred.promise = new Promise(function(resolve, _) {
       deferred.resolve = resolve;
      });
      this._whenDefinedMap.set(name, deferred);
      return deferred.promise;
    },

    /**
     * Causes all pending mutation records to be processed, and thus all
     * customization, upgrades and custom element reactions to be called.
     * `enableFlush` must be true for this to work. Only use during tests!
     */
    flush: function() {
      if (this['enableFlush']) {
        console.warn("flush!!!");
        this._observers.forEach(function(observer) {
          this._handleMutations(observer.takeRecords());
        }, this);
      }
    },

    _setNewInstance: function(instance) {
      this._newInstance = instance;
    },

    /**
     * Observes a DOM root for mutations that trigger upgrades and reactions.
     * @private
     */
    _observeRoot: function(root) {
      console.assert(!root.__observer);
      root.__observer = new MutationObserver(this._handleMutations.bind(this));
      root.__observer.observe(root, {childList: true, subtree: true});
      if (this['enableFlush']) {
        // this is memory leak, only use in tests
        this._observers.add(root.__observer);
      }
    },

    /**
     * @private
     */
    _unobserveRoot: function(root) {
      if (root.__observer) {
        root.__observer.disconnect();
        root.__observer = null;
        if (this['enableFlush']) {
          this._observers.delete(root.__observer);
        }
      }
    },

    /**
     * @private
     */
    _handleMutations: function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if (mutation.type === 'childList') {
          // Note: we can't get an ordering between additions and removals, and
          // so might diverge from spec reaction ordering
          this._addNodes(mutation.addedNodes);
          this._removeNodes(mutation.removedNodes);
        }
      }
    },

    /**
     * @param {NodeList} nodeList
     * @param {Set<Node>=} visitedNodes
     * @private
     */
    _addNodes: function(nodeList, visitedNodes) {
      visitedNodes = visitedNodes || new Set();

      for (var i = 0; i < nodeList.length; i++) {
        var root = nodeList[i];

        if (!isElement(root)) {
          continue;
        }

        // Since we're adding this node to an observed tree, we can unobserve
        this._unobserveRoot(root);

        var walker = createTreeWalker(root);
        do {
          var node = /** @type {HTMLElement} */ (walker.currentNode);
          this._addElement(node, visitedNodes);
        } while (walker.nextNode())
      }
    },

    _addElement(element, visitedNodes) {
      if (visitedNodes.has(element)) return;
      visitedNodes.add(element);

      var definition = this._definitions.get(element.localName);
      if (definition) {
        if (!element.__upgraded) {
          this._upgradeElement(element, definition, true);
        }
        // TODO(justinfagnani): check that the element is in the document
        if (element.__upgraded && !element.__attached && isConnected(element)) {
          element.__attached = true;
          if (definition.connectedCallback) {
            definition.connectedCallback.call(element);
          }
        }
      }
      if (element.shadowRoot) {
        // TODO(justinfagnani): do we need to check that the shadowRoot
        // is observed?
        this._addNodes(element.shadowRoot.childNodes, visitedNodes);
      }
      if (isHtmlImport(element)) {
        this._addImport(element, visitedNodes);
      }
    },

    _addImport(link, visitedNodes) {
      // During a tree walk to add or upgrade nodes, we may encounter multiple
      // HTML imports that reference the same document, and may encounter
      // imports in various states of loading.

      // First, we only want to process the first import for a document in a
      // walk, so we check visitedNodes for the document, not the link.
      //
      // Second, for documents that haven't loaded yet, we only want to add one
      // listener, regardless of the number of links or walks, so we track
      // pending loads in _pendingHtmlImportUrls.

      // Check to see if the import is loaded
      var _import = link.import;
      if (_import) {
        // The import is loaded, but only process the first link element
        if (visitedNodes.has(_import)) return;
        visitedNodes.add(_import);

        // The import is loaded observe it
        if (!_import.__observer) this._observeRoot(_import);

        // walk the document
        this._addNodes(_import.childNodes, visitedNodes);
      } else {
        // The import is not loaded, so wait for it
        var importUrl = link.href;
        if (this._pendingHtmlImportUrls.has(importUrl)) return;
        this._pendingHtmlImportUrls.add(importUrl);

        var _this = this;
        var onLoad = function() {
          link.removeEventListener('load', onLoad);
          if (!link.import.__observer) _this._observeRoot(link.import);
          // We don't pass visitedNodes because this is async and not part of
          // the current tree walk.
          _this._addNodes(link.import.childNodes);
        };
        link.addEventListener('load', onLoad);
      }
    },

    /**
     * @param {NodeList} nodeList
     * @private
     */
    _removeNodes: function(nodeList) {
      for (var i = 0; i < nodeList.length; i++) {
        var root = nodeList[i];

        if (!isElement(root)) {
          continue;
        }

        // Since we're detatching this element from an observed root, we need to
        // reobserve it.
        // TODO(justinfagnani): can we do this in a microtask so we don't thrash
        // on creating and destroying MutationObservers on batch DOM mutations?
        this._observeRoot(root);

        var walker = createTreeWalker(root);
        do {
          var node = walker.currentNode;
          if (node.__upgraded && node.__attached) {
            node.__attached = false;
            var definition = this._definitions.get(node.localName);
            if (definition && definition.disconnectedCallback) {
              definition.disconnectedCallback.call(node);
            }
          }
        } while (walker.nextNode())
      }
    },

    /**
     * Upgrades or customizes a custom element.
     *
     * @param {HTMLElement} element
     * @param {CustomElementDefinition} definition
     * @param {boolean} callConstructor
     * @private
     */
    _upgradeElement: function(element, definition, callConstructor) {
      var prototype = definition.constructor.prototype;
      element.__proto__ = prototype;
      if (callConstructor) {
        this._setNewInstance(element);
        element.__upgraded = true;
        new (definition.constructor)();
        console.assert(this._newInstance == null);
      }

      var observedAttributes = definition.observedAttributes;
      var attributeChangedCallback = definition.attributeChangedCallback;
      if (attributeChangedCallback && observedAttributes.length > 0) {
        this._attributeObserver.observe(element, {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: observedAttributes,
        });

        // Trigger attributeChangedCallback for existing attributes.
        // https://html.spec.whatwg.org/multipage/scripting.html#upgrades
        for (var i = 0; i < observedAttributes.length; i++) {
          var name = observedAttributes[i];
          if (element.hasAttribute(name)) {
            var value = element.getAttribute(name);
            attributeChangedCallback.call(element, name, null, value);
          }
        }
      }
    },

    /**
     * @private
     */
    _handleAttributeChange: function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if (mutation.type === 'attributes') {
          var target = mutation.target;
          // We should be gaurenteed to have a definition because this mutation
          // observer is only observing custom elements observedAttributes
          var definition = this._definitions.get(target.localName);
          var name = mutation.attributeName;
          var oldValue = mutation.oldValue;
          var newValue = target.getAttribute(name);
          var namespace = mutation.attributeNamespace;
          definition.attributeChangedCallback.call(target, name, oldValue, newValue, namespace);
        }
      }
    },
  }

  // Closure Compiler Exports
  window['CustomElementsRegistry'] = CustomElementsRegistry;
  CustomElementsRegistry.prototype['define'] = CustomElementsRegistry.prototype.define;
  CustomElementsRegistry.prototype['get'] = CustomElementsRegistry.prototype.get;
  CustomElementsRegistry.prototype['whenDefined'] = CustomElementsRegistry.prototype.whenDefined;
  CustomElementsRegistry.prototype['flush'] = CustomElementsRegistry.prototype.flush;
  CustomElementsRegistry.prototype['polyfilled'] = CustomElementsRegistry.prototype.polyfilled;
  // TODO(justinfagnani): remove these in production code
  CustomElementsRegistry.prototype['_observeRoot'] = CustomElementsRegistry.prototype._observeRoot;
  CustomElementsRegistry.prototype['_addImport'] = CustomElementsRegistry.prototype._addImport;

  // patch window.HTMLElement

  var origHTMLElement = win.HTMLElement;
  win.HTMLElement = function HTMLElement() {
    var customElements = win['customElements'];

    // If there's an being upgraded, return that
    if (customElements._newInstance) {
      var i = customElements._newInstance;
      customElements._newInstance = null;
      return i;
    }
    if (this.constructor) {
      // Find the tagname of the constructor and create a new element with it
      var tagName = customElements._constructors.get(this.constructor);
      return doc._createElement(tagName, false);
    }
    throw new Error('Unknown constructor. Did you call customElements.define()?');
  }
  win.HTMLElement.prototype = Object.create(origHTMLElement.prototype);
  Object.defineProperty(win.HTMLElement.prototype, 'constructor', {value: win.HTMLElement});

  // patch all built-in subclasses of HTMLElement to inherit from the new HTMLElement
  // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces

  /** @const */
  var htmlElementSubclasses = [
  	'Button',
  	'Canvas',
  	'Data',
  	'Head',
  	'Mod',
  	'TableCell',
  	'TableCol',
    'Anchor',
    'Area',
    'Base',
    'Body',
    'BR',
    'DataList',
    'Details',
    'Dialog',
    'Div',
    'DList',
    'Embed',
    'FieldSet',
    'Form',
    'Heading',
    'HR',
    'Html',
    'IFrame',
    'Image',
    'Input',
    'Keygen',
    'Label',
    'Legend',
    'LI',
    'Link',
    'Map',
    'Media',
    'Menu',
    'MenuItem',
    'Meta',
    'Meter',
    'Object',
    'OList',
    'OptGroup',
    'Option',
    'Output',
    'Paragraph',
    'Param',
    'Picture',
    'Pre',
    'Progress',
    'Quote',
    'Script',
    'Select',
    'Slot',
    'Source',
    'Span',
    'Style',
    'TableCaption',
    'Table',
    'TableRow',
    'TableSection',
    'Template',
    'TextArea',
    'Time',
    'Title',
    'Track',
    'UList',
    'Unknown',
  ];

  for (var i = 0; i < htmlElementSubclasses.length; i++) {
    var ctor = window['HTML' + htmlElementSubclasses[i] + 'Element'];
    if (ctor) {
      ctor.prototype.__proto__ = win.HTMLElement.prototype;
    }
  }

  // patch doc.createElement

  var rawCreateElement = doc.createElement;
  doc._createElement = function(tagName, callConstructor) {
    var customElements = win['customElements'];
    var element = rawCreateElement.call(doc, tagName);
    var definition = customElements._definitions.get(tagName.toLowerCase());
    if (definition) {
      customElements._upgradeElement(element, definition, callConstructor);
    }
    customElements._observeRoot(element);
    return element;
  };
  doc.createElement = function(tagName) {
    return doc._createElement(tagName, true);
  }

  // patch doc.createElementNS

  var HTMLNS = 'http://www.w3.org/1999/xhtml';
  var _origCreateElementNS = doc.createElementNS;
  doc.createElementNS = function(namespaceURI, qualifiedName) {
    if (namespaceURI === 'http://www.w3.org/1999/xhtml') {
      return doc.createElement(qualifiedName);
    } else {
      return _origCreateElementNS.call(document, namespaceURI, qualifiedName);
    }
  };

  // patch Element.attachShadow

  var _origAttachShadow = Element.prototype['attachShadow'];
  if (_origAttachShadow) {
    Object.defineProperty(Element.prototype, 'attachShadow', {
      value: function(options) {
        var root = _origAttachShadow.call(this, options);
        var customElements = win['customElements'];
        customElements._observeRoot(root);
        return root;
      },
    });
  }

  /** @type {CustomElementsRegistry} */
  window['customElements'] = new CustomElementsRegistry();
})();
