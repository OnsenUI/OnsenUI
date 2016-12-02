import React from 'react';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';
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
 * [jp] どうしよう[/jp]
 * @example
  <Page
    renderFixed={() => <Fab></Fab>}
    renderToolbar={() => <Toolbar>...</Toolbar>}
    contentStyle={{padding: 40}}>
    <div> Page content </div>
  </Page>
 */
class Page extends BasicComponent {

  componentDidMount() {
    super.componentDidMount();
    var node = ReactDOM.findDOMNode(this);
    node.addEventListener('init', this.props.onInit);
    node.addEventListener('show', this.props.onShow);
    node.addEventListener('hide', this.props.onHide);
  }

  componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this);
    node.removeEventListener('init', this.props.onInit);
    node.removeEventListener('show', this.props.onShow);
    node.removeEventListener('hide', this.props.onHide);
  }

  render() {
    const toolbar = this.props.renderToolbar(this);
    const bottomToolbar = this.props.renderBottomToolbar(this);
    const modal = this.props.renderModal(this);
    const fixed = this.props.renderFixed(this);

    const {contentStyle, ...props} = this.props;

    return <ons-page {...props} >
        {toolbar}
        <div className='page__background'> </div>
        <div className='page__content' style={contentStyle}>
          {this.props.children}
        </div>
        <div className='page__extra' style={{zIndex: 10001}}>
          {modal}
        </div>
        {fixed}
        {bottomToolbar}
      </ons-page>;
  }
}

Page.propTypes = {

  /**
   * @name contentStyle
   * @type Object
   * @description
   *  [en]
   *  Specify the style of the page content. Optional.
   *  [/en]
   */
  contentStyle: React.PropTypes.object,

  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [jp] どうしよう[/jp]
   */
  modifier: React.PropTypes.string,

  /**
   * @name renderModal
   * @type function
   * @required false
   * @defaultValue null
   * @description
   *  [en] This function renders a modal that masks current screen.[/en]
   */
  renderModal: React.PropTypes.func,

  /**
   * @name renderToolbar
   * @type function
   * @required false
   * @defaultValue null
   * @description
   *  [en] This function renders the toolbar of the page.[/en]
   *  [jp] どうしよう[/jp]
   */
  renderToolbar: React.PropTypes.func,

  /**
   * @name renderBottomToolbar
   * @type function
   * @defaultValue null
   * @description
   *  [en] This function renders the bottom toolbar of the page.[/en]
   *  [jp] どうしよう[/jp]
   */
  renderBottomToolbar: React.PropTypes.func,

  /**
   * @name renderFixed
   * @type function
   * @defaultValue null
   * @description
   *  [en] This function renders fixed content of the page. Can be used to render `Fab` or `SpeedDial` components as well as other components that don't scroll with the page.[/en]
   *  [jp] どうしよう[/jp]
   */
  renderFixed: React.PropTypes.func,

  /**
   * @name onInit
   * @type function
   * @required false
   * @description
   *  [en]
   *  	Fired right after the page is attached.
   *  [/en]
   *  [jp] どうしよう[/jp]
   */
  onInit: React.PropTypes.func,

  /**
   * @name onShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called Fired right after the page is shown.
   *  [/en]
   *  [jp] どうしよう[/jp]
   */
  onShow: React.PropTypes.func,

  /**
   * @name onHide
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called after the page is hidden.
   *  [/en]
   *  [jp] どうしよう[/jp]
   */
  onHide: React.PropTypes.func
};

const NOOP = () => null;

Page.defaultProps = {
  renderToolbar: NOOP,
  renderBottomToolbar: NOOP,
  renderModal: NOOP,
  renderFixed: NOOP
};

export default Page;
