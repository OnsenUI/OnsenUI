import React from 'react';

import {
  Page,
  ProgressBar,
  ProgressCircular
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifier: 'material',
      value: 0,
      secondValue: 100
    };

    this.increaseTime = this.increaseTime.bind(this);
    this.increaseTime();
  }

  increaseTime() {
    this.timeout = setTimeout(() => {
      let val = this.state.value + 5;
      if (val > 100) val -= 100;
      this.setState({value: val}, this.increaseTime);
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <Page
        renderToolbar={() => <MyToolbar title='ProgresBar' />}
        modifier={this.state.modifier} >
        <br />
        <p>
          Progress Bar:
        </p>
          <ProgressBar value={this.state.value} />
          <ProgressBar value={55} secondaryValue={87} />
          <ProgressBar indeterminate />
        <br />
        <p>
          Circular Progress Bar:
        </p>
          <ProgressCircular value={this.state.value} />
          <ProgressCircular value={55} secondaryValue={87} />
          <ProgressCircular indeterminate />
      </Page>
    );
  }
}
