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

Click [Here](http://onsen.io/guide/components.html) to see Onsen UI in action!

## What's Included

* [AngularJS](angularjs.org): for directives
* [Topcoat](topcoat.io): for fast UI css
* [HammerJS](http://eightmedia.github.io/hammer.js/): for touch, swipe handling
* [Font Awesome](http://fontawesome.io/): for icons

## Getting Started Using Templates

See [getting started](http://onsen.io/getting_started/) page.

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

## How to contribute

We will happily accept contributions to Onsen UI. It can be both fixes for bugs or typos or even new features that extend Onsen UI.

The basic workflow when making contributions is the following:

* [Fork](https://github.com/OnsenUI/OnsenUI/fork) the repository
* Commit your changes
* Make a [pull request](https://help.github.com/articles/using-pull-requests) to **master** branch.

After you've made a pull request we will review it. If everything is fine and we like the change the contribution will be pulled into the main Onsen UI repository. In the case where there are some issues with the code or we disagree with how it's been implemented we will describe the issues in the comments so they can be corrected.

### Code style

There are some things to keep in mind when making code contributions to Onsen UI. The code must adhere to the general code style used.

Here is a list of some rules that should be followed:

* Code should be properly indented. Onsen UI uses two-space indentation in both HTML and JavaScript. Please don't use tabs for indentation.
* Separate binary operators with spaces: `var x = 1+1` is incorrect, it should be written as: `var x = 1 + 1`.
* `if`, `while`, `for`, etc. should be separated from the paranthesis with a space.
* Use easy-to-understand and logical naming for your variables and method names, especially for variables and methods that are exposed to the user.
* Internal APIs should be preceded by an underscore.
* Use single quotes for strings in JavaScript and double quotes for attributes in HTML.

## Getting support

If anything about Onsen UI is unclear, please ask a question on <a href="http://stackoverflow.com" target="_blank">Stackoverflow</a>, and tag it "onsenui".  An Onsen UI support engineer will answer it.
	
If you have any requests or comments regarding the development of Onsen UI, please feel free to direct them to the Twitter account (<a href="http://twitter.com/Onsen_UI" target="_blank">@Onsen_UI</a>).


[Onsen UI]:http://onsen.io/
[Onsen UI Getting Started Page]:http://onsen.io/getting_started/
[Monaca Forum]:http://monaca.mobi/forum
[Monaca IDE]:http://monaca.mobi/
