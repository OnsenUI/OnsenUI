import React from 'react';

import {
  Page,
  Toolbar,
  ToolbarButton,
  BackButton,
  Input,
  Checkbox,
  Radio,
  SearchInput
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'text',
      selected: [1],
      selected2: 1
    };
  }

  handleCheckbox(idx, event) {
    const selected = this.state.selected;

    if (event.target.checked && selected.indexOf(idx) < 0) {
      selected.push(idx);
    }
    else if(!event.target.checked) {
      selected.splice(selected.indexOf(idx), 1);
    }

    this.setState({selected: selected});
  }

  handleRadio(idx, event) {
    if (event.target.checked) {
      this.setState({selected2: idx});
    }
  }

  render() {
    return (
      <Page
        renderToolbar = { () => <Toolbar>
          <div className='left'><BackButton>Back</BackButton></div>
          <div className='center'>Input</div>
        </Toolbar>
        }
        >
        <p>
        Please enter a text
        </p>
          <Input disabled={false} value={this.state.text} float onChange={event => this.setState({text: event.target.value}) } modifier='material' placeholder='Username'></Input>

          <input value={this.state.text} onChange={event => this.setState({text: event.target.value})} />

          <SearchInput disabled={false} value={this.state.text} onChange={event => this.setState({text: event.target.value}) } modifier='material' placeholder='Search' />

          <div> Text : {this.state.text} </div>

        <h2>Checkboxes</h2>

        {
          [0, 1, 2].map((idx) => (
            <div>
              <input
                type='checkbox'
                onChange={this.handleCheckbox.bind(this, idx)}
                checked={this.state.selected.indexOf(idx) >= 0}
              />

              <Checkbox
                onChange={this.handleCheckbox.bind(this, idx)}
                checked={this.state.selected.indexOf(idx) >= 0}
              />
            </div>
          ))
        }
        <p>Selected: [{this.state.selected.join(', ')}]</p>

        <h2>Radio buttons</h2>

        {
          [0, 1, 2].map((idx) => (
            <div>
              <input
                type='radio'
                onChange={this.handleRadio.bind(this, idx)}
                checked={idx === this.state.selected2}
              />

              <Radio
                onChange={this.handleRadio.bind(this, idx)}
                checked={idx === this.state.selected2}
              />
            </div>
          ))
        }

        <p>Selected: {this.state.selected2}</p>
      </Page>
    );
  }
}
