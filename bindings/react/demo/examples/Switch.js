import React from 'react';

import {
  Page,
  Toolbar,
  ToolbarButton,
  BackButton,
  Input,
  Switch
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: true};
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({checked: event.target.checked});
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Switch' />} >
        <div style={{textAlign: 'center'}}>
          <h1>Page Content</h1>
          <Input type='checkbox' checked={this.state.checked} onChange={this.onChange} />
          <br />
          <Switch disabled={false} checked={this.state.checked} onChange={this.onChange} />
          <p />
          <div style={{marginTop: 10}}> The switch is {this.state.checked ? 'on' : 'off'} </div>
        </div>
      </Page>
    );
  }
};
