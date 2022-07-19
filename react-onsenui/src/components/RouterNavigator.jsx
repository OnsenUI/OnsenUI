import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-navigator';

import onsCustomElement from '../onsCustomElement';

const Element = onsCustomElement('ons-navigator');

class RouterNavigatorClass extends React.Component {
  constructor(...args) {
    super(...args);

    this.cancelUpdate = false;

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onPrePush = callback.bind(this, 'onPrePush');
    this.onPostPush = callback.bind(this, 'onPostPush');
    this.onPrePop = callback.bind(this, 'onPrePop');
    this.onPostPop = callback.bind(this, 'onPostPop');

    this.ref = React.createRef();

    this.state = {
      internalStack: []
    };
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
        this.setState({internalStack: [...this.state.internalStack, routes[routes.length - 1]]}, resolve);
      });
    };

    return this.ref.current._pushPage(options, update)
      .then(() => {
        this.setState({internalStack: [...routes]});
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
        this.setState({internalStack: [...this.state.internalStack, route]}, resolve);
      });
    };

    return this.ref.current._pushPage(options, update)
  }

  isRunning() {
    return this.ref.current._isRunning;
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
        this.setState({internalStack: [...this.state.internalStack, route]}, resolve);
      });
    };

    return this.ref.current._pushPage(options, update)
      .then(() => {
        this.setState({internalStack: [...this.state.internalStack.slice(0, -2), route]});
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
        ReactDOM.flushSync(() => { // prevents flickering caused by React 18 batching
          this.setState({internalStack: this.state.internalStack.slice(0, -1)}, resolve);
        });
      });
    };

    return this.ref.current._popPage(options, update);
  }

  _onDeviceBackButton(event) {
    if (this.props.routeConfig.routeStack.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  componentDidMount() {
    const node = this.ref.current;

    this.cancelUpdate = false;

    node.addEventListener('prepush', this.onPrePush);
    node.addEventListener('postpush', this.onPostPush);
    node.addEventListener('prepop', this.onPrePop);
    node.addEventListener('postpop', this.onPostPop);

    if (!this.props.routeConfig) {
      throw new Error('In RouterNavigator the property routeConfig needs to be set');
    }

    node.swipeMax = this.props.swipePop;
    node.onDeviceBackButton = this.props.onDeviceBackButton || this._onDeviceBackButton.bind(this);

    this.setState({internalStack: this.props.routeConfig.routeStack});
  }

  componentWillUnmount() {
    const node = this.ref.current;
    node.removeEventListener('prepush', this.onPrePush);
    node.removeEventListener('postpush', this.onPostPush);
    node.removeEventListener('prepop', this.onPrePop);
    node.removeEventListener('postpop', this.onPostPop);
    this.cancelUpdate = true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.onDeviceBackButton !== undefined) {
      this.ref.current.onDeviceBackButton = this.props.onDeviceBackButton;
    }

    const processStack = [...this.props.routeConfig.processStack];

    /**
     * Fix for Redux Timetravel.
     */
    if (prevProps.routeConfig.processStack.length < this.props.routeConfig.processStack.length &&
      prevProps.routeConfig.routeStack.length > this.props.routeConfig.routeStack.length) {
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

  render() {
    const {
      innerRef,
      renderPage,

      // these props should not be passed down
      onPrePush,
      onPostPush,
      onPrePop,
      onPostPop,
      swipePop,
      onDeviceBackButton,

      ...rest
    } = this.props;

    const pagesToRender = this.state.internalStack.map(route => renderPage(route));

    if (innerRef && innerRef !== this.ref) {
      this.ref = innerRef;
    }

    return (
      <Element {...rest} ref={this.ref}>
        {pagesToRender}
      </Element>
    );
  }
}

/**
 * @original ons-navigator
 * @category navigation
 * @tutorial react/Reference/navigator
 * @description
 * [en] This component is a variant of the Navigator with a declarative API. In order to manage to display the pages, the  navigator needs to define the `renderPage` method, that takes an route and a navigator and  converts it to an page.[/en]
 * [ja][/ja]
 */
const RouterNavigator = React.forwardRef((props, ref) => (
  <RouterNavigatorClass innerRef={ref} {...props}>{props.children}</RouterNavigatorClass>
));

RouterNavigator.propTypes = {
  /**
   * @name renderPage
   * @type function
   * @required true
   * @defaultValue null
   * @description
   *  [en] This function takes the current route object as a parameter and returns a react componen.[/en]
   *  [ja][/ja]
   */
  renderPage: PropTypes.func.isRequired,
  /**
   * @name routeConfig
   * @type object
   * @required true
   * @defaultValue null
   * @description
   *  [en] This object must contain two properties:
   *  `routeStack`: An array of route objects,
   *  `processStack`: An array of process objects `{ type: push | pop | reset, route: userRoute }` that
   *  describe the transition from the current state to the next state.
   *  Make sure that the route stack is not emptied before the animations for the `processStack` have completed.
   *  It is recommended to update the `routeStack` and empty the `processStack` in the 'onPostPop' callback.
   *  [/en]
   *  [ja][/ja]
   */
  routeConfig: PropTypes.shape({
    routeStack: PropTypes.arrayOf(PropTypes.object),
    processStack: PropTypes.arrayOf(PropTypes.object)
  }),

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
   * @name swipeable
   * @type bool|string
   * @required false
   * @description
   *  [en]
   *  Enables swipe-to-pop functionality for iOS.
   *  [/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * @name swipePop
   * @type function
   * @required false
   * @description
   *  [en]
   *  Function called on swipe-to-pop. Must perform a popPage with the given options object.
   *  [/en]
   *  [ja][/ja]
   */
  swipePop: PropTypes.func,

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
