# Mithril bindings for Onsen UI

![Onsen UI Mithril](https://cloud.githubusercontent.com/assets/6549462/18077336/e982c922-6ebf-11e6-895d-232357ff8f8c.png)

With Onsen UI you can create beautiful and performant hybrid apps that run on both Android and iOS. This package contains [Mithril.js](https://mithriljs.org) v2 bindings and components that makes it easy to integrate the Onsen UI components in Mithril apps.

For more information of what's included in Onsen UI please see:

* [Main repo](https://github.com/OnsenUI/OnsenUI)
* [Official website](https://onsen.io/)
* [Docs](https://onsen.io/v2/guide/mithril/)
* [Playground](http://tutorial.onsen.io/?framework=mithril&category=reference&module=page)

## Installation

#### Package Manager (yarn, npm)

```
yarn add onsenui mithril-onsenui --save
```

#### Direct download

Get `onsenui.js`, `onsenui.css` and `onsenui-css-components.css` from the [latest core release](https://github.com/OnsenUI/OnsenUI-dist/releases). You will also need `mithril-onsenui.js` file from [this CDN link](https://unpkg.com/mithril-onsenui).

## Including Mithril.js and Onsen UI

#### ES6 imports and Webpack (with CSS imports)

```javascript
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import m from 'mithril';
import mOnsen from 'mithril-onsenui';

```

#### Direct include in index.html

```html
<link rel="stylesheet" href="onsen-css-components.css">
<link rel="stylesheet" href="onsenui.css">

<script src="mithril.js"></script>
<script src="onsenui.js"></script>
<script src="mithril-onsenui.js"></script>

<!-- Mithril.use(MithrilOnsen) is called automatically if window.Mithril is defined -->
```

## Examples - Running the development server

The examples are located under `/bindings/mithril/examples` directory in the main repo.

You can serve these examples by running the development server. First you need to [build the main repo](https://github.com/OnsenUI/OnsenUI#how-to-manually-build-this-project). When that is done you can run the following commands from `/bindings/mithril/` directory:

```
yarn install
yarn run dev
```

This will open a development server with a kitchen sink app in `localhost:8080`.

Otherwise, have a look at the [playground](https://tutorial.onsen.io/) for online examples.

## Support

If you need help using these bindings we recommend you to use [our forum](https://community.onsen.io/) to ask questions. We also have a [Gitter channel](https://gitter.im/OnsenUI/OnsenUI).

If you find any bug or want to request features/ API changes, please [open an issue](https://github.com/OnsenUI/OnsenUI/issues). Make sure to include all information necessary to reproduce it if you file a bug report.
