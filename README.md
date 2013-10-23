# Onsen UI

Onsen UI is an HTML5 UI framework for building modern mobile applications.

Onsen UI makes building applications simple basing on the concept of Web Components. Applications can be build using **HTML tags** web developers already know. It is built on top of heroic [AngularJS](http://angularjs.org/) and performance craving [Topcoat](http://topcoat.io/).

[Monaca IDE] fully supports Onsen UI plugin.

## Demo

Click [Here](http://docs.monaca.mobi/onsen/) to see Onsen UI in action!

## Getting Started Using Monaca

See the [Onsen UI Getting Started Page].

## How to build

* Clone with submodule

        git clone https://github.com/monaca/OnsenUI.git --recursive

* Open the terminal from OnsenUI directory

        cd OnsenUI

* Install dependencies using [npm](http://nodejs.org/download/)

        npm install

* Install grunt-cli (globally)

        [sudo] npm install -g grunt-cli

* Type grunt to start building

        grunt

The files will be built and copied into **build**, **demo/lib/onsen/**, and **app/lib/onsen/** folder.

## Running Demo

* Run script

        scripts/web-server.js

* Then navigate your browser to [http://localhost:8000/demo/](http://localhost:8000/demo/index.html)

## Developing your app

[Monaca IDE] makes it super easy to create Onsen UI project, but if you want to use other IDEs, we provide a template in **app** folder for you to get started.

* Running the app by running the script

        scripts/web-server.js

* Then navigate your browser to [http://localhost:8000/app/](http://localhost:8000/app/index.html)

## Documentation

See the current [Onsen UI docs].

## Contributing

* Fill out the CLA [here](https://docs.google.com/forms/d/13e_me1JPJeG9PUJdnLxv2jEk5QPmFkZZft7Flm-gXSA/viewform)
* Fork the repo
* Commit your changes
* Make a [pull request](https://help.github.com/articles/using-pull-requests)

## Getting support

Ask a question using the "Onsen-UI" tag in [Monaca Forum].

[Onsen UI docs]:http://docs.monaca.mobi/onsen/docs/en/
[Monaca Forum]:http://monaca.mobi/forum
[Onsen UI Getting Started Page]:http://docs.monaca.mobi/onsen/getting_started/en/
[Monaca IDE]:http://monaca.mobi/
