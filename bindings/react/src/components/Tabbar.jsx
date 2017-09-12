import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

/**
 * @original ons-tabbar
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Component to display a tabbar on either the top or the bottom of a page.
 * To define the tabs and the content the property renderTabs need to be implemented, that returns an array of tabs and their content. See the example for specifics. [/en]* [ja][/ja]
 * @example

  <Page>
    <Tabbar
      onPreChange={({index}) => this.setState(index)}
      onPostChange={() => console.log('postChange')}
      onReactive={() => console.log('postChange')}
      position='bottom'
      index={this.state.index}
      renderTabs={(activeIndex, tabbar) => [
        {
          content: <TabPage title="Home" active={activeIndex === 0} tabbar={tabbar} />,
          tab: <Tab label="Home" icon="md-home" />
        },
        {
          content: <TabPage title="Settings" active={activeIndex === 1} tabbar={tabbar} />,
          tab: <Tab label="Settings" icon="md-settings" />
        }]
      }
    />
  </Page>
 */

class Tabbar extends BasicComponent {

  constructor(...args) {
    super(...args);

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onPreChange = callback.bind(this, 'onPreChange');
    this.onPostChange = callback.bind(this, 'onPostChange');
    this.onReactive = callback.bind(this, 'onReactive');
  }

  componentDidMount() {
    super.componentDidMount();
    const node = this._tabbar;
    node.addEventListener('prechange', this.onPreChange);
    node.addEventListener('postchange', this.onPostChange);
    node.addEventListener('reactive', this.onReactive);
    node.onSwipe = this.props.onSwipe || null;
  }

  componentWillUnmount() {
    const node = this._tabbar;
    node.removeEventListener('prechange', this.onPreChange);
    node.removeEventListener('postchange', this.onPostChange);
    node.removeEventListener('reactive', this.onReactive);
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    const node = this._tabbar;
    if (this.props.index !== node.getActiveTabIndex()) {
      node.setActiveTab(this.props.index);
    }
    if (this.props.onSwipe !== prevProps.onSwipe) {
      node.onSwipe = this.props.onSwipe;
    }
  }

  render() {
    const {...props} = this.props;
    const tabs = props.renderTabs(props.index, this);

    if (!this.tabPages) {
      this.tabPages = tabs.map((tab) => tab.content);
    } else {
      this.tabPages[props.index] = tabs[props.index].content;
    }

    props.activeIndex = props.index; // Tabbar's initial index

    ['animation', 'swipeable'].forEach(el => Util.convert(props, el));
    Util.convert(props, 'animationOptions', {fun: Util.animationOptionsConverter, newName: 'animation-options'});
    Util.convert(props, 'tabBorder', {newName: 'tab-border'});

    return (
      <ons-tabbar {...props} ref={(tabbar) => { this._tabbar = tabbar; }}>
        <div className={'ons-tabbar__content tabbar__content' + (props.position === 'top' ? ' tabbar--top__content' : '')}>
          <div>
            {this.tabPages}
          </div>
          <div></div>
        </div>
        <div className={'tabbar ons-tabbar__footer ons-tabbar-inner' + (props.position === 'top' ? ' tabbar--top' : '')}>
          {tabs.map((tab) => tab.tab)}
          <div className='tabbar__border'></div>
        </div>
      </ons-tabbar>
    );
  }
}

Tabbar.propTypes = {
  /**
   * @name index
   * @type number
   * @required
   * @description
   *  [en] The index of the tab to highlight.[/en]
   *  [ja][/ja]
   */
  index: PropTypes.number.isRequired,

  /**
   * @name renderTabs
   * @type function
   * @description
   *  [en] Function that returns an array of objects with the keys `content` and `tab`.[/en]
   *  [ja][/ja]
   */
  renderTabs: PropTypes.func.isRequired,

  /**
   * @name position
   * @type string
   * @description
   *  [en] Tabbar's position. Available values are `"bottom"` and `"top"`. Use `"auto"` to choose position depending on platform (iOS bottom, Android top). [/en]
   *  [ja][/ja]
   */
  position: PropTypes.string,

  /**
   * @name swipeable
   * @type bool
   * @description
   *  [en]Ennable swipe interaction.[/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @description
   *  [en] Animation name. Available values are `"none"`, `"slide"` and `"fade"`. Default is `"none"`. [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.oneOf(['none', 'slide', 'fade']),

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name tabBorder
   * @type bool
   * @description
   *  [en]If true, the tabs show a dynamic bottom border. Only works for iOS since the border is always visible in Material Design.[/en]
   *  [ja][/ja]
   */
  tabBorder: PropTypes.bool,

  /**
   * @name onPreChange
   * @type function
   * @description
   *  [en]Called just before the tab is changed.[/en]
   *  [ja][/ja]
   */
  onPreChange: PropTypes.func,

  /**
   * @name onPostChange
   * @type function
   * @description
   *  [en]Called just after the tab is changed.[/en]
   *  [ja][/ja]
   */
  onPostChange: PropTypes.func,

  /**
   * @name onReactive
   * @type function
   * @description
   *  [en]Called if the already open tab is tapped again.[/en]
   *  [ja][/ja]
   */
  onReactive: PropTypes.func,

  /**
   * @name onSwipe
   * @type function
   * @description
   *  [en]Hook called whenever the user slides the tabbar. It gets a decimal index and an animationOptions object as arguments.[/en]
   *  [ja][/ja]
   */
  onSwipe: PropTypes.func,
};

Tabbar.defaultProps = {
  index: 0
};

export default Tabbar;
