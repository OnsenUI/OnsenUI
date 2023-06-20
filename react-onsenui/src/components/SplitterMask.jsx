import 'onsenui/esm/elements/ons-splitter-mask';

import onsCustomElement from '../onsCustomElement';

/**
 * @original ons-splitter-mask
 * @category menu
 * @tutorial react/Reference/splitter
 * @description
 * [en]  The SplitterMask  element is used as a child element of Splitter.
 *    It contains the mask content of the page.
 [/en]
 * [ja][/ja]
 * @example
  <Splitter>
    <SplitterSide
      side="left"
      width={200}
      isSwipeable={true}>
      <Page> Page Left </Page>
    </SplitterSide>
    <SplitterMask>
      <Page> Page Content </Page>
    </SplitterMask>
    <SplitterSide
      side="right"
      width={300}
      collapse={!this.state.showRight}
      isOpen={this.state.openRight}
      onClose={this.handleRightClose.bind(this)}
      onOpen={this.handleRightOpen.bind(this)}
      isSwipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */
const SplitterMask = onsCustomElement('ons-splitter-mask');

export default SplitterMask;
