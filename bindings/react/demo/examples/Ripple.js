import React from 'react';

import {Button, Page, Ripple, Icon} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page
        renderToolbar={() => <MyToolbar title="Page" />}
        >
          <div style={
            {width: 100,
              height: 100,
              margin: 10,
              background: 'lightgrey'}}>
              <Ripple color='red' background='blue' disabled={false} />

          </div>
      </Page>
    );
  }
}
