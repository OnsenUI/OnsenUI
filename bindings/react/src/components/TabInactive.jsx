import SimpleWrapper from './SimpleWrapper.jsx';

/**
 * @original ons-tab-inactive
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Tab element for showing shown when the tab is inactive [/en]
 * [ja][/ja]
 * @example
 * <Tab>
 *   <TabActive>
       HOME
     </TabInactive>
     <TabInactive>
       home
     </TabInactive>
   </Tab>
 */
class TabInactive extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-tab-inactive';
  }
}

export default TabInactive;
