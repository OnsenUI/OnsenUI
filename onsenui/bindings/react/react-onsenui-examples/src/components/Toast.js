import React from 'react';

import {Page, Toolbar, Button, BackButton, Toast, Fab} from 'react-onsenui';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      animation: 'default'
    };
  }

  handleShow(shouldShow) {
    this.setState({
      isOpen: shouldShow
    });
  }

  handleAnimation(animation) {
    this.setState({
      animation: animation
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
          <Button modifier="light" onClick={this.handleShow.bind(this, true)}>Show toast</Button>
        </p>

        <p style={{textAlign: 'center', paddingTop: '10px'}}>
          <span style={{color: 'grey'}}>Animation: </span>
          <Button modifier="outline" onClick={this.handleAnimation.bind(this, 'none')}>None</Button>
          <Button modifier="outline" onClick={this.handleAnimation.bind(this, 'ascend')}>Ascend</Button>
          <Button modifier="outline" onClick={this.handleAnimation.bind(this, 'lift')}>Lift</Button>
          <Button modifier="outline" onClick={this.handleAnimation.bind(this, 'fall')}>Fall</Button>
          <Button modifier="outline" onClick={this.handleAnimation.bind(this, 'fade')}>Fade</Button>
        </p>

        <Fab position="bottom left">+</Fab>
        <Fab position="bottom right">-</Fab>

        <Toast isOpen={this.state.isOpen} animation={this.state.animation}>
          <div className="message">
            An error has occurred!
          </div>
          <button onClick={this.handleShow.bind(this, false)}>
            Dismiss
          </button>
        </Toast>
      </Page>
    );
  }
}
