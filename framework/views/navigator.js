/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var TransitionAnimator = Class.extend({
    push: function(enterPage, leavePage, callback) {
      callback();
    },

    pop: function(enterPage, leavePage, callback) {
      callback();
    }
  });

  /**
   * Null animator do screen transition with no animations.
   */
  var NullTransitionAnimator = TransitionAnimator.extend({});

  /**
   * Lift screen transition.
   */
  var LiftTransitionAnimator = TransitionAnimator.extend({

    /** Black mask */
    backgroundMask : angular.element(
      '<div style="position: absolute; width: 100%;' +
      'height: 100%; background-color: black;"></div>'
    ),

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */
    push: function(enterPage, leavePage, callback) {
      var mask = this.backgroundMask.remove();
      leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0]);

      var maskClear = animit(mask[0])
        .wait(0.4)
        .queue(function(done) {
          mask.remove();
          done();
        });

      animit.runAll(

        maskClear,

        animit(enterPage.element[0])
          .queue({
            css: {
              transform: 'translate3D(0, 100%, 0)',
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
          .wait(0.4)
          .queue(function(done) {
            callback();
            done();
          }),

        animit(leavePage.element[0])
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, -10%, 0)',
              opacity: 0.9
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
      );

    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */
    pop: function(enterPage, leavePage, callback) {
      var mask = this.backgroundMask.remove();
      enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0]);

      animit.runAll(

        animit(mask[0])
          .wait(0.4)
          .queue(function(done) {
            mask.remove();
            done();
          }),

        animit(enterPage.element[0])
          .queue({
            css: {
              transform: 'translate3D(0, -10%, 0)',
              opacity: 0.9
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
          .wait(0.4)
          .queue(function(done) {
            callback();
            done();
          }),

        animit(leavePage.element[0])
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)'
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 100%, 0)'
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          
      );
    }
  });

  /**
   * Fade-in screen transition.
   */
  var FadeInTransitionAnimator = TransitionAnimator.extend({

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */
    push: function(enterPage, leavePage, callback) {

      animit.runAll(

        animit(enterPage.controller.getContentElement())
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            },
            duration: 0.4,
            timing: 'linear'
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          }),

        animit(enterPage.controller.getToolbarElement())
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            },
            duration: 0.4,
            timing: 'linear'
          })
          .resetStyle()
      );

    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} done
     */
    pop: function(enterPage, leavePage, callback) {
      animit.runAll(

        animit(leavePage.controller.getContentElement())
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            },
            duration: 0.4,
            timing: 'linear'
          })
          .queue(function(done) {
            callback();
            done();
          }),

        animit(leavePage.controller.getToolbarElement())
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            },
            duration: 0.4,
            timing: 'linear'
          })

      );
    }
  });

  /**
   * Slide animator for navigator transition.
   */
  var SimpleSlideTransitionAnimator = TransitionAnimator.extend({

    /** Black mask */
    backgroundMask : angular.element(
      '<div style="position: absolute; width: 100%;' +
      'height: 100%; background-color: black; opacity: 0;"></div>'
    ),

    timing: 'cubic-bezier(.1, .7, .4, 1)',
    duration: 0.3, 
    blackMaskOpacity: 0.4,

    init: function(options) {
      options = options || {};

      this.timing = options.timing || this.timing;
      this.duration = options.duration !== undefined ? options.duration : this.duration;
    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */
    push: function(enterPage, leavePage, callback) {
      var mask = this.backgroundMask.remove();
      leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0].nextSibling);

      animit.runAll(

        animit(mask[0])
          .queue({
            opacity: 0,
            transform: 'translate3d(0, 0, 0)'
          })
          .queue({
            opacity: this.blackMaskOpacity
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .queue(function(done) {
            mask.remove();
            done();
          }),

        animit(enterPage.element[0])
          .queue({
            css: {
              transform: 'translate3D(100%, 0, 0)',
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
            },
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle(),

        animit(leavePage.element[0])
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)'
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(-45%, 0px, 0px)'
            },
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .wait(0.2)
          .queue(function(done) {
            callback();
            done();
          })
      );
    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} done
     */
    pop: function(enterPage, leavePage, done) {
      var mask = this.backgroundMask.remove();
      enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0].nextSibling);

      animit.runAll(

        animit(mask[0])
          .queue({
            opacity: this.blackMaskOpacity,
            transform: 'translate3d(0, 0, 0)'
          })
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .queue(function(done) {
            mask.remove();
            done();
          }),

        animit(enterPage.element[0])
          .queue({
            css: {
              transform: 'translate3D(-45%, 0px, 0px)',
              opacity: 0.9
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle(),

        animit(leavePage.element[0])
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)'
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)'
            },
            duration: this.duration,
            timing: this.timing
          })
          .wait(0.2)
          .queue(function(finish) {
            done();
            finish();
          })
      );
    }
  });

  /**
   * Slide animator for navigator transition like iOS's screen slide transition.
   */
  var IOSSlideTransitionAnimator = TransitionAnimator.extend({

    /** Black mask */
    backgroundMask : angular.element(
      '<div style="position: absolute; width: 100%;' +
      'height: 100%; background-color: black; opacity: 0;"></div>'
    ),

    _decompose: function(page) {
      var elements = [];

      var left = page.controller.getToolbarLeftItemsElement();
      var right = page.controller.getToolbarRightItemsElement();

      var other = []
        .concat(left.children.length === 0 ? left : excludeBackButtonLabel(left.children))
        .concat(right.children.length === 0 ? right : excludeBackButtonLabel(right.children));


      var pageLabels = [
        page.controller.getToolbarCenterItemsElement(),
        page.controller.getToolbarBackButtonLabelElement()
      ];

      return {
        pageLabels: pageLabels,
        other: other,
        content: page.controller.getContentElement(),
        toolbar: page.controller.getToolbarElement(),
        bottomToolbar: page.controller.getBottomToolbarElement()
      };

      function excludeBackButtonLabel(elements) {
        var result = [];

        for (var i = 0; i < elements.length; i++) {
          if (elements[i].nodeName.toLowerCase() === 'ons-back-button') {
            result.push(elements[i].querySelector('.ons-back-button__icon'));
          } else {
            result.push(elements[i]);
          }
        }

        return result;
      }
    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */
    push: function(enterPage, leavePage, callback) {
      var mask = this.backgroundMask.remove();
      leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0].nextSibling);

      var enterPageDecomposition = this._decompose(enterPage);
      var leavePageDecomposition = this._decompose(leavePage);

      var delta = (function() {
        var rect = leavePage.element[0].getBoundingClientRect();
        return Math.round(((rect.right - rect.left) / 2) * 0.6);
      })();

      var maskClear = animit(mask[0])
        .queue({
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        })
        .queue({
          opacity: 0.1
        }, {
          duration: 0.4,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .resetStyle()
        .queue(function(done) {
          mask.remove();
          done();
        });

      var bothPageHasToolbar =
        enterPage.controller.hasToolbarElement() &&
        leavePage.controller.hasToolbarElement();

      var isToolbarNothing = 
        !enterPage.controller.hasToolbarElement() &&
        !leavePage.controller.hasToolbarElement();

      if (bothPageHasToolbar) {
        animit.runAll(

          maskClear,

          animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar])
            .queue({
              css: {
                transform: 'translate3D(100%, 0px, 0px)',
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)',
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(enterPageDecomposition.toolbar)
            .queue({
              css: {
                background: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)'
              },
              duration: 0
            })
            .wait(0.3)
            .resetStyle({
              duration: 0.1,
              transition:
                'background 0.1s linear, ' +
                'background-color 0.1s linear, ' + 
                'border-color 0.1s linear'
            }),

          animit(enterPageDecomposition.pageLabels)
            .queue({
              css: {
                transform: 'translate3d(' + delta + 'px, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(enterPageDecomposition.other)
            .queue({
              css: {opacity: 0},
              duration: 0
            })
            .queue({
              css: {opacity: 1},
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(-25%, 0px, 0px)',
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            }),

          animit(leavePageDecomposition.pageLabels)
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-' + delta + 'px, 0, 0)',
                opacity: 0,
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(leavePageDecomposition.other)
            .queue({
              css: {opacity: 1},
              duration: 0
            })
            .queue({
              css: {opacity: 0},
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle()

        );

      } else {

        animit.runAll(

          maskClear,

          animit(enterPage.element[0])
            .queue({
              css: {
                transform: 'translate3D(100%, 0px, 0px)',
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)',
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(leavePage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(-25%, 0px, 0px)'
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );

      }
    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} done
     */
    pop: function(enterPage, leavePage, done) {
      var mask = this.backgroundMask.remove();
      enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0].nextSibling);

      var enterPageDecomposition = this._decompose(enterPage);
      var leavePageDecomposition = this._decompose(leavePage);

      var delta = (function() {
        var rect = leavePage.element[0].getBoundingClientRect();
        return Math.round(((rect.right - rect.left) / 2) * 0.6);
      })();

      var maskClear = animit(mask[0])
        .queue({
          opacity: 0.1,
          transform: 'translate3d(0, 0, 0)'
        })
        .queue({
          opacity: 0
        }, {
          duration: 0.4,
          timing: 'cubic-bezier(.1, .7, .1, 1)'
        })
        .resetStyle()
        .queue(function(done) {
          mask.remove();
          done();
        });


      var bothPageHasToolbar =
        enterPage.controller.hasToolbarElement() &&
        leavePage.controller.hasToolbarElement();

      var isToolbarNothing = 
        !enterPage.controller.hasToolbarElement() &&
        !leavePage.controller.hasToolbarElement();

      if (bothPageHasToolbar || isToolbarNothing) {
        animit.runAll(

          maskClear,

          animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar])
            .queue({
              css: {
                transform: 'translate3D(-25%, 0px, 0px)',
                opacity: 0.9
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1.0
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(enterPageDecomposition.pageLabels)
            .queue({
              css: {
                transform: 'translate3d(-' + delta + 'px, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(enterPageDecomposition.toolbar)
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(enterPageDecomposition.other)
            .queue({
              css: {opacity: 0},
              duration: 0
            })
            .queue({
              css: {opacity: 1},
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar])
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(100%, 0px, 0px)'
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .wait(0)
            .queue(function(finish) {
              done();
              finish();
            }),

          animit(leavePageDecomposition.other)
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 0,
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            }),

          animit(leavePageDecomposition.toolbar)
            .queue({
              css: {
                background: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)'
              },
              duration: 0
            }),

          animit(leavePageDecomposition.pageLabels)
            .queue({
              css: {
                transform: 'translate3d(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(' + delta + 'px, 0, 0)',
                opacity: 0,
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
        );
      } else {

        animit.runAll(

          maskClear,

          animit(enterPage.element[0])
            .queue({
              css: {
                transform: 'translate3D(-25%, 0px, 0px)',
                opacity: 0.9
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1.0
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle(),

          animit(leavePage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(100%, 0px, 0px)'
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(finish) {
              done();
              finish();
            })
        );
      }
    }
  });

  var directives = angular.module('onsen');

  directives.factory('Navigator', function($http, $parse, $templateCache, $compile, $onsen) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class Navigator
     */
    var Navigator = Class.extend({

      /**
       * @member jqLite Object
       */
      _element: undefined,

      /**
       * @member {Array}
       */
      pages: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @member {DoorLock}
       */
      _doorLock: undefined,

      /**
       * @member {Boolean}
       */
      _profiling: false,

      /**
       * @param {Object} options
       * @param options.element jqLite Object to manage with navigator
       * @param options.scope Angular.js scope object
       */
      init: function(options) {
        options = options || options;

        this._element = options.element || angular.element(window.document.body);
        this._scope = options.scope || this._element.scope();
        this._doorLock = new DoorLock();
        this.pages = [];
      },

      /**
       * @param element jqLite Object
       * @return jqLite Object
       */
      _normalizePageElement: function(element) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].nodeType === 1) {
            return angular.element(element[i]);
          }
        }

        throw new Error('invalid state');
      },

      /**
       * Pushes the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {String} page
       * @param {Object} [options]
       * @param {String} [options.animation]
       * @param {TransitionAnimator} [options.animator]
       * @param {Function} [options.onTransitionEnd]
       */
      pushPage: function(page, options) {
        if (this._profiling) {
          console.time('pushPage');
        }

        options = options || {};

        if (options && typeof options != 'object') {
          throw new Error('options must be an objected. You supplied ' + options);
        }

        if (this._emitPrePushEvent()) {
          return;
        }

        options.animator = getAnimatorOption();

        var self = this;
        this._doorLock.waitUnlock(function() {
          var unlock = self._doorLock.lock();
          var done = function() {
            unlock();
            if (self._profiling) {
              console.timeEnd('pushPage');
            }
          };

          $onsen.getPageHTMLAsync(page).then(function(templateHTML) {
            var pageScope = self._createPageScope();
            var pageElement = createPageElement(templateHTML, pageScope);

            setImmediate(function() {
              self._pushPageDOM(page, pageElement, pageScope, options, done);
            });

          }, function() {
            unlock();
            if (self._profiling) {
              console.timeEnd('pushPage');
            }
            throw new Error('Page is not found: ' + page);
          });
        });

        function createPageElement(templateHTML, pageScope, done) {
          var div = document.createElement('div');
          div.innerHTML = templateHTML.trim();
          var pageElement = angular.element(div);

          var hasPage = div.childElementCount === 1 &&
            div.childNodes[0].nodeName.toLowerCase() === 'ons-page';
          if (hasPage) {
            pageElement = angular.element(div.childNodes[0]);
          } else {
            throw new Error('You can not supply no "ons-page" element to "ons-navigator".');
          }

          var element = $compile(pageElement)(pageScope);
          return element;
        }

        function getAnimatorOption() {
          var animator = null;

          if (options.animator instanceof TransitionAnimator) {
            return options.animator;
          }

          if (typeof options.animation === 'string') {
            animator = Navigator._transitionAnimatorDict[options.animation];
          }

          if (!animator) {
            animator = Navigator._transitionAnimatorDict['default'];
          }

          if (!(animator instanceof TransitionAnimator)) {
            throw new Error('"animator" is not an instance of TransitionAnimator.');
          }

          return animator;
        }
      },


      _createPageScope: function() {
         return this._scope.$new();
      },

      /**
       * @param {String} page Page name.
       * @param {Object} element Compiled page element.
       * @param {Object} pageScope
       * @param {Object} options
       * @param {Function} [unlock]
       */
      _pushPageDOM: function(page, element, pageScope, options, unlock) {
        if (this._profiling) {
          console.time('pushPageDOM');
        }
        unlock = unlock || function() {};
        options = options || {};
        element = this._normalizePageElement(element);

        var pageController = element.inheritedData('$onsPageController');
        if (!pageController) {
          throw new Error('Fail to fetch $onsPageController.');
        }

        var self = this;

        var pageObject = {
          page: page,
          name: page,
          element: element,
          pageScope: pageScope,
          controller: pageController,
          options: options,
          destroy: function() {
            pageObject.element.remove();
            pageObject.pageScope.$destroy();

            pageObject.controller = null;
            pageObject.element = null;
            pageObject.pageScope = null;
            pageObject.options = null;
          }
        };

        var event = {
          enterPage: pageObject,
          leagePage: this.pages[this.pages.length - 1],
          navigator: this
        };

        this.pages.push(pageObject);

        var done = function() {
          if (self.pages[self.pages.length - 2]) {
            self.pages[self.pages.length - 2].element.css('display', 'none');
          }

          if (self._profiling) {
            console.timeEnd('pushPageDOM');
          }

          unlock();

          self.emit('post-push', event);

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
        };

        if (this.pages.length > 1) {
          var leavePage = this.pages.slice(-2)[0];
          var enterPage = this.pages.slice(-1)[0];

          options.animator.push(enterPage, leavePage, done);
          this._element.append(element);

        } else {
          this._element.append(element);
          done();
        }
      },

      /**
       * @return {Boolean} Whether if event is canceled.
       */
      _emitPrePushEvent: function() {
        var isCanceled = false;
        var prePushEvent = {
          navigator: this,
          currentPage: this.getCurrentPage(),
          cancel: function() {
            isCanceled = true;
          }
        };

        this.emit('pre-push', prePushEvent);

        return isCanceled;
      },

      /**
       * @return {Boolean} Whether if event is canceled.
       */
      _emitPrePopEvent: function() {
        var isCanceled = false;
        var prePopEvent = {
          navigator: this,
          currentPage: this.getCurrentPage(),
          cancel: function() {
            isCanceled = true;
          }
        };

        this.emit('pre-pop', prePopEvent);

        return isCanceled;
      },

      /**
       * Pops current page from the page stack.
       * @param {Object} [options]
       * @param {Function} [options.onTransitionEnd]
       */
      popPage: function(options) {
        options = options || {};

        if (this.pages.length <= 1) {
          throw new Error('Navigator\'s page stack is empty.');
        }

        if (this._emitPrePopEvent()) {
          return;
        }

        var self = this;
        this._doorLock.waitUnlock(function() {
          var unlock = self._doorLock.lock();

          var leavePage = self.pages.pop();

          if (self.pages[self.pages.length - 1]) {
            self.pages[self.pages.length - 1].element.css('display', 'block');
          }

          var enterPage = self.pages[self.pages.length -1];

          var event = {
            leavePage: leavePage,
            enterPage: self.pages[self.pages.length - 1],
            navigator: self
          };

          var callback = function() {
            leavePage.destroy();
            unlock();
            self.emit('post-pop', event);
            if (typeof options.onTransitionEnd === 'function') {
              options.onTransitionEnd();
            }
          };
          leavePage.options.animator.pop(enterPage, leavePage, callback);
        });
      },

      /**
       * Clears page stack and add the specified pageUrl to the page stack.
       * If options object is specified, apply the options.
       * the options object include all the attributes of this navigator.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      resetToPage: function(page, options) {
        options = options || {};

        if (!options.animator && !options.animation) {
          options.animation = 'none';
        }

        var onTransitionEnd = options.onTransitionEnd || function() {};
        var self = this;

        options.onTransitionEnd = function() {
          while (self.pages.length > 1) {
            self.pages.shift().destroy();
          }
          onTransitionEnd();
        };

        this.pushPage(page, options);
      },

      /**
       * Get current page's navigator item.
       *
       * Use this method to access options passed by pushPage() or resetToPage() method.
       * eg. ons.navigator.getCurrentPage().options
       *
       * @return {Object} 
       */
      getCurrentPage: function() {
        return this.pages[this.pages.length - 1];
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this.pages;
      },

      /**
       * @return {Boolean}
       */
      canPopPage: function() {
        return this.pages.length > 1;
      },

      /**
       * Enable handler of  use Android's backbutton on this navigator.
       */
      enableAndroidBackButtonHandler: function() {
        if (this._androidBackButtonHandler) {
          this._androidBackButtonHandler = function(event) {
            if (this.pages.length > 1) {
              event.preventDefault();
              this.popPage();
            } else {
              navigator.app.exitApp();
            }
          }.bind(this);
        }

        var fn = this._androidBackButtonHandler;

        var doc = window.document;

        doc.addEventListener('backbutton', fn, false);
        doc.addEventListener('deviceready', function() {
          doc.removeEventListener('backbutton', fn);
          doc.addEventListener('backbutton', fn, false);
        }, false);
      },

      /**
       * Disable handler of Android's backbutton event on this navigator.
       */
      disableAndroidBackButtonHandler: function() {
        if (this._androidBackButtonHandler) {
          doc.addEventListener('backbutton', this._androidBackButtonHandler, false);
        }
      }
    });

    Navigator._transitionAnimatorDict = {
      'default': $onsen.isAndroid() ? new SimpleSlideTransitionAnimator() : new IOSSlideTransitionAnimator(),
      'slide': $onsen.isAndroid() ? new SimpleSlideTransitionAnimator() : new IOSSlideTransitionAnimator(),
      'lift': new LiftTransitionAnimator(),
      'fadein': new FadeInTransitionAnimator(),
      'none': new NullTransitionAnimator()
    };

    /**
     * @param {String} name
     * @param {TransitionAnimator} animator
     */
    Navigator.registerTransitionAnimator = function(name, animator) {
      if (!(animator instanceof TransitionAnimator)) {
        throw new Error('"animator" param must be an instance of TransitionAnimator');
      }

      this._transitionAnimatorDict[name] = animator;
    };

    MicroEvent.mixin(Navigator);

    Navigator.TransitionAnimator = TransitionAnimator;

    return Navigator;
  });
})();
