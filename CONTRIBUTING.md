# How to contribute

We will happily accept contributions to Onsen UI. It can be both fixes for bugs or typos or even new features that extend Onsen UI.

The basic workflow when making contributions is the following:

* [Fork](https://github.com/OnsenUI/OnsenUI/fork) the repository
* Commit your changes
* Make a [pull request](https://help.github.com/articles/using-pull-requests) to **master** branch.

After you've made a pull request we will review it. If everything is fine and we like the change the contribution will be pulled into the main Onsen UI repository. In the case where there are some issues with the code or we disagree with how it's been implemented we will describe the issues in the comments so they can be corrected.

## Source code structure

The following is an overview of how the source code is structured to give contributors an idea of where to look when making changes.

Please don't make changes directly to generated files like `onsenui.js` and `onsenui.css`!

### Components

Onsen UI elements are made on top of Web Components. The source code is located in [core/src/](https://github.com/OnsenUI/OnsenUI/tree/master/core/src). This directory contains every single element in Onsen UI core and also internal functionality.

### Bindings

We wrap Onsen UI core with extra libraries to make it work better with some specific frameworks. The source code of these libraries is located in [bindings](https://github.com/OnsenUI/OnsenUI/tree/master/bindings), with the exception of [React Components](https://github.com/OnsenUI/react-onsenui).

### Style sheets

Most of the style is defined in a separate project called `Onsen CSS Components` which is located [here](https://github.com/OnsenUI/OnsenUI/tree/master/css-components).

Changes to the style should be made by editing the files in [this directory](https://github.com/OnsenUI/OnsenUI/tree/master/css-components/components-src/stylus/components). These files will compile into the `onsen-css-components.css` file.

There is also a stylesheet that is specific to the custom elements called `onsenui.css`, this file is compiled from the files in [this directory](https://github.com/OnsenUI/OnsenUI/tree/master/core/css).

## Code style

There are some things to keep in mind when making code contributions to Onsen UI. The code must adhere to the general code style used.

Here is a list of some rules that should be followed:

* Code should be properly indented. Onsen UI uses two-space indentation in both HTML and JavaScript. Please don't use tabs for indentation.
* Separate binary operators with spaces: `var x = 1+1` is incorrect, it should be written as: `var x = 1 + 1`.
* `if`, `while`, `for`, etc. should be separated from the parenthesis with a space.
* Use easy-to-understand and logical naming for your variables and method names, especially for variables and methods that are exposed to the user.
* Internal APIs should be preceded by an underscore.
* Use single quotes for strings in JavaScript and double quotes for attributes in HTML.

## Commit Message Format

We follow rules similar to those of [AngularJS](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) for commit messages.
```
<type>(<scope>): <subject>
```
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
