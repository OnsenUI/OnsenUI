import React from 'react';

import {
  Page,
  Select,
  Button
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifier: 'basic'
    };

    this.editSelects = event => {console.log('change!');this.setState({modifier: event.target.value})};
    this.click = () => this.setState({ modifier: 'material' });
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Select' />} >
        <div style={{margin: 50}}>
          <Button onClick={this.click}>Set Material</Button>
          <br />
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
