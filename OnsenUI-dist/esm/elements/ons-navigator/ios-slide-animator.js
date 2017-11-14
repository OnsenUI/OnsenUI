import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
/*
Copyright 2013-2015 ASIAL CORPORATION

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

import NavigatorAnimator from './animator';
import util from '../../ons/util';
import animit from '../../ons/animit';
import contentReady from '../../ons/content-ready';

/**
 * Slide animator for navigator transition like iOS's screen slide transition.
 */

var IOSSlideNavigatorAnimator = function (_NavigatorAnimator) {
  _inherits(IOSSlideNavigatorAnimator, _NavigatorAnimator);

  function IOSSlideNavigatorAnimator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timing = _ref.timing,
        timing = _ref$timing === undefined ? 'cubic-bezier(0.3, .4, 0, .9)' : _ref$timing,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0.4 : _ref$duration;

    _classCallCheck(this, IOSSlideNavigatorAnimator);

    var _this = _possibleConstructorReturn(this, (IOSSlideNavigatorAnimator.__proto__ || _Object$getPrototypeOf(IOSSlideNavigatorAnimator)).call(this, { timing: timing, delay: delay, duration: duration }));

    _this.backgroundMask = util.createElement('\n      <div style="position: absolute; width: 100%; height: 100%;\n        background-color: black; z-index: 2"></div>\n    ');

    return _this;
  }

  _createClass(IOSSlideNavigatorAnimator, [{
    key: '_decompose',
    value: function _decompose(page) {
      var toolbar = page._getToolbarElement();
      var left = toolbar._getToolbarLeftItemsElement();
      var right = toolbar._getToolbarRightItemsElement();

      var excludeBackButton = function excludeBackButton(elements) {
        var result = [];

        for (var i = 0; i < elements.length; i++) {
          if (elements[i].nodeName.toLowerCase() !== 'ons-back-button') {
            result.push(elements[i]);
          }
        }

        return result;
      };

      var other = [].concat(left.children.length === 0 ? left : excludeBackButton(left.children)).concat(right.children.length === 0 ? right : excludeBackButton(right.children));

      return {
        toolbarCenter: toolbar._getToolbarCenterItemsElement(),
        backButtonIcon: toolbar._getToolbarBackButtonIconElement(),
        backButtonLabel: toolbar._getToolbarBackButtonLabelElement(),
        other: other,
        content: page._getContentElement(),
        background: page._getBackgroundElement(),
        toolbar: toolbar,
        bottomToolbar: page._getBottomToolbarElement()
      };
    }
  }, {
    key: '_shouldAnimateToolbar',
    value: function _shouldAnimateToolbar(enterPage, leavePage) {
      var enterToolbar = enterPage._getToolbarElement();
      var leaveToolbar = leavePage._getToolbarElement();

      var toolbars = enterPage._canAnimateToolbar() && leavePage._canAnimateToolbar();
      var material = util.hasModifier(enterToolbar, 'material') || util.hasModifier(leaveToolbar, 'material');
      var transparent = util.hasModifier(enterToolbar, 'transparent') || util.hasModifier(leaveToolbar, 'transparent');

      return toolbars && !material && !transparent;
    }
  }, {
    key: '_calculateDelta',
    value: function _calculateDelta(element, decomposition) {
      var title = void 0,
          label = void 0;

      var pageRect = element.getBoundingClientRect();
      if (decomposition.backButtonLabel.classList.contains('back-button__label')) {
        var labelRect = decomposition.backButtonLabel.getBoundingClientRect();
        title = Math.round(pageRect.width / 2 - labelRect.width / 2 - labelRect.left);
      } else {
        title = Math.round(pageRect.width / 2 * 0.6);
      }

      if (decomposition.backButtonIcon.classList.contains('back-button__icon')) {
        label = decomposition.backButtonIcon.getBoundingClientRect().right - 2;
      }

      return { title: title, label: label };
    }

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */

  }, {
    key: 'push',
    value: function push(enterPage, leavePage, callback) {
      var _this2 = this;

      this.backgroundMask.remove();
      leavePage.parentNode.insertBefore(this.backgroundMask, leavePage);

      var unblock = _get(IOSSlideNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(IOSSlideNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      contentReady(enterPage, function () {
        var enterPageTarget = util.findToolbarPage(enterPage) || enterPage;
        var leavePageTarget = util.findToolbarPage(leavePage) || leavePage;
        var enterPageDecomposition = _this2._decompose(enterPageTarget);
        var leavePageDecomposition = _this2._decompose(leavePageTarget);

        var delta = _this2._calculateDelta(leavePage, enterPageDecomposition);

        var shouldAnimateToolbar = _this2._shouldAnimateToolbar(enterPageTarget, leavePageTarget);

        if (shouldAnimateToolbar) {

          animit.runAll(animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background]).saveStyle().queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)'
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)'
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle(), animit(enterPageDecomposition.toolbar).saveStyle().queue({
            css: {
              opacity: 0
            },
            duration: 0
          }).queue({
            css: {
              opacity: 1
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle(), animit(enterPageDecomposition.toolbarCenter).saveStyle().queue({
            css: {
              transform: 'translate3d(125%, 0, 0)',
              opacity: 1
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle(), animit(enterPageDecomposition.backButtonLabel).saveStyle().queue({
            css: {
              transform: 'translate3d(' + delta.title + 'px, 0, 0)',
              opacity: 0
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0,
              transition: 'opacity ' + _this2.duration + 's linear, transform ' + _this2.duration + 's ' + _this2.timing
            },
            duration: _this2.duration
          }).restoreStyle(), animit(enterPageDecomposition.other).saveStyle().queue({
            css: { opacity: 0 },
            duration: 0
          }).wait(_this2.delay).queue({
            css: { opacity: 1 },
            duration: _this2.duration,
            timing: 'linear'
          }).restoreStyle(), animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background]).saveStyle().queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
              opacity: 0.9
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle().queue(function (done) {
            _this2.backgroundMask.remove();
            unblock();
            callback();
            done();
          }), animit(leavePageDecomposition.toolbarCenter).saveStyle().queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3d(-' + delta.title + 'px, 0, 0)',
              opacity: 0,
              transition: 'opacity ' + _this2.duration + 's linear, transform ' + _this2.duration + 's ' + _this2.timing
            },
            duration: _this2.duration
          }).restoreStyle(), animit(leavePageDecomposition.backButtonLabel).saveStyle().queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3d(-' + delta.label + 'px, 0, 0)',
              opacity: 0
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle(), animit(leavePageDecomposition.other).saveStyle().queue({
            css: { opacity: 1 },
            duration: 0
          }).wait(_this2.delay).queue({
            css: { opacity: 0 },
            duration: _this2.duration,
            timing: 'linear'
          }).restoreStyle());
        } else {

          animit.runAll(animit(enterPage).saveStyle().queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)'
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)'
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle(), animit(leavePage).saveStyle().queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          }).wait(_this2.delay).queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
              opacity: 0.9
            },
            duration: _this2.duration,
            timing: _this2.timing
          }).restoreStyle().queue(function (done) {
            _this2.backgroundMask.remove();
            unblock();
            callback();
            done();
          }));
        }
      });
    }

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} callback
     */

  }, {
    key: 'pop',
    value: function pop(enterPage, leavePage, callback) {
      var _this3 = this;

      this.backgroundMask.remove();
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage);

      var unblock = _get(IOSSlideNavigatorAnimator.prototype.__proto__ || _Object$getPrototypeOf(IOSSlideNavigatorAnimator.prototype), 'block', this).call(this, enterPage);

      var enterPageTarget = util.findToolbarPage(enterPage) || enterPage;
      var leavePageTarget = util.findToolbarPage(leavePage) || leavePage;
      var enterPageDecomposition = this._decompose(enterPageTarget);
      var leavePageDecomposition = this._decompose(leavePageTarget);

      var delta = this._calculateDelta(leavePage, leavePageDecomposition);

      var shouldAnimateToolbar = this._shouldAnimateToolbar(enterPageTarget, leavePageTarget);

      if (shouldAnimateToolbar) {
        animit.runAll(animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background]).saveStyle().queue({
          css: {
            transform: 'translate3D(-25%, 0px, 0px)',
            opacity: 0.9
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3D(0px, 0px, 0px)',
            opacity: 1
          },
          duration: this.duration,
          timing: this.timing
        }).restoreStyle(), animit(enterPageDecomposition.toolbarCenter).saveStyle().queue({
          css: {
            transform: 'translate3d(-' + delta.title + 'px, 0, 0)',
            opacity: 0
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1.0,
            transition: 'opacity ' + this.duration + 's linear, transform ' + this.duration + 's ' + this.timing
          },
          duration: this.duration
        }).restoreStyle(), animit(enterPageDecomposition.backButtonLabel).saveStyle().queue({
          css: {
            transform: 'translate3d(-' + delta.label + 'px, 0, 0)'
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3d(0, 0, 0)'
          },
          duration: this.duration,
          timing: this.timing
        }).restoreStyle(), animit(enterPageDecomposition.other).saveStyle().queue({
          css: { opacity: 0 },
          duration: 0
        }).wait(this.delay).queue({
          css: { opacity: 1 },
          duration: this.duration,
          timing: 'linear'
        }).restoreStyle(), animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background]).queue({
          css: {
            transform: 'translate3D(0px, 0px, 0px)'
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3D(100%, 0px, 0px)'
          },
          duration: this.duration,
          timing: this.timing
        }).wait(0).queue(function (done) {
          _this3.backgroundMask.remove();
          unblock();
          callback();
          done();
        }), animit(leavePageDecomposition.toolbar).queue({
          css: {
            opacity: 1
          },
          duration: 0
        }).queue({
          css: {
            opacity: 0
          },
          duration: this.duration,
          timing: this.timing
        }), animit(leavePageDecomposition.toolbarCenter).queue({
          css: {
            transform: 'translate3d(0, 0, 0)'
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3d(125%, 0, 0)'
          },
          duration: this.duration,
          timing: this.timing
        }), animit(leavePageDecomposition.backButtonLabel).queue({
          css: {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3d(' + delta.title + 'px, 0, 0)',
            opacity: 0,
            transition: 'opacity ' + this.duration + 's linear, transform ' + this.duration + 's ' + this.timing
          },
          duration: this.duration
        }));
      } else {
        animit.runAll(animit(enterPage).saveStyle().queue({
          css: {
            transform: 'translate3D(-25%, 0px, 0px)',
            opacity: 0.9
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3D(0px, 0px, 0px)',
            opacity: 1.0
          },
          duration: this.duration,
          timing: this.timing
        }).restoreStyle(), animit(leavePage).queue({
          css: {
            transform: 'translate3D(0px, 0px, 0px)'
          },
          duration: 0
        }).wait(this.delay).queue({
          css: {
            transform: 'translate3D(100%, 0px, 0px)'
          },
          duration: this.duration,
          timing: this.timing
        }).queue(function (done) {
          _this3.backgroundMask.remove();
          unblock();
          callback();
          done();
        }));
      }
    }
  }]);

  return IOSSlideNavigatorAnimator;
}(NavigatorAnimator);

export default IOSSlideNavigatorAnimator;