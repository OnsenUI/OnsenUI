(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/componentDialog.html",
    "<div class=\"popup-dialog-mask uninitialized\" ng-show=\"componentDialog.isShown\" ng-click=\"componentDialog.hide()\"></div>\n" +
    "<div class=\"dialog-container uninitialized component-dialog-container\" ng-show=\"componentDialog.isShown\">\n" +
    "  <div class=\"popup-dialog component-dialog\" ng-show=\"componentDialog.isShown\">\n" +
    "    <img src=\"/images/close.png\" class=\"close\" ng-click=\"componentDialog.hide()\">\n" +
    "\n" +
    "    <h2>{{componentDialog.name}}{{\"T_COMPONENT_SNIPPET\"|translate}}</h2>\n" +
    "\n" +
    "    <div class=\"component-dialog-content\">\n" +
    "      <div class=\"preview-container\">\n" +
    "        <h3 translate>T_PREVIEW</h3>\n" +
    "        <div class=\"preview\">\n" +
    "          <component-iframe html=\"componentDialog.html\" css=\"componentDialog.css\" prepend-css=\"componentDialog.prependCss\"></component-iframe>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"html-container\">\n" +
    "        <h3>HTML</h3><a id=\"html-copy\" class=\"copy\" translate>T_COPY</a>\n" +
    "        <div class=\"codemirror-container\" data-lang=\"html\" data-name=\"htmlEditor\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"css-container\">\n" +
    "        <h3>CSS</h3><a id=\"css-copy\" class=\"copy\" translate>T_COPY</a>\n" +
    "        <div class=\"codemirror-container\" data-lang=\"css\" data-name=\"cssEditor\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.codemirror-container').each(function() {\n" +
    "      var mirror = CodeMirror(this, {\n" +
    "        lineNumbers: true,\n" +
    "        mode: 'text/' + $(this).data('lang'),\n" +
    "        value: $(this).text().trim(),\n" +
    "        lineWrapping: true\n" +
    "      });\n" +
    "\n" +
    "      var name = $(this).data('name');\n" +
    "      window[name] = mirror;\n" +
    "    });\n" +
    "\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/components.html",
    "\n" +
    "<div id=\"components-container\" ng-controller=\"ComponentsController\">\n" +
    "\n" +
    "  <style class=\"generated-css\"></style>\n" +
    "\n" +
    "  <ul id=\"components\">\n" +
    "    <li ng-repeat=\"component in components\">\n" +
    "      <h3><label>\n" +
    "          <input type=\"checkbox\" name=\"component-varname-highlight\" ng-model=\"component.checked\" ng-change=\"updateVarNamesHighlight()\">{{component.name}}\n" +
    "      </label></h3>\n" +
    "      <div class=\"component-preview\" ng-click=\"componentDialog.show(component)\">\n" +
    "        <div class=\"component-preview-mask\"></div>\n" +
    "        <component-element html=\"component.html\"></component-element>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/guidePopup.html",
    "<div class=\"guide-mask right-position uninitialized\" ng-show=\"guide.index == 1\" style=\"right: 254px; top: 183px;\"></div>0\n" +
    "<div class=\"popup-container left-bottom-position\" style=\"left: auto; right: 254px; top: 203px;\" ng-show=\"guide.index == 1\">\n" +
    "  <div class=\"popup\" ng-show=\"guide.index == 1\">\n" +
    "\n" +
    "    <h2 translate>T_GUIDE1_TITLE</h2>\n" +
    "\n" +
    "    <p translate>T_GUIDE1_DESC</p>\n" +
    "\n" +
    "    <footer><button class=\"site-button right-button\" ng-click=\"guide.next()\"><strong translate>T_NEXT</strong></button></footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"guide-mask right-position uninitialized\" ng-show=\"guide.index == 2\" style=\"right: 34px; top: 360px;\"></div>\n" +
    "<div class=\"popup-container left-bottom-position\" style=\"right: 34px; top: 380px;\" ng-show=\"guide.index == 2\">\n" +
    "  <div class=\"popup\" ng-show=\"guide.index == 2\">\n" +
    "\n" +
    "    <h2 translate>T_GUIDE2_TITLE</h2>\n" +
    "\n" +
    "    <p translate>T_GUIDE2_DESC</p>\n" +
    "\n" +
    "    <footer><button class=\"site-button right-button\" ng-click=\"guide.next()\"><strong translate>T_NEXT</strong></button></footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"guide-mask left-position uninitialized\" ng-show=\"guide.index == 3\" style=\"left: 560px; top: 36px;\"></div>\n" +
    "<div class=\"popup-container right-bottom-position\" style=\"left: 560px; top: 66px;\"ng-show=\"guide.index == 3\">\n" +
    "  <div class=\"popup\" ng-show=\"guide.index == 3\">\n" +
    "\n" +
    "    <h2 translate>T_GUIDE3_TITLE</h2>\n" +
    "\n" +
    "    <p translate>T_GUIDE3_DESC</p>\n" +
    "\n" +
    "    <footer><button class=\"site-button right-button\" ng-click=\"guide.next()\"><strong translate>T_NEXT</strong></button></footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"guide-mask right-position uninitialized\" ng-show=\"guide.index == 4\" style=\"right: 380px; top: 113px;\"></div>\n" +
    "<div class=\"popup-container left-bottom-position\" style=\"right: 330px; top: 133px;\" ng-show=\"guide.index == 4\">\n" +
    "  <div class=\"popup\" ng-show=\"guide.index == 4\">\n" +
    "\n" +
    "    <h2 translate>T_GUIDE4_TITLE</h2>\n" +
    "\n" +
    "    <p translate>T_GUIDE4_DESC</p>\n" +
    "\n" +
    "    <footer><button class=\"site-button right-button\" ng-click=\"guide.next()\"><strong translate>T_NEXT</strong></button></footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"guide-mask left-position last-guide-mask uninitialized\" ng-show=\"guide.index == 5\" style=\"left: 195px; top: 113px;\"></div>\n" +
    "<div class=\"popup-container right-bottom-position\" style=\"left: 195px; top: 133px;\" ng-show=\"guide.index == 5\">\n" +
    "  <div class=\"popup\" ng-show=\"guide.index == 5\">\n" +
    "\n" +
    "    <h2 translate>T_GUIDE5_TITLE</h2>\n" +
    "\n" +
    "    <p translate>T_GUIDE5_DESC</p>\n" +
    "\n" +
    "    <footer><button class=\"site-button right-button\" ng-click=\"guide.hide(); showNewsletterPopup();\"><strong>OK</strong></button></footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/htmlDialog.html",
    "<div class=\"popup-dialog-mask uninitialized\" ng-show=\"htmlDialog.isShown\" ng-click=\"htmlDialog.hide()\"></div>\n" +
    "<div class=\"dialog-container uninitialized html-dialog-container\" ng-show=\"htmlDialog.isShown\">\n" +
    "  <div class=\"popup-dialog html-dialog\" ng-show=\"htmlDialog.isShown\">\n" +
    "    <img src=\"/images/close.png\" class=\"close\" ng-click=\"htmlDialog.hide()\">\n" +
    "\n" +
    "    <h2>HTML &amp; CSS <a ng-click=\"htmlDialog.popup()\" translate>T_SHOW_IN_SEPARATE_WINDOW</a></h2>\n" +
    "\n" +
    "    <div class=\"html-container\">\n" +
    "      <div class=\"codemirror-container\" data-lang=\"html\" data-name=\"htmlDialogEditor\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"css-container\">\n" +
    "      <div class=\"codemirror-container\" data-lang=\"css\" data-name=\"cssDialogEditor\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/newsletterPopup.html",
    "\n" +
    "<div class=\"popup-container newsletter-popup-container left-top-position\" ng-show=\"newsletterPopup.isShown\">\n" +
    "  <div class=\"popup\" ng-show=\"newsletterPopup.isShown\">\n" +
    "    <img src=\"/images/close.png\" class=\"close\" ng-click=\"newsletterPopup.hide()\">\n" +
    "\n" +
    "    <h2 translate>T_SUBSCRIBE_NEWSLETTER_TITLE</h2>\n" +
    "\n" +
    "    <div class=\"message\"><p translate>T_SUBSCRIBE_NEWSLETTER_DESC</p></div>\n" +
    "\n" +
    "    <div class=\"subscribe-form highlight-content\" style=\"text-align: center\" ng-show=\"newsletterPopup.emailSent\">Thank You!</div>\n" +
    "\n" +
    "    <div class=\"subscribe-form highlight-content\" ng-hide=\"newsletterPopup.emailSent\">\n" +
    "      <form name=\"mc-embedded-subscribe-form\" class=\"validate\" target=\"_blank\" novalidate style=\"text-align: center\" ng-submit=\"newsletterPopup.sendEmail()\">\n" +
    "        <input type=\"email\" name=\"EMAIL\" id=\"newsletter-email\" placeholder=\"your@email.address\" class=\"site\" style=\"width: 300px;\" ng-model=\"newsletterPopup.email\">\n" +
    "        <button class=\"site-button\" type=\"submit\" ng-click=\"newsletterPopup.sendEmail()\" translate>T_SEND</button>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/overview.html",
    "<div id=\"overview-inspecter-container\">\n" +
    "  <a ng-click=\"inspector.show()\"><img src=\"/images/inspect.png\"></a> <a ng-click=\"inspector.show()\" translate>T_FIND_COMPONENT</a>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"overview-container\">\n" +
    "  <ul id=\"overview\">\n" +
    "    <li ng-repeat=\"pattern in patterns\" ng-init=\"pattern.src = 'patterns/' + pattern.name + '.html'\">\n" +
    "    <h3>{{pattern.displayName}} <a ng-click=\"htmlDialog.show(pattern.src)\" style=\"float:right\" translate>T_SHOW_HTML</a></h3>\n" +
    "      <div class=\"pattern\" ng-class=\"{inspecting: inspector.isShown}\">\n" +
    "        <div class=\"inspector-mask\" pattern-inspector ng-show=\"inspector.isShown\" ng-class=\"{inspecting: inspector.isShown}\">\n" +
    "          <div class=\"inspector-highlight\" ng-click=\"showComponentDialog()\"><div class=\"label\"></div></div>\n" +
    "        </div>\n" +
    "        <div class=\"pattern-mask\" ng-hide=\"pattern.isLoaded\"></div>\n" +
    "        <iframe ng-src=\"{{pattern.src}}\" ng-class=\"{inspecting: inspector.isShown}\" pattern-iframe pattern-on-load=\"pattern.isLoaded = true\"></iframe>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/shareDialog.html",
    "<div class=\"popup-dialog-mask uninitialized\" ng-show=\"shareDialog.isShown\" ng-click=\"shareDialog.hide()\"></div>\n" +
    "<div class=\"dialog-container share-dialog-container\" ng-show=\"shareDialog.isShown\">\n" +
    "  <div class=\"popup-dialog share-dialog\" ng-show=\"shareDialog.isShown\">\n" +
    "    <img src=\"images/close.png\" class=\"close\" ng-click=\"shareDialog.hide()\">\n" +
    "\n" +
    "    <h2 translate>T_SHARE_TITLE</h2>\n" +
    "\n" +
    "    <div class=\"side-image-container\"><img src=\"/images/onsenui-logo.png\"></div>\n" +
    "\n" +
    "    <p translate>T_SHARE_DESC</p>\n" +
    "\n" +
    "    <div class=\"highlight-content\">\n" +
    "\n" +
    "      <div><input type=\"text\" class=\"site\" style=\"width: 350px; \" value=\"{{shareDialog.shareURL}}\"> <button class=\"site-button\" id=\"url-share-button\" translate>T_COPY</button></div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div style=\"margin-top: 8px; text-align: center; height: 32px;\">\n" +
    "      <span id=\"twitter-share-box\" style=\"width: 90px; overflow: hidden; display: inline-block;\"></span>\n" +
    "      <span id=\"facebook-share-box\" style=\"vertical-align: top; display: inline-block;\"></span>\n" +
    "      <span id=\"gplus-share-box\" style=\"display: inline-block; margin-top: -1px; margin-left: 14px !important; vertical-align: top !important;\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <footer translate>T_TEASING_LINK</footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/thankyouDialog.html",
    "<div class=\"popup-dialog-mask uninitialized\" ng-show=\"thankyouDialog.isShown\" ng-click=\"thankyouDialog.hide()\"></div>\n" +
    "<div class=\"dialog-container thankyou-dialog-container\" ng-show=\"thankyouDialog.isShown\">\n" +
    "  <div class=\"popup-dialog thankyou-dialog\" ng-show=\"thankyouDialog.isShown\">\n" +
    "    <img src=\"/images/close.png\" class=\"close\" ng-click=\"thankyouDialog.hide()\">\n" +
    "\n" +
    "    <h2>\n" +
    "      <span translate>T_DOWNLOAD_TITLE</span>\n" +
    "      <iframe id=\"download-iframe\" width=\"1\" height=\"1\" style=\"opacity: 0.01\"></iframe>\n" +
    "    </h2>\n" +
    "\n" +
    "    <div class=\"downloading\">\n" +
    "      <p translate>T_DOWNLOADING</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"side-image-container\">\n" +
    "      <img src=\"/images/onsenui-logo.png\">\n" +
    "    </div>\n" +
    "\n" +
    "    <h3 translate>T_SUBSCRIBE_NEWSLETTER_DESC</h3>\n" +
    "\n" +
    "    <p translate>\n" +
    "      T_DOWNLOAD_DESC\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"highlight-content\" style=\"text-align: center\" ng-show=\"thankyouDialog.emailSent\">Thank You!</div>\n" +
    "\n" +
    "    <div class=\"highlight-content\" ng-hide=\"thankyouDialog.emailSent\" style=\"ng-click\">\n" +
    "      <form novalidate ng-submit=\"thankyouDialog.sendEmail()\">\n" +
    "        <input type=\"email\" class=\"site\" name=\"EMAIL\" ng-model=\"thankyouDialog.email\" placeholder=\"your@email.address\" style=\"width: 240px;\">\n" +
    "        <button class=\"site-button\" ng-click=\"thankyouDialog.sendEmail()\" translate>T_SEND</button>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("template"); }
catch(err) { app = angular.module("template", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/welcomeDialog.html",
    "<div class=\"dialog-container uninitialized welcome-dialog-container\" ng-show=\"welcomeDialog.isShown\">\n" +
    "  <div class=\"popup-dialog welcome-dialog\" ng-show=\"welcomeDialog.isShown\">\n" +
    "    <img src=\"/images/close.png\" class=\"close\" ng-click=\"welcomeDialog.hide()\">\n" +
    "\n" +
    "    <h2 translate>T_WELCOME_TITLE</h2>\n" +
    "\n" +
    "    <div class=\"welcome-text\" translate>T_WELCOME_DESC</div>\n" +
    "    <img src=\"/images/guide-screenshot.png\">\n" +
    "\n" +
    "    <footer style=\"margin-top: 10px;\">\n" +
    "      <button class=\"site-button right-button\" style=\"background-color: #3d4957; color: #fff;\" ng-click=\"welcomeDialog.hide(); guide.start();\"><strong>OK</strong></button>\n" +
    "      <button class=\"site-button\" ng-click=\"welcomeDialog.hide()\" translate>T_NO_THANKS</button>\n" +
    "    </footer>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"guide-mask uninitialized no-animate\" ng-show=\"welcomeDialog.isShown\" ng-click=\"welcomeDialog.hide()\"></div>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() {\n" +
    "    $('.uninitialized').removeClass('uninitialized');\n" +
    "  });\n" +
    "</script>\n" +
    "");
}]);
})();
