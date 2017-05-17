import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

/**
 * @original ons-navigator
 * @category navigator
 * @tutorial react/Reference/navigator
 * @description
 * [en] This component is responsible for page transitioning and managing the pages of your OnsenUI application. In order to manage to display the pages, the  navigator needs to define the `renderPage` method, that takes an route and a navigator and  converts it to an page.[/en]
 * [ja][/ja]
 */
class RouterNavigator extends BasicComponent {
  constructor(...args) {
    super(...args);

    this.cancelUpdate = false;
    this.page = null;

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onPrePush = callback.bind(this, 'onPrePush');
    this.onPostPush = callback.bind(this, 'onPostPush');
    this.onPrePop = callback.bind(this, 'onPrePop');
    this.onPostPop = callback.bind(this, 'onPostPop');
  }

  update(cb) {
    if (!this.cancelUpdate) {
      this.setState({}, cb);
    }
  }

  /**
   * @method resetPageStack
   * @signature resetPageStack(route, options = {})
   * @param {Array} [routes]
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
      return;
    }

    const update = () => {
      return new Promise(resolve => {
        this.pages.push(this.props.renderPage(routes[routes.length - 1]));
        this.update(resolve);
      });
    };

    return this._navi._pushPage(options, update)
      .then(() => {
        this.pages = routes.map(route => this.props.renderPage(route));
        this.update();
      });
  }

  /**
   * @method pushPage
   * @signature pushPage(route, options = {})
   * @param {Array} [routes]
   *   [en] The routes that the navigator should push to.[/en]
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
      return;
    }

    const update = () => {
      return new Promise(resolve => {
        this.page = this.props.renderPage(route);
        this.update(resolve);
      });
    };

    return this._navi._pushPage(options, update)
      .then(() => {
        this.page = null;
        this.update();
      });
  }

  isRunning() {
    return this._navi._isRunning;
  }

  /*
   * @method replacePage
   * @signature replacePage(page, [options])
   * @return {Promise}
   *   [en]Promise which resolves to the new page.[/en]
   *   [ja]新しいページを解決するPromiseを返します。[/ja]
   * @description
   *   [en]Replaces the current top page with the specified one. Extends `pushPage()` parameters.[/en]
   *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
   */
  replacePage(route, options = {}) {
    if (this.isRunning()) {
      return;
    }

    const update = () => {
      return new Promise(resolve => {
        this.pages.push(this.props.renderPage(route));
        this.update(resolve);
      });
    };

    return this._navi._pushPage(options, update)
      .then(() => {
        this.pages.splice(this.pages.length - 2, 1);
        this.update();
      });
  }

  /**
   * @method popPage
   * @signature popPage(route, options = {})
   * @return {Promise}
   *   [en] Promise which resolves to the revealed page.[/en]
   *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
   * @description
   *   [en] Pops a page out of the page stack[/en]
   *   [ja][/ja]
   */
  popPage(options = {}) {
    if (this.isRunning()) {
      return;
    }

    const update = () => {
      return new Promise(resolve => {
        this.pages.pop();
        this.update(resolve);
      });
    };

    return this._navi._popPage(options, update);
  }

  _onDeviceBackButton(event) {
    if (this.props.routeConfig.routeStack.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  componentDidMount() {
    const node = this._navi;

    this.cancelUpdate = false;

    node.addEventListener('prepush', this.onPrePush);
    node.addEventListener('postpush', this.onPostPush);
    node.addEventListener('prepop', this.onPrePop);
    node.addEventListener('postpop', this.onPostPop);

    if (!this.props.routeConfig) {
      throw new Error('In RouterNavigator the property routeConfig needs to be set');
    }

    this.routeConfig = this.props.routeConfig;

    this.pages = this.routeConfig.routeStack.map(
      (route) => this.props.renderPage(route, this)
    );

    node.onDeviceBackButton = this.props.onDeviceBackButton || this._onDeviceBackButton.bind(this);

    this.update();
  }

  componentWillReceiveProps(nextProps) {
    const processStack = [...nextProps.routeConfig.processStack];

    /**
     * Fix for Redux Timetravel.
     */
    if (this.props.routeConfig.processStack.length < nextProps.routeConfig.processStack.length &&
      this.props.routeConfig.routeStack.length > nextProps.routeConfig.routeStack.length) {
      return;
    }

    if (processStack.length > 0) {
      const {type, route, options} = processStack[0];

      switch (type) {
        case 'push':
          this.pushPage(route, options);
          break;
        case 'pop':
          this.popPage(options);
          break;
        case 'reset':
          if (Array.isArray(route)) {
            this.resetPageStack(route, options);
          } else {
            this.resetPageStack([route], options);
          }
          break;
        case 'replace':
          this.replacePage(route, options);
          break;
        default:
          throw new Error(`Unknown type ${type} in processStack`);
      }
    }
  }

  componentWillUnmount() {
    const node = this._navi;
    node.removeEventListener('prepush', this.onPrePush);
    node.removeEventListener('postpush', this.onPostPush);
    node.removeEventListener('prepop', this.onPrePop);
    node.removeEventListener('postpop', this.onPostPop);
    this.cancelUpdate = true;
  }

  render() {
    var {...others} = this.props;
    Util.convert(others, 'animationOptions', {fun: Util.animationOptionsConverter, newName: 'animation-options'});

    return (
      <ons-navigator {...others} ref={(navi) => { this._navi = navi; }}>
        {this.props.routeConfig.routeStack.map(route => this.props.renderPage(route))}
        {this.page}
      </ons-navigator>
    );
  }
}

RouterNavigator.propTypes = {
  /**
   * @name renderPage
   * @type function
   * @required true
   * @defaultValue null
   * @description
   *  [en] This function takes the current route object as a parameter and  creates returns a react componen.[/en]
   *  [ja][/ja]
   */
  renderPage: PropTypes.func.isRequired,
  /**
   * @name initialRouteStack
   * @type array
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial routes from the navigator,
   *  which will be used to render the initial pages in the renderPage method.
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
   *  [en]Called just before a page is pushed.[/en]
   */
  onPrePush: PropTypes.func,

  /**
   * @name onPostPush
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is pushed.[/en]
   */
  onPostPush: PropTypes.func,

  /**
   * @name onPrePop
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is popped.[/en]
   */
  onPrePop: PropTypes.func,

  /**
   * @name onPostPop
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is popped.[/en]
   */
  onPostPop: PropTypes.func,

  /**
   * @property animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
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
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

export default RouterNavigator;
