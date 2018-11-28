import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { addPackageToPackageJson } from './package-config';
import { Schema } from './schema';

/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @angular/material`.
 *
 * Since the ngx-onsenui schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
export default function(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.log('info', `🔍 Installing packages...`);
    addPackageToPackageJson(tree, 'onsenui', '^2.10.0');
    addPackageToPackageJson(tree, 'ngx-onsenui', '^7.0.0');
    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
