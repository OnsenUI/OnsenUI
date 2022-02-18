import React from 'react';

import {
  Page,
  Icon,
  Fab,
  SpeedDial,
  SpeedDialItem,
  Toolbar,
  BackButton
} from 'react-onsenui';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifier: 'material',
    };
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton>Back</BackButton>
        </div>
        <div className='center'>
          Speed Dial
        </div>
      </Toolbar>
    );
  }

  renderFixed() {
    return (
      <SpeedDial disabled={false} direction='up' onClick={() => console.log('test1')} position='bottom right'>
        <Fab>
          <Icon
            icon='fa-twitter'
            size={26}
            fixedWidth={false}
            style={{verticalAlign: 'middle'}} />
        </Fab>
        <SpeedDialItem onClick={() => console.log('speed A')}> A </SpeedDialItem>
        <SpeedDialItem onClick={() => console.log('speed B')}> B </SpeedDialItem>
        <SpeedDialItem onClick={() => console.log('speed C')}> C </SpeedDialItem>
        <SpeedDialItem onClick={() => console.log('speed D')}> D </SpeedDialItem>
      </SpeedDial>
    );
  }

  render() {
    return (
      <Page renderFixed={this.renderFixed} renderToolbar={this.renderToolbar}>
      </Page>
    );
  }
}
