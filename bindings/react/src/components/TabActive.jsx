import SimpleWrapper from './SimpleWrapper.jsx';

/**
 * @original ons-tab-active
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Tab element for showing shown when the tab is active [/en]
 * [ja][/ja]
 * @example
 * <Tab>
 *   <TabActive>
       HOME
     </TabInActive>
     <TabInActive>
       home
     </TabInActive>
   </Tab>
 */
class TabActive extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-tab-active';
  }
}

export default TabActive;
