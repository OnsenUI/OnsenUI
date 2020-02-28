import React from 'react';

import {
  Page,
  GestureDetector
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { gesture: '' };
  }

  render() {
    const gestures = [
      'Drag',
      'DragLeft',
      'DragRight',
      'DragUp',
      'DragDown',
      'Hold',
      'Release',
      'Swipe',
      'SwipeLeft',
      'SwipeRight',
      'SwipeUp',
      'SwipeDown',
      'Tap',
      'DoubleTap',
      'Pinch',
      'PinchIn',
      'PinchOut',
      'Touch',
      'Transform',
      'Rotate'
    ];

    const funcs = {};
    gestures.forEach(g => {
      funcs['on' + g] = () => this.setState({ gesture: g.toLowerCase() });
    });

    return (
      <Page renderToolbar={() => <MyToolbar title='Select' />} >
        <GestureDetector {...funcs}>
          <div style={{backgroundColor: 'pink', width: '100px', height: '100px'}}>
            Swipe Here
          </div>
        </GestureDetector>

        <p>{this.state.gesture}</p>
      </Page>
    );
  }
}
