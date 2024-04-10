# Patch #1 (2024-02-15)
## Wrong page element returned, when inserting several pages

__Environment__

Onsen UI Version:
<!-- e.g. 2.9.2 -->
- 2.12.8

Framework:
<!-- e.g. Vue 2.5.0 -->
- JavaScript

Framework binding:
<!-- e.g. vue-onsenui 2.5.1 -->
- none

Additional libraries:
<!-- e.g. jQuery 3.3.1 -->
- none

Platform:
<!-- e.g. Android 8.1 Cordova, iOS 11.3 Safari, Windows 10 Chrome -->
- Windows 10 Chome

__Encountered problem__
<!-- Outline the behaviour you're seeing, and what you would expect to see -->

When inserting several Pages at the same time, the resolved Promise does not return the correct page elements.

__How to reproduce__
<!-- Write a detailed step-by-step on how to reproduce your issue -->

```js
['my-page-1.html', 'my-page-2.html', 'my-page-3.html'].forEach((page) => {
   document.querySelector('ons-navigator').insertPage(0, page).then((el) => {
     console.log(el); // always returns my-page-3
   });
})
```

The problem is, that the insertPage method return pages[index] instead of the actual page element. When pages are added at the "same" time, like a loop, then the last element "wins", as there is some delay between the promise resolving.




Fixed with commits:
* https://github.com/magynhard/OnsenUI/commit/5ead78980a432e35b91d62a59a288097299e6af1
