import React from 'react';

import {
  Page,
  Range
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.changeFirstRange = this.changeFirstRange.bind(this);
    this.changeSecondRange = this.changeSecondRange.bind(this);
    this.state = {value: 20, value2: 50};
  }

  changeFirstRange(event) {
    console.log(event.target.value);
    this.setState({
      value: parseInt(event.target.value)
    });
  }

  changeSecondRange(event) {
    this.setState({
      value2: parseInt(event.target.value)
    });
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Range' />} >
        <div style={{margin: 50}}>
          <Range value={this.state.value} onChange={this.changeFirstRange} />
          <span> {this.state.value} </span>
          <br />
          <Range modifier='material' onChange={this.changeSecondRange} value={this.state.value2} />
          <span> {this.state.value2} </span>
          <br />

        </div>
      </Page>
    );
  }
}
