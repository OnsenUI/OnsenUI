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
      'drag', 'dragleft', 'dragright', 'dragup', 'dragdown',
      'hold', 'release',
      'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
      'tap', 'doubletap',
      'pinch', 'pinchin', 'pinchout',
      'touch', 'transform', 'rotate'
    ];

    const funcs = {};
    gestures.forEach(g => {
      const propName = 'on' + g.charAt(0).toUpperCase() + g.slice(1);
      funcs[propName] = () => this.setState({ gesture: g });
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
