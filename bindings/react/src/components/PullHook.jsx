import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import Util from './Util.js';

/**
 * @original ons-pull-hook
 * @category control
 * @tutorial react/Reference/pull-hook
 * @description
 * [en]  Component that adds **Pull to refresh** functionality to an `<ons-page>` element.
 *     It can be used to perform a task when the user pulls down at the top of the page. A common usage is to refresh the data displayed in a page.
 [/en]
 * [ja][/ja]
 * @example

    return (
      <PullHook onChange={this.onChange} onLoad={this.onLoad}>
      {
       (this.state.pullHookState === 'initial') ?
        <span >
          <Icon size={35} spin={false} icon='ion-arrow-down-a' />
          Pull down to refresh
        </span> :
        (this.state.pullHookState === 'preaction') ?
         <span>
           <Icon size={35} spin={false} icon='ion-arrow-up-a' />
           Release to refresh
        </span>
        :
        <span><Icon size={35} spin={true} icon='ion-load-d'></Icon> Loading data...</span>
    }
      </PullHook>
    );
 */
class PullHook extends BasicComponent {
  constructor(...args) {
    super(...args);

    this.onChange = (event) => {
      if (this.props.onChange) {
        return this.props.onChange(event);
      }
    };
  }

  componentDidMount() {
    super.componentDidMount();
    const node = ReactDOM.findDOMNode(this);
    node.addEventListener('changestate', this.onChange);
    this._pullHook.onAction = this.props.onLoad || null;
    this._pullHook.onPull = this.props.onPull || null;
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    node.removeEventListener('changestate', this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (this.props.onLoad !== prevProps.onLoad) {
      this._pullHook.onAction = this.props.onLoad;
    }
    if (this.props.onPull !== prevProps.onPull) {
      this._pullHook.onPull = this.props.onPull;
    }
  }

  render() {
    const attrs = Util.getAttrs(this);
    return <ons-pull-hook { ...attrs } ref={(pullHook) => { this._pullHook = pullHook; }} />;
  }
}

PullHook.propTypes = {
  /**
   * @name onChange
   * @type function
   * @required false
   * @description
   *  [en]Called when the pull hook inner state is changed. The state can be either "initial", "preaction" or "action"[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name onLoad
   * @type function
   * @required false
   * @description
   *  [en]Called when the pull hook is in the `action` state[/en]
   *  [ja][/ja]
   */
  onLoad: PropTypes.func,

  /**
   * @name onPull
   * @type function
   * @required false
   * @description
   *  [en]Hook called whenever the user pulls the element. It gets the pulled distance ratio (scroll / height) and an animationOptions object as arguments.[/en]
   *  [ja][/ja]
   */
  onPull: PropTypes.func,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] When set to true, the pull hook will be disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name height
   * @type number
   * @description
   *  [en] The height of the pull hook in pixels. The default value is 64.[/en]
   *  [ja][/ja]
   */
  height: PropTypes.number,

  /**
   * @name thresholdHeight
   * @type number
   * @description
   *  [en] The threshold height of the pull hook in pixels. The default value is 96.[/en]
   *  [ja][/ja]
   */
  thresholdHeight: PropTypes.number,

  /**
   * @name maxHeight
   * @type number
   * @description
   *  [en] The max height of the pull hook in pixels when threshold is a negative value. The default value is 96.[/en]
   *  [ja][/ja]
   */
  maxHeight: PropTypes.number,

  /**
   * @name fixedContent
   * @type number
   * @description
   *  [en] If set to true, the content of the page will not move when pulling.[/en]
   *  [ja][/ja]
   */
  fixedContent: PropTypes.bool
};

export default PullHook;
