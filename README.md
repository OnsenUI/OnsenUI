# Onsen UI 

[![Circle CI](https://circleci.com/gh/OnsenUI/OnsenUI.svg?style=svg)](https://circleci.com/gh/OnsenUI/OnsenUI)

The best place to start with Onsen UI is our [Getting Started](http://onsen.io/guide/getting_started.html) page.

![The Answer to PhoneGap UI Development](https://cloud.githubusercontent.com/assets/9889313/5350569/eec8b870-7efb-11e4-90af-2f4d505e09a8.png)

Built on top of [AngularJS](http://angularjs.org/) and [Topcoat](http://topcoat.io/), Onsen UI is open source, free and open for all. Onsen UI is designed and implemented to deliver unprecedented user experience for your apps. Applications can be built using **HTML tags** web developers already know and love. We love AngularJS and all the power it brings. But we've also added support for JQuery so developers less familiar with AngularJS can take advantage of Onsen UI, too.

Onsen UI also includes Onsen CSS Components, a free resource of UI templates with "theme roller" functionality. Developers can pick and choose, grab the code they need, and they're off and running. And they can create their own templates and submit to Onsen UI to be included with other templates available. 

Our [Monaca IDE] fully supports Onsen UI plugin.

## Browser Support

Onsen UI is tested with the following browsers and mobile OS.

 * Android4.0.2+
 * iOS7+
 * Google Chrome
 * Safari

## Demo

[Click here](http://onsen.io/guide/components.html) to see Onsen UI in action!

## What's Included

* [AngularJS](angularjs.org): for directives
* [Topcoat](topcoat.io): for fast UI css
* [HammerJS](http://eightmedia.github.io/hammer.js/): for touch, swipe handling
* [Font Awesome](http://fontawesome.io/): for icons

## Getting Started Using Templates

See the [Onsen UI Getting Started](http://onsen.io/getting_started/) page.

## Getting Started Using Monaca

See the [Onsen UI Getting Started Page] and scroll down to the Using Onsen UI with Monaca section. 

## Download the latest build

A new build is generated every time the code changes. It can be downloaded on [this page](http://onsen.io/download.html#latest-build).

Please use this with caution. However, we are very grateful if people try it out so we can find bugs and things to improve before the sharp releases.

## How to build

* Clone this repository

```bash
$ git clone https://github.com/OnsenUI/OnsenUI.git
```

* Open the terminal from OnsenUI directory

```bash
$ cd OnsenUI
```

* Install dependencies using [npm](http://nodejs.org/download/)

```bash
$ npm install
```

* Install gulp (globally)

```bash
$ [sudo] npm install -g gulp
```

* Type gulp to start building

```bash
$ gulp build
```

The files will be built and copied into **build**, **demo/lib/onsen/**, and **app/lib/onsen/** folder.

## Running Demo

```bash
$ npm install
$ [sudo] npm install -g gulp
$ gulp serve
```

* Then navigate your browser to [http://0.0.0.0:8000/demo/index.html](http://0.0.0.0:8000/demo/index.html)

## Running the test suite

Onsen UI has end-to-end testing using Protractor. Use the following command to run the tests:

```bash
$ npm install
$ gulp test
```

It will take some time the because it will download a stand-alone Selenium Server and a Chrome webdriver the first time it's executed.

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

```bash
$ gulp test --specs test/e2e/lazyRepeat/scenarios.js
```

## Developing your app

Our [Monaca IDE] makes it super easy to create Onsen UI project, but if you want to use other IDEs, we provide project templates for you in the `project_templates` folder. You will see the instruction on how to run the project there.

## Documentation

See the current [Onsen UI docs](http://onsen.io/guide/overview.html).

## Developing Onsen UI

Run gulp task to develop Onsen UI itself with livereload.

    gulp serve

Access [http://0.0.0.0:8000/demo/index.html](http://0.0.0.0:8000/demo/index.html) and your code changes will be reloaded.

## Current Roadmap

Please see the following file for information about upcoming releases and what will be included.

* [Onsen UI Roadmap](https://github.com/OnsenUI/OnsenUI/blob/master/ROADMAP.md)

Please tell us if you have any suggestions for features that you would like to see included.

## How to contribute

We will happily accept contributions to Onsen UI. It can be both fixes for bugs or typos or even new features that extend Onsen UI.

The basic workflow when making contributions is the following:

* [Fork](https://github.com/OnsenUI/OnsenUI/fork) the repository
* Commit your changes
* Make a [pull request](https://help.github.com/articles/using-pull-requests) to **master** branch.

After you've made a pull request we will review it. If everything is fine and we like the change the contribution will be pulled into the main Onsen UI repository. In the case where there are some issues with the code or we disagree with how it's been implemented we will describe the issues in the comments so they can be corrected.

### Contributors

Please see the full [list of contributors](https://github.com/OnsenUI/OnsenUI/blob/master/CONTRIBUTORS.md).

### Source code structure

The following is an overview of how the source code is structures to give contributors an idea of where to look when making changes.

Please don't make changes directly to generated files like `onsenui.js` and `onsenui.css`!

#### Components

Components will generally have one "view" file and one "directive" file.

* View files are located in `[/framework/views/](/OnsenUI/OnsenUI/tree/master/framework/views)`. The view file contains the logic of the component. This is often the place to look when making additions or fixes to a component.
* Directive files are found in the `[/framework/directives/](/OnsenUI/OnsenUI/tree/master/framework/directives)` directory. These files define the AngularJS directives.

#### Style sheets

Most of the style is defined in a separate project called `Onsen CSS Components` which is located [here](https://github.com/OnsenUI/OnsenUI/tree/master/css-components).

Changes to the style should be made by editing the files in [this directory](/OnsenUI/OnsenUI/tree/master/css-components/components-src/stylus/components). These files will compile into the `onsen-css-components.css` file.

There is also a stylesheet that is specific to the custom elements called `onsenui.css`, this file is compiled from the files in [this directory](/OnsenUI/OnsenUI/tree/master/framework/css).

### Code style

There are some things to keep in mind when making code contributions to Onsen UI. The code must adhere to the general code style used.

Here is a list of some rules that should be followed:

* Code should be properly indented. Onsen UI uses two-space indentation in both HTML and JavaScript. Please don't use tabs for indentation.
* Separate binary operators with spaces: `var x = 1+1` is incorrect, it should be written as: `var x = 1 + 1`.
* `if`, `while`, `for`, etc. should be separated from the paranthesis with a space.
* Use easy-to-understand and logical naming for your variables and method names, especially for variables and methods that are exposed to the user.
* Internal APIs should be preceded by an underscore.
* Use single quotes for strings in JavaScript and double quotes for attributes in HTML.

## Getting support

If anything about Onsen UI is unclear, please ask a question on <a href="http://stackoverflow.com" target="_blank">Stackoverflow</a>, and tag it "onsen-ui".  An Onsen UI support engineer will answer it.
	
If you have any requests or comments regarding the development of Onsen UI, please feel free to direct them to the Twitter account (<a href="http://twitter.com/Onsen_UI" target="_blank">@Onsen_UI</a>).


[Onsen UI]:http://onsen.io/
[Onsen UI Getting Started Page]:http://onsen.io/getting_started/
[Monaca Forum]:http://monaca.mobi/forum
[Monaca IDE]:http://monaca.mobi/
