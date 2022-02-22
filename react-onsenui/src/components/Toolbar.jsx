import SimpleWrapper from './SimpleWrapper.jsx';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

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
class Toolbar extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-toolbar';
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.props.visible !== undefined) {
      ReactDOM.findDOMNode(this).setVisibility(this.props.visible);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      ReactDOM.findDOMNode(this).setVisibility(nextProps.visible);
    }
  }
}

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
  visible: PropTypes.bool
};

export default Toolbar;
