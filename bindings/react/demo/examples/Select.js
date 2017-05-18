import React from 'react';

import {
  Page,
  Select
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifier: ''
    };
    this.editSelects = this.editSelects.bind(this);
  }

  editSelects(event) {
    this.setState({modifier: event.target.value});
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Select' />} >
        <div style={{margin: 50}}>
          <Select id="choose-sel" value={this.state.modifier} modifier={this.state.modifier} onChange={this.editSelects}>
            <option value="basic">Basic</option>
            <option value="material">Material</option>
            <option value="underbar">Underbar</option>
          </Select>
        </div>
      </Page>
    );
  }
}
