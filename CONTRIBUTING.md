Contributing Guide
==================

We will happily accept contributions to Onsen UI. It can be both fixes for bugs or typos or even new features that extend Onsen UI.
The basic workflow when making contributions is the following:

* [Fork](https://github.com/OnsenUI/OnsenUI/fork) the repository
* Commit your changes
* Make a [pull request](https://help.github.com/articles/using-pull-requests) to the **onsen.io** branch for documentation fixes in the current release of Onsen UI, or **master** for anything else.

After you've made a pull request we will review it. If everything is fine and we like the change the contribution will be pulled into the main Onsen UI repository. In the case where there are some issues with the code or we disagree with how it's been implemented we will describe the issues in the comments so they can be corrected.


Supported frameworks
--------------------

The following frameworks are supported by the Onsen UI core team:

    Framework     | Package               | Notes
    --------------+-----------------------+------------------------
    React         | react-onsenui         |
    Vue 2         | vue-onsenui@legacy    | bug fixes only
    Vue 3         | vue-onsenui@latest    |
    Angular       | ngx-onsenui           |
    AngularJS     | angularjs-onsenui     | bug fixes only

If you are interested in writing bindings for another framework, feel free to ask for help in the GitHub issues. Bindings for other frameworks should generally be maintained outside the OnsenUI repository.


Source Code Structure
---------------------

The following is an overview of how the source code is structured to give contributors an idea of where to look when making changes.

Please don't make changes directly to generated files like `onsenui.js` and `onsenui.css`!

### Components

Onsen UI elements are made on top of Web Components. The source code is located in [onsenui/esm](https://github.com/OnsenUI/OnsenUI/tree/master/onsenui/esm). This directory contains every single element in Onsen UI core and also internal functionality.

### Bindings

We wrap Onsen UI core with extra libraries to make it work better with some specific frameworks, such as React and Vue. See [Directory Structure](#directory-structure) to find the source for a particular framework.

### Style Sheets

Most of the style is defined in Onsen CSS Components, which is located [here](https://github.com/OnsenUI/OnsenUI/tree/master/onsenui/css/css-components-src).

Changes to the style should be made by editing the files in [this directory](https://github.com/OnsenUI/OnsenUI/tree/master/onsenui/css/css-components-src/components). These files will compile into the `onsen-css-components.css` file.

There is also a stylesheet that is specific to the custom elements called `onsenui.css`, this file is compiled from the files in [this directory](https://github.com/OnsenUI/OnsenUI/tree/master/onsenui/css/src).


Directory Structure
-------------------

    .
    ├── onsenui                         Onsen UI main project
    │   ├── css                         Onsen UI core CSS and CSS components
    │   ├── esm                         Onsen UI source
    │   ├── examples                    Examples for main project
    │   └── bindings
    │       └── angular1                AngularJS bindings
    │
    ├── react-onsenui                   React bindings
    ├── react-onsenui-examples          Example app for React bindings
    │
    ├── ngx-onsenui
    │   └── projects
    │       ├── ngx-onsenui             Angular 2+ bindings
    │       └── ngx-onsenui-examples    Example app for Angular 2+ bindings
    │
    ├── vue3-onsenui                    Vue 3 bindings
    ├── vue3-onsenui-examples           Example app for Vue 3 bindings
    │
    ├── vue-onsenui                     Vue 2 bindings
    └── vue-onsenui-examples            Example app for Vue 2 bindings


Development Setup
-----------------

You will need a recent version of [Node.js](https://nodejs.org/) and npm 7 or later before continuing.

Clone this repository and run the following command:

    npm install

This installs the dependencies for Onsen UI and the framework bindings (excluding Angular 2+; see below).

### Onsen UI core

To work on the Onsen UI core, serve the examples:

    npm run serve

Then navigate your browser to [http://0.0.0.0:3000/examples/index.html](http://0.0.0.0:3000/examples/index.html)

Any changes to the Onsen UI source in `onsenui/esm` will trigger a rebuild.

To perform a full build of the Onsen UI core:

    npm run build

This will bundle the `onsenui/esm` source files to UMD in `onsenui/js`.
It will also build the CSS components and core CSS in `onsenui/css`.

### Bindings (React, Vue 2, Vue 3)

To work on one of the framework bindings, run the relevant `watch` command to trigger a rebuild whenever the source is changed:

    npm run watch:react       // or watch:vue, watch:vue3

In another terminal, run the relevant `serve` command to serve the example project:

    npm run serve:react       // or serve:vue, serve:vue3

To perform a full build:

    npm run build:react       // or build:vue, build:vue3

### Bindings (Angular 2+)

The Angular 2+ bindings are in a self-contained workspace created with Angular CLI.

To work on the Angular 2+ bindings:

    cd ngx-onsenui
    npm install

See the full instructions [here](https://github.com/OnsenUI/OnsenUI/tree/master/ngx-onsenui/README.md).


Code Style
----------

There are some things to keep in mind when making code contributions to Onsen UI. The code must adhere to the general code style used.

Here is a list of some rules that should be followed:

* Code should be properly indented. Onsen UI uses two-space indentation in both HTML and JavaScript. Please don't use tabs for indentation.
* Separate binary operators with spaces: `var x = 1+1` is incorrect, it should be written as: `var x = 1 + 1`.
* `if`, `while`, `for`, etc. should be separated from the parenthesis with a space.
* Use easy-to-understand and logical naming for your variables and method names, especially for variables and methods that are exposed to the user.
* Internal APIs should be preceded by an underscore.
* Use single quotes for strings in JavaScript and double quotes for attributes in HTML.


Commit Message Format
---------------------

We follow rules similar to those of [AngularJS](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) for commit messages.

    <type>(<scope>): <subject>

**Type** should be one of these:
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

**Scope** should contain, if applicable, the modified Onsen UI element such as *ons-navigator*, *ons-switch*, etc. It could also contain descriptive words like *core*, *dependencies*, etc.

**Subject** reflects and summarizes the content of the commit.


Running Tests
-------------

Onsen UI has unit tests for the Web Components as well as end-to-end testing of the binding libraries using Protractor.

Use the following commands to run the tests:

    npm test

or these commands for end-to-end testing of the binding libraries:

    cd bindings/angular1
    gulp e2e-test

    cd bindings/angular2
    npm install
    gulp e2e-test

It will take some time the because it will download a stand-alone Selenium Server and a Chrome webdriver the first time it's executed.

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

    cd bindings/angular1
    gulp e2e-test --specs test/e2e/lazyRepeat/scenarios.js


Documentation
-------------

Onsen UI's documentation is generated directly from each file's source code, using Onsen UI's own [wcdoc](https://github.com/OnsenUI/wcdoc) tool. The syntax will be familiar if you have used JSDoc before. Running this tool generates JSON files which are stored in `build/docs`. These JSON files are then used by the [onsen.io](https://github.com/OnsenUI/onsen.io) repository to generate the documentation you see on the website.

### Setup

Assuming you have already set up the Onsen UI repository, the other thing you need to do is set up the [onsen.io](https://github.com/OnsenUI/onsen.io) repository. Follow the instructions in that README to get it set up, but stop when you get to the comment `Checkout and build the latest revision of Onsen UI 2`. Instead of using the version of Onsen UI from GitHub, you want to use your local repository. The easiest way to do this is to create a symlink. Assuming your Onsen UI repository is at `~/dev/onsen/OnsenUI` and your onsen.io repository is at `~/dev/onsen/onsen.io`, the command would look like this (on MacOS and Linux):

    ln -s ~/dev/onsen/OnsenUI/onsenui ~/dev/onsen/onsen.io/dist/v2/OnsenUI

### Modifying Documentation

Once this is all set up, follow these steps to modify the documentation.

 1. `Onsen UI`: Modify the documentation comments in the relevant JS file
 2. `Onsen UI`: Run `npm run docs`
 3. If you are changing the React docs, there are extra steps. Otherwise, skip to step 4.
	- `Onsen UI`: Build the React Docs: `npm run docs:react`
	- `onsen.io`: Delete the React doc cache, if it exists: `rm -r .reactdoc`
 4. `onsen.io`: Run `gulp serve --lang en`

The React documentation is built separately and cached because it takes a while to build. So, if you make changes to the documentation of React bindings, ensure you follow step 3 or you may not see your changes reflected.


Release Procedure
-----------------

Follow these steps to release a new version of Onsen UI. You will need to have permission to publish to Onsen UI's npm to complete these steps.

If you are publishing both the Onsen UI core and bindings at the same time, release the core first and then the bindings.

### Core Release

Before starting a release, check the following:
 - Run the tests and confirm that they are passing (`npm test`, or check [CircleCI](https://circleci.com/gh/OnsenUI/OnsenUI))
   - For a major release with fundamental changes, all components must be tested on all supported platforms
 - If there are any new components, ensure they work in the Theme Roller
 - Check the [Issues](https://github.com/OnsenUI/OnsenUI/issues) and ensure there are no outstanding breaking issues
 - Check `CHANGELOG.md` and ensure that all the latest fixes and features are listed. Usually they are not because pull requests do not tend to modify the changelog. Compare it to the `git log` and add anything that is missing.
 - Merge **onsen.io** into **master**. **onsen.io** contains documentation changes for the current release of Onsen UI that were made after the release.

Once you have done the pre-release checks above, follow the steps below to publish the core.
 - Increase the version number
   - `CHANGELOG.md`: Change `dev` to the new version number
   - `package.json`: Change `version` to the new version number
   - Commit and push these changes, with a commit message like: `chore(*): Bump 2.10.2`
 - Merge `master` into `production`, and push
   - `git checkout production && git merge master && git push`
 - Tag production with the version number, and push
   - e.g. `git tag 2.10.2 && git push --tags`
 - Build Onsen UI
   - `npm install && npm run build`
   - This installs the dependencies and builds Onsen UI.
 - Publish to npm.
   - `npm publish`

Then, on GitHub, create new releases for `OnsenUI` and `OnsenUI-dist`.
 - On the New Release pages (linked below), _tag version_ and _Release title_ should both be the version number (e.g. `2.10.2`). Under _Describe this release_, copy the section for this release from `CHANGELOG.md`. Click _Publish Release_.
 - OnsenUI: https://github.com/OnsenUI/OnsenUI/releases/new
 - OnsenUI-dist: https://github.com/OnsenUI/OnsenUI-dist/releases/new

Then update the Onsen UI website:
 - Merge **master** into the **onsen.io** branch. These should now be identical.
 - Run a build of the onsen.io repository on Circle CI.

Finally, update monaca/monaca-component-onsenui:
1. `git clone` the repo
2. `npm install onsenui -g --prefix .` to get the latest onsenui
3. Copy relevant files in latest onsenui dir to monaca-component-onsenui dir (same way as past commits)
4. Update package.json (and some other files) manually
5. Commit changes
6. Tag the new version (i.e. 2.10.6) to the new commit
7. Push to GitHub

That's it! Your new Onsen UI version is released. :tada:

### Releasing New Versions of Bindings
Releasing new versions of bindings is relatively straightforward.

 - Ensure the tests are passing and there are no outstanding breaking issues
 - Update the binding's `package.json`
   - Change `version` to the new version of the binding
   - If `onsenui` is listed in `dependencies` or `peerDependencies`, change its version to the latest available
   - Commit and push these changes, with a commit message like: `chore(vue): Bump 2.6.0`
 - Publish to npm. The bindings' `package.json` files contain `prepublish` commands, which will automatically build the bindings before publishing.
   - Inside the binding's root directory, run `npm publish`

That's it! Your new binding version is released. :tada:


Related repositories
--------------------

- [OnsenUI/onsen.io](https://github.com/OnsenUI/onsen.io): the Onsen UI website, [onsen.io]().
- [OnsenUI/playground](https://github.com/OnsenUI/playground): the Onsen UI playground, for interactive tutorials and issue reporting, [onsen.io/playground]().
- [OnsenUI/theme-roller](https://github.com/OnsenUI/theme-roller): the Theme Roller, for creating custom Onsen UI themes, [onsen.io/theme-roller]().
