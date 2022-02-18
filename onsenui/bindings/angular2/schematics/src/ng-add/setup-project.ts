import { parseJson } from '@angular-devkit/core';
import { chain, Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  getProjectTargetOptions,
  getSourceFile,
  hasNgModuleImport,
} from '../utils';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addSymbolToNgModuleMetadata } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { Schema } from './schema';

/** JSON */
interface UpdateJsonFn<T> {
  (obj: T): T | void;
}

type TsLintPartialType = {
  rules: {
    [key: string]: [
      boolean,
      string | string[],
      string | string[],
      string
    ]
  };
}

/** Name of the ngx-onsenui module. */
const moduleName = 'OnsenModule';

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds OnsenModule to app.module
 */
export default function(options: Schema): Rule {
  return chain([
    addCustomElementsSchema(options),
    addOnsenModule(options),
    addOnsenStyles(options),
    updateTsLint(),
    showCompleteMessage()
  ]);
}

/**
 * Updates JSON file
 */
function updateJsonFile<T>(host: Tree, path: string, callback: UpdateJsonFn<T>): Tree {
  const source = host.read(path);
  if (source) {
    const sourceText = source.toString('utf-8');
    const json = parseJson(sourceText);
    callback(json as {} as T);
    host.overwrite(path, JSON.stringify(json, null, 4));
  }

  return host;
}

/**
 * Updates tslint.json
 */
function updateTsLint() {
  return (host: Tree) => {
    if (!host.exists('src/tslint.json')) { return host; }

    return updateJsonFile(host, 'src/tslint.json', (tslint: TsLintPartialType) => {
      if (!tslint.rules) {
        tslint.rules = {};
      }
      if (!tslint.rules['component-selector']) {
        tslint.rules['component-selector'] = [
          true,
          'element',
          'app',
          'kebab-case'
        ];
      }

      const s = tslint.rules['component-selector'][2];
      if (Array.isArray(s)) {
        tslint.rules['component-selector'][2] = [...s, 'ons-page'];
      } else {
        tslint.rules['component-selector'][2] = [s, 'ons-page'];
      }
    });
  };
}

/**
 * Adds an animation module to the root module of the specified project.
 */
function addOnsenModule(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (!hasNgModuleImport(host, appModulePath, moduleName)) {
      // Do not add the OnsenModule module if the project already explicitly uses
      // the BrowserAnimationsModule.
      addModuleImportToRootModule(host, moduleName, 'ngx-onsenui', project);
    }

    context.logger.log('info', `✅️ ${moduleName} is imported`);

    return host;
  };
}

/**
 * Adds CUSTOM_ELEMENTS_SCHEMA to the root module of the specified project. 
 */
function addCustomElementsSchema(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    const moduleSource = getSourceFile(host, appModulePath);
    if (!moduleSource) {
        throw new SchematicsException(`Module not found: ${appModulePath}`);
    }

    const changes = addSymbolToNgModuleMetadata(moduleSource, appModulePath, 'schemas', 'CUSTOM_ELEMENTS_SCHEMA', '@angular/core');

    const declarationRecorder = host.beginUpdate(appModulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    return host;
  }
}

/**
 * Adds Onsen UI styles to the specified project. 
 */
function addOnsenStyles(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const onsenTheme =  `./node_modules/onsenui/css/onsenui.css`;
    const onsenComponentsTheme =  `./node_modules/onsenui/css/onsen-css-components.css`;

    addThemeStyleToTarget(project, 'build', host, onsenTheme, workspace);
    addThemeStyleToTarget(project, 'build', host, onsenComponentsTheme, workspace);
    addThemeStyleToTarget(project, 'test', host, onsenTheme, workspace);
    addThemeStyleToTarget(project, 'test', host, onsenComponentsTheme, workspace);

    context.logger.log('info', `✅️ Added Onsen UI theme to styles`);

    return host;
  };
}

/** Adds a theming style entry to the given project target options. */
function addThemeStyleToTarget(project: WorkspaceProject, targetName: string, host: Tree,
  assetPath: string, workspace: WorkspaceSchema) {

  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [assetPath];
  } else {
    const existingStyles = targetOptions.styles.map((s: any) => typeof s === 'string' ? s : s.input);

    for (let stylePath of existingStyles.entries()) {
      // If the given asset is already specified in the styles, we don't need to do anything.
      if (stylePath === assetPath) {
        return;
      }
    }

    targetOptions.styles.unshift(assetPath);
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

/**
 * Show complete message.
 */
function showCompleteMessage() {
  return (host: Tree, context: SchematicContext) => {
    context.logger.log('info', `🎉 Hooray! ngx-onsenui is successfully installed.`);
    context.logger.log('info', `♨️ For more information, see https://onsen.io/v2/api/angular2/`);
    return host;
  };
}
