import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-speed-dial-item';

import onsCustomElement from '../onsCustomElement';

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
const SpeedDialItem = onsCustomElement('ons-speed-dial-item');

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
   *  [en]This function will be called when the button is clicked.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

export default SpeedDialItem;
