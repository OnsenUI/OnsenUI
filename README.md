<p style="text-align: center"><a href="https://onsen.io/" target="_blank"><img width="200"src="https://onsenui.github.io/art/logos/onsenui-logo-1.png"></a></p>

<p style="text-align: center">
  <a href="https://gitter.im/OnsenUI/OnsenUI"><img src="https://badges.gitter.im/Join%20Chat.svg" alt="Gitter Chat"></a>
  <a href="https://community.onsen.io/"><img src="https://img.shields.io/badge/forum-onsen--ui-FF412D.svg" alt="Forum"></a>
  <a href="https://github.com/OnsenUI/OnsenUI/blob/master/core/src/onsenui.d.ts"><img src="http://definitelytyped.org/badges/standard.svg" alt="TypeScript definitions"></a>
  <br>
  <a href="https://circleci.com/gh/OnsenUI/OnsenUI"><img src="https://circleci.com/gh/OnsenUI/OnsenUI.svg?style=shield" alt="Circle CI"></a>
  <a href="https://coveralls.io/github/OnsenUI/OnsenUI?branch=master"><img src="https://coveralls.io/repos/OnsenUI/OnsenUI/badge.svg?branch=master&service=github" alt="Coverage Staus"></a>
  <a href="https://badge.fury.io/js/onsenui"><img src="https://badge.fury.io/js/onsenui.svg" alt="NPM version"></a>
  <a href="https://cdnjs.com/libraries/onsen"><img src="https://img.shields.io/cdnjs/v/onsen.svg" alt="CDNJS"></a>
</p>

## Cross-platform HTML5 Mobile App Framework

<p style="display:flex; justify-content:space-between; align-items:center; margin: 30px 0">
  <span style="display:flex; flex-direction:column; justify-content:space-between; padding-right:30px">
    <span><a href="https://onsen.io/" target="_blank"><strong>Onsen UI</strong></a> is a library of UI components to help you create beautiful hybrid and mobile web apps for both Android and iOS using Javascript.</span>
    <span style="margin-top: 6px">It is <strong>open source</strong> and designed to deliver native look and feel. Apps are made out of simple HTML tags, thus providing a gentle learning curve.</span>
    <span style="margin-top: 6px">Both <strong>iOS flat and Android's Material design</strong> are included. The components are optionally auto-styled based on the platform, which makes it possible to support both iOS and Android with the <strong>same source code</strong>. </span>
    <span style="margin-top: 6px">The core library is written in <strong>pure Javascript</strong> (on top of <a href="http://webcomponents.org/">Web Components</a>) and is <strong>framework agnostic</strong>, which means you can use it with your favorite framework and its tools.</span>
  </span>
  <img style="height: 400px" src="https://onsenui.github.io/art/showcase/showcase-onsenui.gif" alt="Onsen UI Todo App">
</p>

 Currently, we provide some extra binding packages in order to __tailor Onsen UI's API__ for specific frameworks:

<span style="display:flex; justify-content:space-around">
  <span><a href="https://onsen.io/react"><span style="background:url(https://onsen.io/images/common/icn_react_top.svg) center no-repeat; height:40px; display:block"></span><strong>React</strong></a></span>
  <span><a href="https://onsen.io/angular2"><span style="background:url(https://onsen.io/images/common/icn_angular2_top.svg) center no-repeat; height:40px; display:block"></span><strong>Angular 2+</strong></a></span>
  <span><a href="https://onsen.io/vue"><span style="background:url(https://onsen.io/images/common/icn_vuejs_top.svg) center no-repeat; height:40px; display:block"></span><strong>Vue</strong></a></span>
  <span><a href="https://onsen.io/v2/docs/guide/angular1/index.html"><span style="background:url(https://onsen.io/images/common/icn_angular1_top.svg) center no-repeat; height:40px; display:block"></span><strong>AngularJS 1.x</strong></a></span>
</span>

Some other frameworks are supported by __community__ packages (i.e. not tested or implemented by the core team): [Aurelia](https://www.npmjs.com/package/aurelia-onsenui), [EmberJS](https://www.npmjs.com/package/ember-onsenui).

## Getting started

We have several resources to help you get started creating hybrid apps with Onsen UI:

* __The official docs__: we provide a reference for the [core library (vanilla JS or jQuery)](https://onsen.io/v2/docs/js.html) as well as the [Vue](https://onsen.io/v2/docs/guide/vue/index.html), [React](https://onsen.io/v2/docs/guide/react/index.html), [Angular2](https://onsen.io/v2/docs/guide/angular2/) and [AngularJS 1.x](https://onsen.io/v2/docs/guide/angular1/) components.
* __Components overview__: a [list of included CSS components](https://onsen.io/v2/docs/css.html) in both flat and Material Design. Note that these components are just pure and performant CSS without JavaScript behavior. Some extra details (such as dragging or ripple effect) are added by Onsen UI custom elements.
* __Playground__: an [interactive Onsen UI tutorial](https://onsen.io/tutorial/) is also available where you can learn how to use the library and play around with the components.
* __Blog__: There are lots of great tutorials and guides published in our [official Onsen UI blog](https://onsen.io/blog/categories/tutorial.html) and we are adding new content regularly.
* __Support__: if you are having trouble using some component the best place to get help is the [Onsen UI Forum](https://community.onsen.io/). We are also available to answer short questions on Twitter at [@Onsen_UI](https://twitter.com/Onsen_UI).

## Onsen UI ecosystem

Because sometimes a UI framework may not be enough to make hybrid apps easily, Onsen UI comes with a __complete ecosystem__ of well integrated tools. Meet [__Monaca__](https://monaca.io/).

<p style="text-align: center"><a href="https://monaca.io" target="_blank"><img width="300"src="https://onsenui.github.io/art/logos/monaca-logo-2.png"></a></p>

Made by the same team, __Monaca Platform__ is a toolkit that makes hybrid mobile app development with __PhoneGap / Cordova__ simple and easy: Onsen UI Cordova-like templates, debugging suite, push notifications, remote build, back-end solutions, encryption, version control, continuous integration and more. Furthermore, it provides developing environments with everything already configured and ready to go:

<p style="display:flex; justify-content:space-around">
  <a href="https://monaca.io/cloud.html"><strong>Cloud IDE</strong></a>
  <a href="https://monaca.io/cli.html"><strong>Command Line Interface</strong></a>
  <a href="https://monaca.io/localkit.html"><strong>Localkit GUI</strong></a>
</p>

Example with __CLI__:

```
$ [sudo] npm -g install monaca
$ monaca create helloworld # And choose the starter template
$ monaca preview # Preview on the browser
$ monaca debug # Preview on a real device
$ monaca remote-build # Production build on the cloud
```

See the [Onsen UI Getting Started Page](http://onsen.io/getting_started/) for more information.

## Examples with source code

There are lots of sample applications written using Onsen UI. __[Here are some examples](https://onsen.io/samples) with source code and tutorials__ to give you an idea of what kind of apps you can create.

<p style="display:flex; justify-content:space-around; align-items: center">
  <img src="https://onsen.io/images/samples/pokedex-pikachu.png">
  <img src="https://onsen.io/images/samples/react-redux-weather.png">
  <img src="https://onsen.io/images/samples/youtube.png">
</p>

## Browser Support

Onsen UI is tested with the following browsers and mobile OS.

 * Android 4.4.4+ (and Android 4.0+ with [Crosswalk engine](https://crosswalk-project.org/))
 * iOS 8+
 * Chrome
 * Safari

## Get Onsen UI

* __Download the latest released version__

Onsen UI is available with npm, bower or jspm. Example:

```bash
npm install onsenui
```

This downloads Onsen UI main library and AngularJS bindings. For other bingins, install also `react-onsenui`, `vue-onsenui` or `angular2-onsenui`.

* __Get the latest development build__

Optionally, you can download the [latest development build here](https://circleci.com/api/v1/project/OnsenUI/OnsenUI/latest/artifacts/0/$CIRCLE_ARTIFACTS/onsenui.zip?branch=master&filter=successful). Be careful, usually everything there is already tested but it might be unstable sometimes.

* __Manually build this project__

Clone this repository and run the following commands to build the project:

```bash
$ cd css-components
$ yarn install
$ gulp build
$ cd ..
$ yarn install
$ gulp build
```

This command requires you to [install yarn](https://yarnpkg.com/en/docs/install) if you haven't already. The files will be built and copied into **build** folder.

Or serve the files for development and running examples:

```bash
$ gulp serve
```

* Then navigate your browser to [http://0.0.0.0:3000/examples/index.html](http://0.0.0.0:3000/examples/index.html)

## Running the test suite

Onsen UI has unit tests for the Web Components as well as end-to-end testing of the binding libraries using Protractor.

Use the following commands to run the unit tests:

```bash
$ gulp unit-test
```

or these commands for end-to-end testing of the binding libraries:

```bash
$ cd bindings/angular1
$ gulp e2e-test
```

```bash
$ cd bindings/angular2
$ npm install
$ gulp e2e-test
```

It will take some time the because it will download a stand-alone Selenium Server and a Chrome webdriver the first time it's executed.

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

```bash
$ cd bindings/angular1
$ gulp e2e-test --specs test/e2e/lazyRepeat/scenarios.js
```

In order to run both the unit tests and the end-to-end tests use the following command:

```bash
$ gulp test
```

## Release procedure

Before releasing a new version, verify that the tests are passing and that there are no outstanding breaking issues. For major release with fundamental changes all components must be tested on all supported platforms.

The first step is to add increase the version number in `package.json` and commit it. After that a new tag must be added:

```
git tag -a 2.3.4
```

This tag is important for building the documentation on the website.

The next step is to run the release script:

```
cd scripts
sh dist-release.sh
```

This will build Onsen UI and put the files in the `OnsenUI-dist` directory.

The last step is to release the package on NPM. From the root of the repository do the following:

```
cd OnsenUI-dist;
npm publish
```

