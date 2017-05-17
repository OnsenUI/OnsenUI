import React from 'react';

import {Page, Button} from 'react-onsenui';

import MyToolbar from './MyToolbar';

class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('props');
    console.log(this.props);
    return (
      <Page>
        lala
        <Button onClick={() => this.props.navigator.popPage()}> Pop </Button>
      </Page>
    );
  }
};

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifier: 'material'
    };
  }

  toggleModifier() {
    this.setState({
      modifier: this.state.modifier === 'material' ? '' : 'material'
    });
  }

  render() {
    return (
      <Page
        contentStyle={{padding: 40}}
        renderToolbar={() => <MyToolbar title='Page' />}
        modifier={this.state.modifier} >
        <p>
          This is a page!
        </p>
        <p>
          <Button modifier={this.state.modifier} onClick={this.toggleModifier.bind(this)}>Switch modifier</Button>
          <br />
          <br />
          <Button modifier={this.state.modifier} onClick={
            () =>
            this.props.navigator.replacePage({
               title: 'Input',
               component: Page2,
               props: {
                 navigator: this.props.navigator
               }
            })
          }> Replace Page </Button>
        </p>
      </Page>
    );
  }
}
