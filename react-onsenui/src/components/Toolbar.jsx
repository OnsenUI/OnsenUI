import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-toolbar';

import onsCustomElement from '../onsCustomElement';

const notAttributes = ['visible'];

/**
 * @original ons-toolbar
 * @category page
 * @tutorial react/Reference/toolbar
 * @description
 * [en]Toolbar component that can be used with navigation. Left, center and right container can be specified by class names. This component will automatically displays as a Material Design toolbar when running on Android devices.[/en]
 * [ja][/ja]
 * @example
 *
<Page renderToolbar={() =>
  <Toolbar>
    <div className="left">
      <BackButton>
          Back
      </BackButton>
    </div>
    <div className="center">
      Title
    </div>
    <div className="right">
      <ToolbarButton>
        <Icon icon="md-menu" />
      </ToolbarButton>
    </div>
  </Toolbar> }
/>
 */
const Toolbar = onsCustomElement('ons-toolbar', {notAttributes});

Toolbar.propTypes = {
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
   * @name visible
   * @type bool
   * @description
   *  [en]If true, the toolbar is shown on the screen. Otherwise, the toolbar is not shown.[/en]
   *  [ja][/ja]
   */
  visible: PropTypes.bool,

  /**
   * @name static
   * @type bool
   * @description
   *   [en]Static toolbars are not animated by `ons-navigator` when pushing or popping pages. This can be useful to improve performance in some situations.[/en]
   *  [ja][/ja]
   */
  static: PropTypes.bool,

  /**
   * @name inline
   * @type bool
   * @description
   *   [en]Display the toolbar as an inline element.[/en]
   *   [ja]ツールバーをインラインに置きます。スクロール領域内にそのまま表示されます。[/ja]
   */
  inline: PropTypes.bool
};

export default Toolbar;
