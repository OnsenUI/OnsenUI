# Patch #2 (2024-04-10)
## Store page meta info of last loaded page


__Encountered problem__

When a page is loaded, additional meta info like file path can be very helpful, so this information should be provided.

__How to reproduce__

```js
document.addEventListener('init', function (event) {
    // The event only contains the element, but no other page details
});
```

__Solution__

```js
document.addEventListener('init', function (event) {
  console.log(ons._meta); // provies additional info
    //  {
    //      PageLoader: {
    //          page: "views/example.html", 
    //          parent: HTMLElement, 
    //          params: {}
    //      }
    // }
});
```



Done with commits:
* https://github.com/magynhard/OnsenUI/commit/b04374d9494c48b09235152aa2f6998a23e19685
