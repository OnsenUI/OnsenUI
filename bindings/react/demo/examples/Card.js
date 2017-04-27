import React from 'react';

import {
  Page,
  Card
} from '../../src/index.js';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Card' />} >
        <div style={{margin: 50}}>
          <Card>
            <div className="title">Card title</div>
            <div className="content">Card content</div>
          </Card>
        </div>
      </Page>
    );
  }
}
