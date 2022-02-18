import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

/**
 * @original ons-navigator
 * @category navigation
 * @tutorial react/Reference/navigator
 * @description
 * [en] This component is responsible for page transitioning and managing the pages of your OnsenUI application. In order to manage to display the pages, the  navigator needs to define the `renderPage` method, that takes an route and a navigator and  converts it to an page.  [/en]
 * [ja][/ja]
 * @example
  <Navigator
    renderPage={(route, navigator) =>
     <MyPage
       title={route.title}
       onPop={() => navigator.popPage()}
       />
    }
    initialRoute={{
        title: 'First Page'
    }} />
   }
 }
 */
class Navigator extends BasicComponent {
  constructor(...args) {
    super(...args);
    this.pages = [];
    this.state = { };
    this._prePush = this._prePush.bind(this);
    this._postPush = this._postPush.bind(this);
    this._prePop = this._prePop.bind(this);
    this._postPop = this._postPop.bind(this);
  }

  update(pages, obj) {
    this.pages = pages || [];
    return new Promise((resolve) => {
      this.forceUpdate(resolve);
    });
  }

  /**
   * @method resetPage
   * @signature resetPage(route, options = {})
   * @param {Object} route
   *   [en] The route that the page should be reset to.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Resets the current page[/en]
   *   [ja][/ja]
   */
  resetPage(route, options = {}) {
    return this.resetPageStack([route], options);
  }

  /**
   * @method resetPageStack
   * @signature resetPageStack(route, options = {})
   * @param {Array} routes
   *   [en] The routes that the navigator should be reset to.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en] Resets the navigator to the current page stack[/en]
   *   [ja][/ja]
   */
  resetPageStack(routes, options = {}) {
    if (this.isRunning()) {
      return Promise.reject('Navigator is already running animation.');
    }

    const hidePages = () => {
      const pageElements = this._navi.pages;
      for (let i = pageElements.length - 2; i >= 0; i--) {
        pageElements[i].style.display = 'none';
      }
    };

    if (options.pop) {
      this.routesBeforePop = this.routes.slice();
      this.routesAfterPop = routes;
      this.routes = routes.concat([this.routes[this.routes.length - 1]]);

      const update = () => {
        this.pages.pop();
        this.routes = routes;
        return new Promise((resolve) => this.forceUpdate(resolve));
      };

      return this.update(this.pages)
        .then(() => this._navi._popPage(options, update))
        .then(() => hidePages());
    }

    const lastRoute = routes[routes.length - 1];
    const newPage = this.props.renderPage(lastRoute, this);
    this.routes.push(lastRoute);

    const update = () => {
      this.pages.push(newPage);
      return new Promise((resolve) => this.forceUpdate(resolve));
    };

    return this._navi._pushPage(options, update).then(() => {
      this.routes = routes;
      this.pages = routes.map(route => this.props.renderPage(route, this));
      return this.update(this.pages).then(() => hidePages());
    });
  }

  /**
   * @method pushPage
   * @signature pushPage(route, options = {})
   * @param {Object} route
   *   [en] The route that the navigator should push to.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en] Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en] Pushes a page to the page stack[/en]
   *   [ja][/ja]
   */
  pushPage(route, options = {}) {
    if (this.isRunning()) {
      return Promise.reject('Navigator is already running animation.');
    }

    return new Promise((resolve) => {
      const update = () => {
        return new Promise((resolve) => {
          this.pages.push(this.props.renderPage(route, this));
          this.forceUpdate(resolve);
        });
      };

      this.routes.push(route);
      this._navi
        ._pushPage(
          options,
          update
        )
        .then(resolve)
        .catch((error) => {
          this.routes.pop();
          this.pages.pop();
          throw error;
        });
    });
  }

  isRunning() {
    return this._navi._isRunning;
  }

  /*
   * @method replacePage
   * @signature replacePage(route, [options])
   * @param {Object} route
   *   [en] The route that the navigator should replace the top page with.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Promise which resolves to the new page.[/en]
   *   [ja]新しいページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Replaces the current top page with the specified one. Extends `pushPage()` parameters.[/en]
   *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
   */
  replacePage(route, options = {}) {
    if (this.isRunning()) {
      return Promise.reject('Navigator is already running animation.');
    }

    return this.pushPage(route, options).then(() => {
      const pos = this.pages.length - 2;
      this.pages.splice(pos, 1);
      this.routes.splice(pos, 1);
      this._navi.topPage.updateBackButton(this.pages.length > 1);
      this.forceUpdate();
    });
  }

  /**
   * @method popPage
   * @signature popPage(options = {})
   * @return {Promise}
   *   [en] Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en] Pops a page out of the page stack[/en]
   *   [ja][/ja]
   */
  popPage(options = {}) {
    if (this.isRunning()) {
      return Promise.reject('Navigator is already running animation.');
    }

    this.routesBeforePop = this.routes.slice();
    this.routesAfterPop = this.routesBeforePop.slice(0, this.routesBeforePop.length - 1);

    const update = () => {
      return new Promise((resolve) => {
        this.pages.pop();
        this.routes.pop();

        this.forceUpdate(resolve);
      });
    };

    return this._navi._popPage(options, update);
  }

  _onDeviceBackButton(event) {
    if (this.pages.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  _prePop(event) {
    if (event.target !== this._navi) {
      return;
    }

    event.routes = {
      poppingRoute: this.routesBeforePop[this.routesBeforePop.length - 1],
      routes: this.routesBeforePop
    };

    this.props.onPrePop(event);
  }

  _postPop(event) {
    if (event.target !== this._navi) {
      return;
    }

    event.routes = {
      poppedRoute: this.routesBeforePop[this.routesBeforePop.length - 1],
      routes: this.routesAfterPop
    };

    this.props.onPostPop(event);
  }

  _prePush(event) {
    if (event.target !== this._navi) {
      return;
    }

    event.routes = {
      pushingRoute: this.routes[this.routes.length - 1],
      routes: this.routes.slice(0, this.routes.length - 1)
    };

    this.props.onPrePush(event);
  }

  _postPush(event) {
    if (event.target !== this._navi) {
      return;
    }

    event.routes = {
      pushedRoute: this.routes[this.routes.length - 1],
      routes: this.routes
    };

    this.props.onPostPush(event);
  }

  componentDidMount() {
    const node = this._navi;
    node.popPage = this.popPage.bind(this);

    node.addEventListener('prepush', this._prePush);
    node.addEventListener('postpush', this._postPush);
    node.addEventListener('prepop', this._prePop);
    node.addEventListener('postpop', this._postPop);

    node.swipeMax = this.props.swipePop;
    node.onDeviceBackButton = this.props.onDeviceBackButton || this._onDeviceBackButton.bind(this);

    if (this.props.initialRoute && this.props.initialRouteStack) {
      throw new Error('In Navigator either initalRoute or initalRoutes can be set');
    }

    if (this.props.initialRoute) {
      this.routes = [this.props.initialRoute];
    } else if (this.props.initialRouteStack) {
      this.routes = this.props.initialRouteStack;
    } else {
      this.routes = [];
    }

    this.pages = this.routes.map(
      (route) => this.props.renderPage(route, this)
    );
    this.forceUpdate();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.onDeviceBackButton !== undefined) {
      this._navi.onDeviceBackButton = newProps.onDeviceBackButton;
    }
  }

  componentWillUnmount() {
    const node = this._navi;
    node.removeEventListener('prepush', this.props.onPrePush);
    node.removeEventListener('postpush', this.props.onPostPush);
    node.removeEventListener('prepop', this.props.onPrePop);
    node.removeEventListener('postpop', this.props.onPostPop);
  }

  render() {
    const attrs = Util.getAttrs(this);
    const pages = this.routes ? this.routes.map((route) => this.props.renderPage(route, this)) : null;

    return (
      <ons-navigator { ...attrs } ref={(navi) => { this._navi = navi; }}>
        {pages}
      </ons-navigator>
    );
  }
}

Navigator.propTypes = {
  /**
   * @name renderPage
   * @type function
   * @required true
   * @defaultValue null
   * @description
   *  [en] This function takes the current route object as a parameter and returns a React component.[/en]
   *  [ja][/ja]
   */
  renderPage: PropTypes.func.isRequired,
  /**
   * @name initialRouteStack
   * @type array
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial routes from the Navigator,
   *  which will be used to render the initial pages in the `renderPage` method.
   *  [/en]
   *  [ja][/ja]
   */
  initialRouteStack: PropTypes.array,

  /**
   * @name initialRoute
   * @type object
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial route of the navigator,
   *  which will be used to render the initial pages in the
   *  renderPage method.
   *  [/en]
   *  [ja][/ja]
   */
  initialRoute: PropTypes.object,

  /**
   * @name onPrePush
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is pushed. It gets an event object with route information.[/en]
   *  [ja][/ja]
   */
  onPrePush: PropTypes.func,

  /**
   * @name onPostPush
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is pushed. It gets an event object with route information.[/en]
   *  [ja][/ja]
   */
  onPostPush: PropTypes.func,

  /**
   * @name onPrePop
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is popped. It gets an event object with route information.[/en]
   */
  onPrePop: PropTypes.func,

  /**
   * @name onPostPop
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is popped. It gets an event object with route information.[/en]
   *  [ja][/ja]
   */
  onPostPop: PropTypes.func,

  /**
   * @name animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
   *   [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name swipeable
   * @type bool|string
   * @required false
   * @description
   *  [en]Enables swipe-to-pop functionality for iOS.[/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * @name swipePop
   * @type function
   * @required false
   * @description
   *  [en]Optional function called on swipe-to-pop. If provided, must perform a popPage with the given options object.[/en]
   *  [ja][/ja]
   */
  swipePop: PropTypes.func,
  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]Custom handler for device back button.[/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

const NOOP = () => null;

Navigator.defaultProps = {
  onPostPush: NOOP,
  onPrePush: NOOP,
  onPrePop: NOOP,
  onPostPop: NOOP
};

export default Navigator;
