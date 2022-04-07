import React from 'react';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-tabbar';

import onsCustomElement from '../onsCustomElement';

const deprecated = {
  index: 'activeIndex'
};
const Element = onsCustomElement('ons-tabbar', {deprecated});

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
const Tabbar = React.forwardRef((props, ref) => {
  const {visible, hideTabs, renderTabs, ...rest} = props;

  const tabs = renderTabs(props.activeIndex, ref);

  // visible is deprecated in favour of hideTabs, but if visible is defined and
  // hideTabs is not, we use its negation as the value of hideTabs
  let reallyHideTabs;
  if (hideTabs === undefined && visible !== undefined) {
    reallyHideTabs = !visible;
  } else {
    reallyHideTabs = hideTabs;
  }

  return (
    <Element
      hideTabs={reallyHideTabs}
      {...rest}

      ref={ref}
    >
      <div className='tabbar__content'>
        <div>
          {tabs.map(tab => tab.content)}
        </div>
        <div></div>
      </div>
      <div className='tabbar'>
        {tabs.map(tab => tab.tab)}
        <div className='tabbar__border'></div>
      </div>
    </Element>
  );
});

Tabbar.propTypes = {
  /**
   * @name activeIndex
   * @type number
   * @description
   *  [en]The index of the tab to highlight.[/en]
   *  [ja][/ja]
   */
  activeIndex: PropTypes.number,

  /**
   * @name index
   * @type number
   * @description
   *  [en]DEPRECATED! Use `activeIndex` instead.[/en]
   *  [ja][/ja]
   */
  index: PropTypes.number,

  /**
   * @name renderTabs
   * @type function
   * @description
   *  [en]Function that returns an array of objects with the keys `content` and `tab`.[/en]
   *  [ja][/ja]
   */
  renderTabs: PropTypes.func.isRequired,

  /**
   * @name position
   * @type string
   * @description
   *  [en]Tabbar's position. Available values are `"bottom"` and `"top"`. Use `"auto"` to choose position depending on platform (iOS bottom, Android top). [/en]
   *  [ja][/ja]
   */
  position: PropTypes.string,

  /**
   * @name swipeable
   * @type bool
   * @description
   *  [en]Enable swipe interaction.[/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.bool,

  /**
   * @name ignoreEdgeWidth
   * @type number
   * @description
   *  [en]Distance in pixels from both edges. Swiping on these areas will prioritize parent components such as `Splitter` or `Navigator`.[/en]
   *  [ja][/ja]
   */
  ignoreEdgeWidth: PropTypes.number,

  /**
   * @name animation
   * @type string
   * @description
   *  [en]If this attribute is set to `"none"` the transitions will not be animated.[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.oneOf(['none', 'slide']),

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
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

  /**
   * @name visible
   * @type bool
   * @description
   *  [en]If true, the tabbar is not shown on the screen. Otherwise, the tabbar is shown.[/en]
   *  [ja][/ja]
   */
  hideTabs: PropTypes.bool,

  /**
   * @name visible
   * @type bool
   * @description
   *  [en]DEPRECATED! Use `hideTabs` instead.[/en]
   *  [ja][/ja]
   */
  visible: PropTypes.bool,

  /**
   * @name modifier
   * @type string
   * @description
   *  [en]The appearance of the tabbar.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

export default Tabbar;
