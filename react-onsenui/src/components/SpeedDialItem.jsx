import SimpleWrapper from './SimpleWrapper.jsx';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

/**
 * @original ons-speed-dial-item
 * @category control
 * @tutorial react/Reference/speed-dial
 * @description
 * [en] This component displays the child elements of the Material Design Speed dial component. [/en]
 * [ja][/ja]
 * @example
 * <SpeedDial disabled={false} direction='right' onClick={() => console.log('test1')} position='left bottom'>
     <Fab>
       <Icon icon='fa-twitter' size={26} fixedWidth={false} style={{verticalAlign: 'middle'}} />
     </Fab>
     <SpeedDialItem onClick={() => console.log('speed A')}> A </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed B')}> B </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed C')}> C </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed D')}> D </SpeedDialItem>
   </SpeedDial>
 */
class SpeedDialItem extends SimpleWrapper {
  constructor(...args) {
    super(...args);

    this.onClick = event => {
      if (this.props.onClick) {
        return this.props.onClick(event);
      }
    };
  }

  _getDomNodeName() {
    return 'ons-speed-dial-item';
  }

  componentDidMount() {
    super.componentDidMount();
    var node = ReactDOM.findDOMNode(this);
    node.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this);
    node.removeEventListener('click', this.onClick);
  }
}

SpeedDialItem.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en] This function will be called ones the button is clicked. [/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

export default SpeedDialItem;
