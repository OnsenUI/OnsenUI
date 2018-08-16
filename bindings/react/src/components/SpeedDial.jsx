import SimpleWrapper from './SimpleWrapper.jsx';

import PropTypes from 'prop-types';

/**
 * @original ons-speed-dial
 * @category control
 * @tutorial react/Reference/speed-dial
 * @description
 * [en] Element that displays a Material Design Speed Dialog component. It is useful when there are more than one primary action that can be performed in a page.
 *  The Speed dial looks like a `Fab` element but will expand a menu when tapped.
 [/en]
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
class SpeedDial extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-speed-dial';
  }
}

SpeedDial.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the speed dial.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name position
   * @type string
   * @description
   *  [en]Specify the vertical and horizontal position of the component.
   *     I.e. to display it in the top right corner specify "right top".
   *     Choose from "right", "left", "top" and "bottom".
[/en]
   *  [ja][/ja]
   */
  position: PropTypes.string,

  /**
   * @name direction
   * @type string
   * @description
   *  [en]Specify the direction the items are displayed. Possible values are "up", "down", "left" and "right".[/en]
   *  [ja][/ja]
   */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  /**
   * @name disabled
   * @type string
   * @description
   *  [en]Specify if button should be disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

export default SpeedDial;
