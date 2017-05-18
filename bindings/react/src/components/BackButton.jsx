import SimpleWrapper from './SimpleWrapper.jsx';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

/**
 * @original ons-back-button
 * @category navigation
 * @tutorial react/Reference/navigator
 * @description
 * [en]
 *   Back button component for Toolbar. It enables to automatically to pop the top page of the navigator. When only presented with one page, the button is hidden automatically.
 *
 *   The default behavior can be overridden using the `onClick` prop.
 * [/en]
 * [ja][/ja]
 * @example
 * <Toolbar modifier={this.props.modifier} >
      <div className="left"><BackButton modifier={this.props.modifier}>Back</BackButton></div>
      <div className="center">{this.props.title}</div>
   </Toolbar>
 */
class BackButton extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-back-button';
  }

  _updateOnClick(props) {
    const node = ReactDOM.findDOMNode(this);

    if (props.onClick) {
      node.onClick = () => null;
    } else {
      delete node.onClick;
    }
  }

  componentDidMount() {
    this._updateOnClick(this.props);
  }

  componentWillReceiveProps(props) {
    this._updateOnClick(props);
  }
}

BackButton.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the back button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en]This function will be called ones the button is clicked. It overrides the default behavior of the back button.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

export default BackButton;
