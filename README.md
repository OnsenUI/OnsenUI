# Onsen UI - Cross-platform HTML5 Mobile App Framework

Onsen UI is a library of UI components to help you create beautiful hybrid and mobile web apps for both Android and iOS using Javascript.

[![Join us on Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OnsenUI/OnsenUI)
[![Forum](https://img.shields.io/badge/forum-onsen--ui-FF412D.svg )](https://community.onsen.io/)
[![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard.svg)](https://github.com/OnsenUI/OnsenUI/blob/master/core/src/onsenui.d.ts)
[![Circle CI](https://circleci.com/gh/OnsenUI/OnsenUI.svg?style=shield)](https://circleci.com/gh/OnsenUI/OnsenUI) 
[![Coverage Status](https://coveralls.io/repos/OnsenUI/OnsenUI/badge.svg?branch=master&service=github)](https://coveralls.io/github/OnsenUI/OnsenUI?branch=master)
[![npm version](https://badge.fury.io/js/onsenui.svg)](https://badge.fury.io/js/onsenui)

![Onsen UI Todo App](https://cloud.githubusercontent.com/assets/6549462/17845137/8224b696-687a-11e6-8f7b-95b7e8f20f2d.gif)

The core library is written in pure Javascript and is framework agnostic which means you can use it with your favorite frameworks such as:

* [React](https://onsen.io/react)
* [Angular2](https://onsen.io/angular2)
* [AngularJS 1.x](https://onsen.io/v2/docs/guide/angular1/index.html)
* [Vue.js (WIP)](https://github.com/OnsenUI/OnsenUI/tree/master/bindings/vue)

Onsen UI provides styles for both iOS flat design and Android's Material Design. The components will be automatically styled based on the platform which makes it possible to support both iOS and Android with the same source code.

## Getting started

We have several resources to help you get started creating hybrid apps with Onsen UI:

* [The official docs](https://onsen.io/v2/docs/js.html) provide [reference for the core library](https://onsen.io/v2/docs/js.html) as well as the [React](https://onsen.io/v2/docs/guide/react/index.html), [Angular2](https://onsen.io/v2/docs/guide/angular2/) and [AngularJS 1.x](https://onsen.io/v2/docs/guide/angular1/) components.
* We have an [interactive Onsen UI tutorial](https://onsen.io/tutorial/) where you can learn how to use the library and play around with the components.
* There are lots of great tutorials and guides published in our [official Onsen UI blog](https://onsen.io/blog/categories/tutorial.html) and we are adding new content regularly. 

## Support

If you are having trouble using some component the best place to get help is the [Onsen UI Forum](https://community.onsen.io/). We are also available to answer short questions on Twitter at [@Onsen_UI](https://twitter.com/Onsen_UI).

## Examples with source code

There are lots of sample applications written using Onsen UI. Here are some examples to give you an idea of what kind of apps you can create:

### [Real time React Chat App with OnsenUI and Horizon!](http://tutorials.pluralsight.com/html-css/real-time-chat-app-with-onsenui-and-horizon)

![Real time chat app](https://cloud.githubusercontent.com/assets/6549462/17846103/8acd4b8a-6881-11e6-86b8-1337183e3d09.png)

[Download source code](https://github.com/philolo1/Horizon-Chat-MobX-OnsenUI)

### [Weather application using React, Redux and Webpack](https://onsen.io/blog/cordova-hybrid-app-with-react-redux-webpack/)

![Weather application](https://cloud.githubusercontent.com/assets/6549462/17846106/8b0ceb96-6881-11e6-8da0-14ff78047647.png)

[Download source code](https://onsen.io/blog/cordova-hybrid-app-with-react-redux-webpack/)

### [Todo application in pure Javascript](https://onsen.io/blog/auto-style-app-onsen/)

![Todo application](https://cloud.githubusercontent.com/assets/6549462/17846105/8aedd1fc-6881-11e6-9c26-44289b0451f9.png)

[Download source code](https://github.com/frankdiox/OnsenUI-Todo-App)

## What is Onsen UI?

* **Open source**, free and open for all. It's designed and implemented to deliver unprecedented user interface and user experience for your mobile and hybrid apps. Onsen UI is built on top of Web Components so applications can be built using **HTML tags** web developers already know and love.

* **Framework agnostic**. This means that it can be used with whatever front-end framework you prefer. However, it also provides a binding library for [**Angular 1 & 2**](https://angularjs.org/) which makes it easy to integrate our custom tags with these frameworks. [**React Components** for Onsen UI](https://onsen.io/react) are also available and they play really well with React tooling such as [React Hot Loader](https://github.com/gaearon/react-hot-loader), [Redux](https://github.com/reactjs/redux) or [MobX](https://github.com/mobxjs/mobx).

* Completely integrated with Monaca kit, a complete set of tools that makes PhoneGap/Cordova development super simple. **Monaca CLI** provides **Onsen UI templates, device debugger, remote building** and any service you might need directly from your terminal. We also have [GUI and cloud alternatives](https://monaca.io/) if you prefer that over CLI.

* Beautifully made with **flat (iOS) and Material Design (Android)** flavors. It automatically styles your app depending on the platform and gives you control to customize it. Check out our [*Automatic Styling*](https://onsen.io/blog/auto-style-app-onsen/) in action. It also includes [Onsen CSS Components](http://components2.onsen.io/), a free resource of UI templates with "**theme roller**" functionality. Developers can pick and choose, grab the code they need, and they're off and running. And they can create their own templates and submit to Onsen UI to be included with other templates available.

* [**Fully documented**](https://onsen.io/v2/docs/js.html). And if you want even more, we provide an [**Interactive Tutorial**](http://tutorial.onsen.io) where you can try and modify examples, export your code online and even generate Cordova projects.

* Community based. Check out our [**blog**](https://onsen.io/blog/), [**forum**](https://community.onsen.io/) and [**chat**](https://gitter.im/OnsenUI/OnsenUI) to get the latest updates and directly contact the dev team. We are always very active answering questions so you don't get stuck with your apps.

## Browser Support

Onsen UI is tested with the following browsers and mobile OS.

 * Android 4.4+ (and Android 4.0+ with Crosswalk engine)
 * iOS8+
 * Windows Phone 10+
 * Google Chrome
 * Safari

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

Onsen UI is available with npm, bower or jspm. Example:

```bash
npm install onsenui
```

For React:

```bash
npm install react-onsenui
```

For Angular2:

```bash
$ npm install angular2-onsenui
```

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
