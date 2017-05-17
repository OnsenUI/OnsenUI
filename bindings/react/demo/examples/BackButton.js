import React from 'react';

import ons from 'onsenui'

import {
  Page,
  Toolbar,
  BackButton,
} from 'react-onsenui';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    ons.notification.confirm('Do you really want to go back?')
      .then(
        (response) => {
          if (response === 1) {
            this.props.navigator.popPage();
          }
        }
      );
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={this.handleClick.bind(this)}>
            Back
          </BackButton>
        </div>
        <div className='center'>Back button</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page
       renderToolbar={this.renderToolbar.bind(this)}
      >
      </Page>
    );
  }
}
