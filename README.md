# Onsen UI

Onsen UI is a Custom Elements-Based HTML5 UI Framework for BuildingYour Mobile Front End.

Onsen UI makes building applications simple basing on the concept of Web Components. Applications can be build using **HTML tags** web developers already know. It is built on top of heroic [AngularJS](http://angularjs.org/) and performance craving [Topcoat](http://topcoat.io/).

[Monaca IDE] fully supports Onsen UI plugin.

## Browser Support

Onsen UI is tested with the following browsers and mobile OS.

 * Android2.3.4+
 * iOS6+
 * Google Chrome
 * Safari

## Demo

Click [Here](http://onsenui.io/guide/components.html) to see Onsen UI in action!

## What's Included

* [AngularJS](angularjs.org): for directives
* [Topcoat](topcoat.io): for fast UI css
* [HammerJS](http://eightmedia.github.io/hammer.js/): for touch, swipe handling
* [Font Awesome](http://fontawesome.io/): for icons

## Getting Started Using Templates

See [getting started](http://onsenui.io/getting_started/) page.

## Getting Started Using Monaca

See the [Onsen UI Getting Started Page].

## How to build

* Clone this repository

        $ git clone https://github.com/monaca/OnsenUI.git

* Open the terminal from OnsenUI directory

        $ cd OnsenUI

* Install dependencies using [npm](http://nodejs.org/download/)

        $ npm install

* Install gulp (globally)

        $ [sudo] npm install -g gulp

* Type gulp to start building

        gulp build

The files will be built and copied into **build**, **demo/lib/onsen/**, and **app/lib/onsen/** folder.

## Running Demo

        $ npm install

        $ [sudo] npm install -g gulp

        $ gulp serve

* Then navigate your browser to [http://0.0.0.0:8000/demo/index.html](http://0.0.0.0:8000/demo/index.html)

## Developing your app

[Monaca IDE] makes it super easy to create Onsen UI project, but if you want to use other IDEs, we provide project templates for you in the `project_tempates` folder. You will see the instruction on how to run the project there.

## Documentation

See the current [Onsen UI docs].

## Developing Onsen UI

Run gulp task to develop Onsen UI itself with livereload.

    gulp serve

Access [http://0.0.0.0:8000/demo/index.html](http://0.0.0.0:8000/demo/index.html) and your code changes will be reloaded.

## Contributing

* Fill out the CLA [here](https://docs.google.com/forms/d/1ldg4_QReI2hC12HvF1OuDhW1QromvXat6kA4Uhdsw2M/viewform)
* Fork the repo
* Commit your changes
* Make a [pull request](https://help.github.com/articles/using-pull-requests) to **master** branch.

## Getting support

If anything about Onsen UI is unclear, please ask a question on <a href="http://stackoverflow.com" target="_blank">Stackoverflow</a>, and tag it "onsenui".  An Onsen UI support engineer will answer it.
	
If you have any requests or comments regarding the development of Onsen UI, please feel free to direct them to the Twitter account (<a href="http://twitter.com/Onsen_UI" target="_blank">@Onsen_UI</a>).


[Onsen UI]:http://onsenui.io/
[Onsen UI Getting Started Page]:http://onsenui.io/getting_started/
[Monaca Forum]:http://monaca.mobi/forum
[Monaca IDE]:http://monaca.mobi/
