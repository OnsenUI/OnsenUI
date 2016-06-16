document.addEventListener('DOMContentLoaded', function (event) {

    var OnsTabbarElementLastLink = window.OnsTabbarElement.rewritables.link;
    window.OnsTabbarElement.rewritables.link = function (element, target, options, callback) {
        window.vuejs.$compile(target);
        element.querySelector(".ons-tab-bar__content").appendChild(target);
        OnsTabbarElementLastLink(element, target, options, callback);
    };

    var OnsTabbarElementLastUnlink = window.OnsTabbarElement.rewritables.unlink;
    window.OnsTabbarElement.rewritables.unlink = function (tabbarElement, target, callback) {
        element.querySelector(".ons-tab-bar__content").html('');
        OnsTabbarElementLastUnlink(tabbarElement, target, callback);
    };

    var OnsNavigatorElementLastLink = window.OnsNavigatorElement.rewritables.link;
    window.OnsNavigatorElement.rewritables.link = function (element, target, options, callback) {
        window.vuejs.$compile(target);
        OnsNavigatorElementLastLink(element, target, options, callback);
    };

    var OnsSplitterContentElementLastLink = window.OnsSplitterContentElement.rewritables.link;
    window.OnsSplitterContentElement.rewritables.link = function (element, target, options, callback) {
        window.vuejs.$compile(target);
        OnsSplitterContentElementLastLink(element, target, options, callback);
    };

    var OnsSplitterSideElementLastLink = window.OnsSplitterSideElement.rewritables.link;
    window.OnsSplitterSideElement.rewritables.link = function (element, target, options, callback) {
        window.vuejs.$compile(target);
        OnsSplitterSideElementLastLink(element, target, options, callback);
    };

});