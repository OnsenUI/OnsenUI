"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findExportedComponentDefinition;

var _astTypes = require("ast-types");

var _isExportsOrModuleAssignment = _interopRequireDefault(require("../utils/isExportsOrModuleAssignment"));

var _isReactComponentClass = _interopRequireDefault(require("../utils/isReactComponentClass"));

var _isReactCreateClassCall = _interopRequireDefault(require("../utils/isReactCreateClassCall"));

var _isReactForwardRefCall = _interopRequireDefault(require("../utils/isReactForwardRefCall"));

var _isStatelessComponent = _interopRequireDefault(require("../utils/isStatelessComponent"));

var _normalizeClassDefinition = _interopRequireDefault(require("../utils/normalizeClassDefinition"));

var _resolveExportDeclaration = _interopRequireDefault(require("../utils/resolveExportDeclaration"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

var _resolveHOC = _interopRequireDefault(require("../utils/resolveHOC"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const ERROR_MULTIPLE_DEFINITIONS = 'Multiple exported component definitions found.';

function ignore() {
  return false;
}

function isComponentDefinition(path) {
  return (0, _isReactCreateClassCall.default)(path) || (0, _isReactComponentClass.default)(path) || (0, _isStatelessComponent.default)(path) || (0, _isReactForwardRefCall.default)(path);
}

function resolveDefinition(definition) {
  if ((0, _isReactCreateClassCall.default)(definition)) {
    // return argument
    const resolvedPath = (0, _resolveToValue.default)(definition.get('arguments', 0));

    if (_astTypes.namedTypes.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath;
    }
  } else if ((0, _isReactComponentClass.default)(definition)) {
    (0, _normalizeClassDefinition.default)(definition);
    return definition;
  } else if ((0, _isStatelessComponent.default)(definition) || (0, _isReactForwardRefCall.default)(definition)) {
    return definition;
  }

  return null;
}
/**
 * Given an AST, this function tries to find the exported component definition.
 *
 * The component definition is either the ObjectExpression passed to
 * `React.createClass` or a `class` definition extending `React.Component` or
 * having a `render()` method.
 *
 * If a definition is part of the following statements, it is considered to be
 * exported:
 *
 * modules.exports = Definition;
 * exports.foo = Definition;
 * export default Definition;
 * export var Definition = ...;
 */


function findExportedComponentDefinition(ast) {
  let foundDefinition;

  function exportDeclaration(path) {
    const definitions = (0, _resolveExportDeclaration.default)(path).reduce((acc, definition) => {
      acc.push(definition);
      return acc;
    }, []);

    if (definitions.length === 0) {
      return false;
    }

    if (definitions.length > 1 || foundDefinition) {
      // If a file exports multiple components, ... complain!
      throw new Error(ERROR_MULTIPLE_DEFINITIONS);
    }

    foundDefinition = definitions[0];
    return false;
  }

  (0, _astTypes.visit)(ast, {
    visitFunctionDeclaration: ignore,
    visitFunctionExpression: ignore,
    visitClassDeclaration: ignore,
    visitClassExpression: ignore,
    visitIfStatement: ignore,
    visitWithStatement: ignore,
    visitSwitchStatement: ignore,
    visitWhileStatement: ignore,
    visitDoWhileStatement: ignore,
    visitForStatement: ignore,
    visitForInStatement: ignore,
    visitForOfStatement: ignore,
    visitImportDeclaration: ignore,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,
    visitAssignmentExpression: function (path) {
      // Ignore anything that is not `exports.X = ...;` or
      // `module.exports = ...;`
      if (!(0, _isExportsOrModuleAssignment.default)(path)) {
        return false;
      } // Resolve the value of the right hand side. It should resolve to a call
      // expression, something like React.createClass


      path = (0, _resolveToValue.default)(path.get('right'));

      if (!isComponentDefinition(path)) {
        path = (0, _resolveToValue.default)((0, _resolveHOC.default)(path));

        if (!isComponentDefinition(path)) {
          return false;
        }
      }

      if (foundDefinition) {
        // If a file exports multiple components, ... complain!
        throw new Error(ERROR_MULTIPLE_DEFINITIONS);
      }

      foundDefinition = resolveDefinition(path);
      return false;
    }
  });
  return foundDefinition;
}