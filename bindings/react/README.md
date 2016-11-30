[![npm version](https://badge.fury.io/js/react-onsenui.svg)](https://badge.fury.io/js/react-onsenui)

# Onsen UI - React Components for Cordova/PhoneGap hybrid apps

**Make beautiful high performance hybrid mobile apps using HTML5, CSS and JavaScript. Includes Material Design for Android and flat design for iOS.**

[Onsen UI](https://onsen.io/2/) is a UI component library for hybrid mobile apps. It provides components for navigation, forms, tabs, Material Design, infinite lists and much more.

It can be used to build hybrid apps with [Cordova](https://cordova.apache.org/) and [PhoneGap](http://phonegap.com/) but can also run in the browser.

We have build a [Tutorial Website](http://tutorial.onsen.io/?framework=react&category=Getting%20started&module=Using%20the%20components) where you can see live examples of OnsenUI without installing it. If you find any issues, feel free to report at [our OpenSource Repository](https://github.com/OnsenUI/tutorial). Also pull requests are welcome.

To learn how to use these components, please refer to [the documentation](https://onsen.io/v2/docs/guide/react/index.html). You can also check out our [kitchensink example](https://github.com/OnsenUI/react-onsenui-kitchensink) to learn how to use this or you can [click here](http://onsenui.github.io/react-onsenui-kitchensink/demo.html) for a quick demo.

We also have a highly engaged [community](https://community.onsen.io/) that will be available to answer your questions.

The main [Onsen UI repo](https://github.com/OnsenUI/OnsenUI) contains the CSS and core JS library for these components. Please star it if you like it!

## Using Onsen UI with npm

The easiest way to use these components is by installing them through npm and using a CommonJS module system such as browserify and webpack (the kitchensink example above is using browserify).

You need to install `react`, `react-dom`, `onsenui` and `react-onsenui`. You probably also need to add [Babel](https://babeljs.io/) with the `react` preset.

Now you can import the necessary libraries in your code:

```jsx
var React = require('react');
var ReactDOM = require('react-dom');

require('onsenui'); // This needs to be imported to bootstrap the components.
var Ons = require('react-onsenui');

var MyPage = React.createClass({
  renderToolbar: function() {
    return (
      <Ons.Toolbar>
        <div className='center'>Onsen UI</div>
      </Ons.Toolbar>
    );
  }

  render: function() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <p>This is Onsen UI!</p>
      </Ons.Page>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
```

Take a look at the kitchensink example for more complex code.




**Make beautiful high performance hybrid mobile apps using HTML5, CSS and JavaScript. Includes Material Design for Android and flat design for iOS.**

[Onsen UI](https://onsen.io/2/) is a UI component library for hybrid mobile apps. It provides components for navigation, forms, tabs, Material Design, infinite lists and much more.

It can be used to build hybrid apps with [Cordova](https://cordova.apache.org/) and [PhoneGap](http://phonegap.com/) but can also run in the browser.

To learn how to use these components, please refer to [the documentation](https://onsen.io/v2/docs/guide/react/index.html). You can also check out our [kitchensink example](https://github.com/OnsenUI/react-onsenui-kitchensink) to learn how to use this or you can [click here](http://onsenui.github.io/react-onsenui-kitchensink/demo.html) for a quick demo.

The main [Onsen UI repo](https://github.com/OnsenUI/OnsenUI) contains the CSS and core JS library for these components. Please star it if you like it!

# Contribution

We always welcome contributions by either opening an issue or doing a pull request.

To test this repo in the current state of master, one needs to first clone this repo recursivly (it binds onsenui in a specific version) and run `npm install` in both the main folder and OnsenUI folder and finally build OnsenUI.

```bash
$ git clone --recursive git@github.com:OnsenUI/react-onsenui.git
$ npm install
$ cd OnsenUI; npm install
$ npm install -g gulp # install gulp if not already installed
$ gulp build
```

After these changes one can run our demo examples with `npm run dev` and open a brower at port 9000.



