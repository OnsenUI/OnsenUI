<p align="center"><a href="https://onsen.io/" target="_blank"><img width="220"src="https://onsenui.github.io/art/logos/onsenui-logo-1.png"></a></p>

<p align="center">
  <a href="https://gitter.im/OnsenUI/OnsenUI"><img src="https://badges.gitter.im/Join%20Chat.svg" alt="Gitter Chat"></a>
  <a href="https://community.onsen.io/"><img src="https://img.shields.io/badge/forum-onsen--ui-FF412D.svg" alt="Forum"></a>
  <a href="https://github.com/OnsenUI/OnsenUI/blob/master/core/src/onsenui.d.ts"><img src="http://definitelytyped.org/badges/standard.svg" alt="TypeScript definitions"></a>
  <br>
  <a href="https://circleci.com/gh/OnsenUI/OnsenUI"><img src="https://circleci.com/gh/OnsenUI/OnsenUI.svg?style=shield" alt="Circle CI"></a>
  <a href="https://coveralls.io/github/OnsenUI/OnsenUI?branch=master"><img src="https://coveralls.io/repos/OnsenUI/OnsenUI/badge.svg?branch=master&service=github" alt="Coverage Staus"></a>
  <a href="https://badge.fury.io/js/onsenui"><img src="https://badge.fury.io/js/onsenui.svg" alt="NPM version"></a>
  <a href="https://cdnjs.com/libraries/onsen"><img src="https://img.shields.io/cdnjs/v/onsen.svg" alt="CDNJS"></a>
</p>

# [Onsen UI](https://onsen.io/) - Cross-Platform HTML5 Hybrid App Framework

<p>Onsen UI is a library of UI components to help you create beautiful hybrid and mobile web apps for both Android and iOS using Javascript.</p>

<p align="center"><img height="500" src="https://onsenui.github.io/art/showcase/showcase-onsenui.gif" alt="Onsen UI Todo App"></p>

It is <strong>open source</strong> and designed to deliver native look and feel. Apps are made out of simple HTML tags, thus providing a gentle learning curve.

The core library is written in <strong>pure Javascript</strong> (on top of <a href="http://webcomponents.org/">Web Components</a>) and is <strong>framework agnostic</strong>, which means you can use it with your favorite framework and its tools. Currently, we provide some extra binding packages in order to __tailor Onsen UI's API__ for specific frameworks:

<table>
  <tbody><tr>
    <td align="center" width="150"><a href="https://onsen.io/react"><img src="https://onsen.io/images/common/icn_react_top.svg" height="40"><br><strong>React</strong></a></td>
    <td align="center" width="150"><a href="https://onsen.io/angular2"><img src="https://onsen.io/images/common/icn_angular2_top.svg" height="40"><br><strong>Angular 2+</strong></a><br></td>
    <td align="center" width="150"><a href="https://onsen.io/vue"><img src="https://onsen.io/images/common/icn_vuejs_top.svg" height="40"><br><strong>Vue</strong></a><br></td>
    <td align="center" width="150"><a href="https://onsen.io/v2/docs/guide/angular1/index.html"><img src="https://onsen.io/images/common/icn_angular1_top.svg" height="40"><br><strong>AngularJS 1.x</strong></a><br></td>
  </tr></tbody>
</table>

Some other frameworks are supported by __community__ packages (i.e. not tested or implemented by the core team): [Aurelia](https://www.npmjs.com/package/aurelia-onsenui), [EmberJS](https://www.npmjs.com/package/ember-onsenui).

Both <strong>iOS flat and Android's Material design</strong> are included. The components are optionally auto-styled based on the platform, which makes it possible to support both iOS and Android with the <strong>same source code</strong>.


## Getting started

We have several resources to help you get started creating hybrid apps with Onsen UI:

* __The official docs__: we provide guides and references for the [core library (vanilla JS or jQuery)](https://onsen.io/v2/docs/js.html) as well as the [Vue](https://onsen.io/v2/docs/guide/vue/index.html), [React](https://onsen.io/v2/docs/guide/react/index.html), [Angular2](https://onsen.io/v2/docs/guide/angular2/) and [AngularJS 1.x](https://onsen.io/v2/docs/guide/angular1/) components.
* __Components overview__: a [list of included CSS components](https://onsen.io/v2/docs/css.html) in both flat and Material Design. Note that these components are just pure and performant CSS without JavaScript behavior. Some extra details (such as dragging or ripple effect) are added by Onsen UI custom elements.
* __Playground__: an [interactive Onsen UI tutorial](https://tutorial.onsen.io/) is also available where you can learn how to use the library and play around with the components.
* __Blog__: there are lots of great tutorials and guides published in our [official Onsen UI blog](https://onsen.io/blog/categories/tutorial.html) and we are adding new content regularly.
* __Support__: if you are having trouble using some component the best place to get help is the [Onsen UI Forum](https://community.onsen.io/) or [Gitter chat](https://gitter.im/OnsenUI/OnsenUI). We are also available to answer short questions on Twitter at [@Onsen_UI](https://twitter.com/Onsen_UI).

## Onsen UI ecosystem

Because sometimes a UI framework may not be enough to make hybrid app development easily, Onsen UI comes with a __complete ecosystem__ of well integrated tools. Meet [__Monaca__](https://monaca.io/).

<p align="center"><a href="https://monaca.io" target="_blank"><img width="300"src="https://onsenui.github.io/art/logos/monaca-logo-2.png"></a></p>

Developed by the same team, __Monaca Platform__ is a toolkit that makes hybrid mobile app development with __PhoneGap / Cordova__ simple and easy: Onsen UI Cordova-like templates, debugging suite, push notifications, remote build, back-end solutions, encryption, version control, continuous integration and more. Furthermore, it provides multiple development environments with everything already configured and ready to go:

<p align="center">
  <a href="https://monaca.io/cloud.html"><strong>Cloud IDE</strong></a> -
  <a href="https://monaca.io/cli.html"><strong>Command Line Interface</strong></a> -
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

See the [Onsen UI Getting Started Page](http://onsen.io/v2/guide/) for more information.

## Examples with source code

There are lots of sample applications written using Onsen UI. __[Here are some examples](https://onsen.io/samples) with source code and tutorials__ to give you an idea of what kind of apps you can create.

<p align="center">
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

We have a [distribution repository](https://github.com/OnsenUI/OnsenUI-dist/releases) with changelog. Onsen UI is also available in __npm__, __bower__ and __jspm__. Example:

```bash
npm install onsenui
```

This downloads Onsen UI main library and AngularJS bindings. For other bindings, install also `react-onsenui`, `vue-onsenui` or `ngx-onsenui`.

* __Download or request from a CDN__

You can also take the necessary files from a CDN. Some of the options are [unpkg](https://unpkg.com/onsenui/), [jsDelivr](https://www.jsdelivr.com/package/npm/onsenui) and [cdnjs](https://cdnjs.com/libraries/onsen).


* __Get the latest development build__

Optionally, you can download the [latest development build here](https://onsenui.github.io/latest-build). Be careful, usually everything there is already tested but it might be unstable sometimes.


## Contribution

We welcome your contribution, no matter how big or small! Please have a look at the [contribution guide](https://github.com/OnsenUI/OnsenUI/blob/master/.github/CONTRIBUTING.md) for details about project structure, development environment, test suite, code style, etc. All the version updates are mentioned in the [changelog](https://github.com/OnsenUI/OnsenUI/blob/master/CHANGELOG.md).
