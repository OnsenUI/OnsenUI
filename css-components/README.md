# Onsen CSS Components

Onsen CSS Components is CSS components for Cordova Apps.

## How to Build

This CSS components is built by PostCSS + cssnext. You can build with following commands.

```
$ yarn install
$ gulp build
```

## How to Customize Components

Execute the following command. When this command is executed, a preview of the CSS components is displayed in the browser.

```
$ gulp serve
```

If you edit the cssnext files under the `src` directory, the cssnext files is automatically built into the CSS and the browser is reloaded. The built CSS file is located in `../build/css/onsen-css-components.css`.

