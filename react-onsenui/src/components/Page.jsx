import React from 'react';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-page';

import onsCustomElement from '../onsCustomElement';

const notAttributes = ['onInfiniteScroll', 'onDeviceBackButton'];
const Element = onsCustomElement('ons-page', {notAttributes});

/**
 * @original ons-page
 * @category page
 * @tutorial react/Reference/page
 * @description
 * [en]
 *   This component is handling the entire page. The content can be scrolled.
 *
 *   To add fixed content that doesn't scroll with the page the `renderFixed` prop is used.
 *
 *   A page toolbar can be added with the `renderToolbar` prop.
 * [/en]
 * [ja][/ja]
 * @example
  <Page
    renderFixed={() => <Fab></Fab>}
    renderToolbar={() => <Toolbar>...</Toolbar>}
    contentStyle={{padding: 40}}>
    <div> Page content </div>
  </Page>
 */
const Page = React.forwardRef((props, ref) => {
  const {
    renderToolbar,
    renderBottomToolbar,
    renderModal,
    renderFixed,
    contentStyle,
    children,
    ...rest
  } = props;

  return (
    <Element
      {...rest}
      ref={ref}
    >
      {renderToolbar(ref)}
      <div className='page__background'> </div>
      <div className='page__content' style={contentStyle}>
        {children}
      </div>
      <div className='page__extra' style={{zIndex: 10001}}>
        {renderModal(ref)}
      </div>
      {renderFixed(ref)}
      {renderBottomToolbar(ref)}
    </Element>
  );
});

Page.propTypes = {

  /**
   * @name contentStyle
   * @type Object
   * @description
   *  [en]
   *  Specify the style of the page content. Optional.
   *  [/en]
   */
  contentStyle: PropTypes.object,

  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name renderModal
   * @type function
   * @required false
   * @defaultValue null
   * @description
   *  [en] This function renders a modal that masks current screen.[/en]
   */
  renderModal: PropTypes.func,

  /**
   * @name renderToolbar
   * @type function
   * @required false
   * @defaultValue null
   * @description
   *  [en] This function renders the toolbar of the page.[/en]
   *  [ja][/ja]
   */
  renderToolbar: PropTypes.func,

  /**
   * @name renderBottomToolbar
   * @type function
   * @defaultValue null
   * @description
   *  [en] This function renders the bottom toolbar of the page.[/en]
   *  [ja][/ja]
   */
  renderBottomToolbar: PropTypes.func,

  /**
   * @name renderFixed
   * @type function
   * @defaultValue null
   * @description
   *  [en] This function renders fixed content of the page. Can be used to render `Fab` or `SpeedDial` components as well as other components that don't scroll with the page.[/en]
   *  [ja][/ja]
   */
  renderFixed: PropTypes.func,

  /**
   * @name onInit
   * @type function
   * @required false
   * @description
   *  [en]
   *  	Fired right after the page is attached.
   *  [/en]
   *  [ja][/ja]
   */
  onInit: PropTypes.func,

  /**
   * @name onShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called Fired right after the page is shown.
   *  [/en]
   *  [ja][/ja]
   */
  onShow: PropTypes.func,

  /**
   * @name onHide
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called after the page is hidden.
   *  [/en]
   *  [ja][/ja]
   */
  onHide: PropTypes.func,

  /**
   * @name onInfiniteScroll
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called when scrolling to the bottom of the page. It gets a 'done' callback (first argument) that must be called when it's finished.
   *  [/en]
   *  [ja][/ja]
   */
  onInfiniteScroll: PropTypes.func,

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

const NOOP = () => null;

Page.defaultProps = {
  renderToolbar: NOOP,
  renderBottomToolbar: NOOP,
  renderModal: NOOP,
  renderFixed: NOOP
};

export default Page;
