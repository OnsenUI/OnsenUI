import React from 'react';

import {Page, Toolbar, Button, BackButton, ActionSheet, ActionSheetButton} from 'react-onsenui';

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
            Action sheet
          </div>
        </Toolbar>
        }
        >

        <p style={{textAlign: 'center', paddingTop: '10px'}}>
          <Button onClick={this.handleClick.bind(this)}>Show dialog</Button>
        </p>

        <ActionSheet maskColor='blue' isOpen={this.state.isOpen} animation='default'
          animationOptions={{
            duration: 0.6,
            delay: 0.1,
            timing: 'ease-in'
          }}
          onCancel={this.handleCancel.bind(this)}
          isCancelable={true}
          title={'Description'}
        >
          <ActionSheetButton onClick={this.handleCancel.bind(this)}>Label1</ActionSheetButton>
          <ActionSheetButton onClick={this.handleCancel.bind(this)}>Label2</ActionSheetButton>
          <ActionSheetButton onClick={this.handleCancel.bind(this)} modifier={'destructive'}>Label3</ActionSheetButton>
          <ActionSheetButton onClick={this.handleCancel.bind(this)} icon={'md-close'}>Cancel</ActionSheetButton>
        </ActionSheet>
      </Page>
    );
  }
}
