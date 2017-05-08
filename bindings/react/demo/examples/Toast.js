import React from 'react';

import {Page, Toolbar, Button, BackButton, Toast, Fab} from '../../src/index.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleClick(shouldShow) {
    this.setState({
      isOpen: shouldShow
    });
  }

  render() {
    return (
      <Page
        renderToolbar={
          () => <Toolbar>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
          <div className="center">
            Toast
          </div>
        </Toolbar>
        }
        >

        <p style={{textAlign: 'center', paddingTop: '10px'}}>
          <Button onClick={this.handleClick.bind(this, true)}>Show toast</Button>
        </p>

        <Fab position="bottom left">+</Fab>
        <Fab position="bottom right">-</Fab>

        <Toast isOpen={this.state.isOpen} animation='default'>
          <div className="message">
            An error has occurred!
          </div>
          <button onClick={this.handleClick.bind(this, false)}>
            Dismiss
          </button>
        </Toast>
      </Page>
    );
  }
}
