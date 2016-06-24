# Onsen UI - HTML5 Hybrid Mobile App Framework

[![Join us on Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OnsenUI/OnsenUI)
[![Forum](https://img.shields.io/badge/forum-onsen--ui-FF412D.svg )](https://community.onsen.io/)
[![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard.svg)](https://github.com/OnsenUI/OnsenUI/blob/master/core/src/onsenui.d.ts)
[![Circle CI](https://circleci.com/gh/OnsenUI/OnsenUI.svg?style=shield)](https://circleci.com/gh/OnsenUI/OnsenUI) 
[![Coverage Status](https://coveralls.io/repos/OnsenUI/OnsenUI/badge.svg?branch=master&service=github)](https://coveralls.io/github/OnsenUI/OnsenUI?branch=master)
[![npm version](https://badge.fury.io/js/onsenui.svg)](https://badge.fury.io/js/onsenui)

The best place to start with Onsen UI is our [Getting Started](http://onsen.io/guide/getting_started.html) page.

**We just released the RC of Onsen UI 2. The new version includes Material Design, React components, Angular 2 components and much more. Check out all the new features [here](https://onsen.io/2/)!**

Onsen UI is:

* **Open source**, free and open for all. It's designed and implemented to deliver unprecedented user interface and user experience for your mobile and hybrid apps. Onsen UI is built on top of Web Components so applications can be built using **HTML tags** web developers already know and love.

* **Framework agnostic**. This means that it can be used with whatever front-end framework you prefer. However, it also provides a binding library for [**Angular 1 & 2**](https://angularjs.org/) which makes it easy to integrate our custom tags with these frameworks. [**React Components** for Onsen UI](https://onsen.io/react) are also available and they play really well with React tooling such as [React Hot Loader](https://github.com/gaearon/react-hot-loader), [Redux](https://github.com/reactjs/redux) or [MobX](https://github.com/mobxjs/mobx).

* Completely integrated with Monaca kit, a complete set of tools that makes PhoneGap/Cordova development super simple. **Monaca CLI** provides **Onsen UI templates, device debugger, remote building** and any service you might need directly from your terminal. We also have [GUI and cloud alternatives](https://monaca.io/) if you prefer that over CLI.

* Beautifully made with **flat (iOS) and Material Design (Android)** flavors. It automatically styles your app depending on the platform and gives you control to customize it. Check out our [*Automatic Styling*](https://onsen.io/blog/auto-style-app-onsen/) in action. It also includes [Onsen CSS Components](http://components2.onsen.io/), a free resource of UI templates with "**theme roller**" functionality. Developers can pick and choose, grab the code they need, and they're off and running. And they can create their own templates and submit to Onsen UI to be included with other templates available.

* [**Fully documented**](https://onsen.io/v2/docs/js.html). And if you want even more, we provide an [**Interactive Tutorial**](http://tutorial.onsen.io) where you can try and modify examples, export your code online and even generate Cordova projects.

* Community based. Check out our [**blog**](https://onsen.io/blog/), [**forum**](https://community.onsen.io/) and [**chat**](https://gitter.im/OnsenUI/OnsenUI) to get the latest updates and directly contact the dev team. We are always very active answering questions so you don't get stuck with your apps.

## Browser Support

Onsen UI is tested with the following browsers and mobile OS.

 * Android 4.1+
 * iOS8+
 * Windows Phone 10+
 * Google Chrome
 * Safari

## Demo

[Click here](https://frankdiox.github.io/frame-auto-style/example.html) to see Onsen UI in action! Check our [tutorial](http://tutorial.onsen.io/) for more examples.

## What's Included

* [Material Design](http://www.google.co.jp/design/spec/material-design/introduction.html): For Native-like Android UI
* [Web Components](http://webcomponents.org/): for Custom Elements
* [AngularJS module](https://angularjs.org/): bindings are backwards compatible with Onsen UI 1
* [Angular 2 components](https://angular.io/): components for Angular 2
* [React components](https://facebook.github.io/react/): components for React

## Getting Started Using Templates

See the [Onsen UI Getting Started](http://onsen.io/getting_started/) page. We provide project templates for you in the [`project-templates`](https://github.com/OnsenUI/project-templates) repository. You will see the instruction on how to run the project there.
For Visual Studio developers we provide directly provide [Onsen UI extension](https://taco.visualstudio.com/en-us/docs/tutorial-onsen).

## Getting Started Using Monaca

[Monaca](https://monaca.io/) is a set of tools that makes hybrid mobile app development with PhoneGap/Cordova simple and easy: debugging suite, push notifications, remote build, back-end, encryption, version control and more. See the [Onsen UI Getting Started Page](http://onsen.io/getting_started/) for more information.

```
$ [sudo] npm -g install monaca
$ monaca create helloworld # And choose the starter template
$ cd helloworld # Switch to the directory
$ monaca preview # Preview on the browser
$ monaca debug # Preview on the real device
```

## Download Onsen UI

The distribution repository is located [here](https://github.com/OnsenUI/OnsenUI-dist). React Components for Onsen UI are distributed separately in [this other repo](https://github.com/OnsenUI/react-onsenui).

Onsen UI is available with npm, bower or jspm. Example:

```bash
$ npm install onsenui
```

For React:

```bash
$ npm install react-onsenui
```

For an example that uses React, Redux and Webpack you can check out our [Weather app sample](https://github.com/argelius/react-onsenui-redux-weather). Try the [demo here](http://argelius.github.io/react-onsenui-redux-weather/demo.html).

For Angular2:

```bash
$ npm install angular2-onsenui
```

## Download the latest build

A new build is generated every time the code changes. It can be downloaded on [this page](http://onsen.io/download.html#latest-build).

Please use this with caution. However, we are very grateful if people try it out so we can find bugs and things to improve before the sharp releases.

## How to manually build this project

Clone this repository and run the following commands to build the project:

```bash
$ npm install
$ gulp build
```

The files will be built and copied into **build** folder.

## Running Examples

```bash
$ gulp serve
```

* Then navigate your browser to [http://0.0.0.0:3000/examples/index.html](http://0.0.0.0:3000/examples/index.html)

## Running the test suite

Onsen UI has unit tests for the Web Components as well as end-to-end testing of the AngularJS directives using Protractor.

Use the following commands to run the unit tests:

```bash
$ npm install
$ gulp core-test
```

or these commands for the protractor tests:

```bash
$ npm install
$ gulp e2e-test
```

It will take some time the because it will download a stand-alone Selenium Server and a Chrome webdriver the first time it's executed.

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

```bash
$ gulp e2e-test --specs test/e2e/lazyRepeat/scenarios.js
```

In order to run both the unit tests and the end-to-end tests use the following command:

```bash
$ gulp test
```

## How to contribute

Please see our [document on contributing](https://github.com/OnsenUI/OnsenUI/blob/master/CONTRIBUTING.md). See the full list of contributors [here](https://github.com/OnsenUI/OnsenUI/blob/master/CONTRIBUTORS.md).

## Getting support

If anything about Onsen UI is unclear, please ask a question on our [community forum](https://community.onsen.io/) or <a href="http://stackoverflow.com" target="_blank">Stackoverflow</a> and tag it "onsen-ui".

You can also join our [Gitter channel](https://gitter.im/OnsenUI/OnsenUI) if you want to talk directly to the dev team.

If you have any requests or comments regarding the development of Onsen UI, please feel free to direct them to the Twitter account (<a href="http://twitter.com/Onsen_UI" target="_blank">@Onsen_UI</a>).

[Onsen UI](https://onsen.io/) - [Monaca](http://monaca.io/)
