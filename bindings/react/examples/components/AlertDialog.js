import React from 'react';

import {Page, Toolbar, Button, BackButton, AlertDialog, AlertDialogButton} from 'react-onsenui';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleClick() {
    this.setState({
      isOpen: true
    });
  }

  handleCancel() {
    this.setState({
      isOpen: false
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
            Alert dialog
          </div>
        </Toolbar>
        }
        >

        <p style={{textAlign: 'center', paddingTop: '10px'}}>
          <Button onClick={this.handleClick.bind(this)}>Show dialog</Button>
        </p>

        <AlertDialog modifier='rowfooter' maskColor='blue' isOpen={this.state.isOpen} animation='default'
          animationOptions={{
            duration: .5,
            delay: 0.1,
            timing: 'ease-in'
          }}

          onCancel={this.handleCancel.bind(this)} isCancelable={false} >
          <div className="alert-dialog-title">Warning!</div>
          <div className="alert-dialog-content">
            An error has occurred!
          </div>
          <div className="alert-dialog-footer">
            <AlertDialogButton onClick={this.handleCancel.bind(this)}>
              Cancel
            </AlertDialogButton>
            <AlertDialogButton onClick={this.handleCancel.bind(this)}>
              Ok
            </AlertDialogButton>
          </div>
        </AlertDialog>
      </Page>
    );
  }
}
