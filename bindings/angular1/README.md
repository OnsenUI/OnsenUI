# AngularJS bindings for Onsen UI

With Onsen UI you can create beautiful and performant hybrid apps that run on both Android and iOS. This package contains [AngularJS](https://angularjs.org/) bindings that make it easy to integrate the Onsen UI components in AngularJS apps.

For more information of what's included in Onsen UI please see:

* [Main repo](https://github.com/OnsenUI/OnsenUI)
* [Official website](https://onsen.io/)
* [Docs](https://onsen.io/v2/guide/angular1/)
* [Playground](https://onsen.io/playground/?framework=angular1&category=getting%20started&module=introduction)

## Installation

#### Package Manager (yarn, npm)

```
yarn add onsenui angularjs-onsenui --save
```

#### Direct download

Get `onsenui.js`, `onsenui.css` and `onsenui-css-components.css` from the [latest core release](https://github.com/OnsenUI/OnsenUI-dist/releases). You will also need `angularjs-onsenui.js` file from [this CDN link](https://unpkg.com/angularjs-onsenui) or `angularjs-onsenui.min.js` from [here](https://unpkg.com/angularjs-onsenui@latest/dist/angularjs-onsenui.min.js).

## Including AngularJS and Onsen UI

```html
<link rel="stylesheet" href="onsen-css-components.css">
<link rel="stylesheet" href="onsenui.css">

<script src="angular.min.js"></script>
<script src="onsenui.min.js"></script>
<script src="angularjs-onsenui.min.js"></script>
```

## Examples - Running the development server

The examples are located under `/bindings/angular1/examples` directory in the main repo.

You can serve these examples by running the development server. First you need to [build the main repo](https://github.com/OnsenUI/OnsenUI/blob/master/CONTRIBUTING.md#development-setup). When that is done you can run the following commands from `/bindings/angular1` directory:

```
yarn install
yarn run dev
```

This will open a development server with a kitchen sink app in `localhost:8080`.

Otherwise, have a look at the [playground](https://onsen.io/playground/?framework=angular1&category=getting%20started&module=introduction) for online examples.

## Support

If you need help using these bindings we recommend you to use [our forum](https://community.onsen.io/) to ask questions. We also have a [Discord chat](https://discordapp.com/invite/JWhBbnE).

If you find any bug or want to request features/API changes, please [open an issue](https://github.com/OnsenUI/OnsenUI/issues). Make sure to include all information necessary to reproduce it if you file a bug report.
