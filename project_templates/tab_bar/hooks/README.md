<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->
# Cordova Hooks

This directory may contain scripts used to customize cordova commands. This
directory used to exist at `.cordova/hooks`, but has now been moved to the
project root. Any scripts you add to these directories will be executed before
and after the commands corresponding to the directory name. Useful for
integrating your own build systems or integrating with version control systems.

__Remember__: Make your scripts executable.

## Hook Directories
The following subdirectories will be used for hooks:

    after_build/
    after_compile/
    after_docs/
    after_emulate/
    after_platform_add/
    after_platform_rm/
    after_platform_ls/
    after_plugin_add/
    after_plugin_ls/
    after_plugin_rm/
    after_plugin_search/
    after_prepare/
    after_run/
    after_serve/
    before_build/
    before_compile/
    before_docs/
    before_emulate/
    before_platform_add/
    before_platform_rm/
    before_platform_ls/
    before_plugin_add/
    before_plugin_ls/
    before_plugin_rm/
    before_plugin_search/
    before_prepare/
    before_run/
    before_serve/
    pre_package/ <-- Windows 8 and Windows Phone only.

## Script Interface

All scripts are run from the project's root directory and have the root directory passes as the first argument. All other options are passed to the script using environment variables:

* CORDOVA_VERSION - The version of the Cordova-CLI.
* CORDOVA_PLATFORMS - Comma separated list of platforms that the command applies to (e.g.: android, ios).
* CORDOVA_PLUGINS - Comma separated list of plugin IDs that the command applies to (e.g.: org.apache.cordova.file, org.apache.cordova.file-transfer)
* CORDOVA_HOOK - Path to the hook that is being executed.
* CORDOVA_CMDLINE - The exact command-line arguments passed to cordova (e.g.: cordova run ios --emulate)

If a script returns a non-zero exit code, then the parent cordova command will be aborted.


## Writing hooks

We highly recommend writting your hooks using Node.js so that they are
cross-platform. Some good examples are shown here:

[http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/](http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/)

