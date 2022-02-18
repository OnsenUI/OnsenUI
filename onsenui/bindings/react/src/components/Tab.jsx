import SimpleWrapper from './SimpleWrapper.jsx';

/**
 * @original ons-tab
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Represents a tab inside tab bar.
 [/en]
 * [ja][/ja]
 * @example
 * <Tap>
 *   Home
 * </Tap>
 */
class Tab extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-tab';
  }
}

export default Tab;
