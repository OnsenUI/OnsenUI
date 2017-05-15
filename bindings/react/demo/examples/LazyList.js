import React from 'react';

import MyToolbar from './MyToolbar';
import ons from 'onsenui';

import {
  Page,
  BackButton,
  Button,
  ListItem,
  LazyList,
  Toolbar
} from 'react-onsenui';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      length: 0
    };
  }

  renderRow(index) {
    return (
      <ListItem key={index}>
        {'Item ' + (index + 1)}
      </ListItem>
    );
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='LazyList' />} >
        <div style={{height: 100}}>
          <Button id='btn1' onClick={() => this.setState({length: 10})} > Change Length 10 </Button>
          <Button id='btn2' onClick={() => this.setState({length: 100})} > Change Length 100 </Button>
          <LazyList
            length={this.state.length}
            renderRow={this.renderRow}
            calculateItemHeight={() => ons.platform.isAndroid() ? 76 : 45}
          />
        </div>
      </Page>
    );
  }
}

