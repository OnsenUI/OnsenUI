import React from 'react';
import {
  Page,
  Toolbar,
  List,
  ListItem
} from 'react-onsenui';

import * as examples from './components';

class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.state = {class: 'test'};
  }

  getExamples() {
    return Object.keys(examples).sort().map(key => ({ title: key, component: examples[key] }));
  }

  goto(example) {
    this.props.navigator.pushPage({
      component: example.component,
      props: {
        key: example.title
      }
    });
  }

  render() {
    return (
      <Page style={{background: 'green'}}
        renderToolbar={() => <Toolbar> <div className='center'> Up Toolbar </div> </Toolbar>}
      >
        <List modifier='inset'
          dataSource={this.getExamples()}
          renderHeader={() =>
            <ListItem lockOnDrag style={{background: 'green'}} tappable tap-background-color='red'> HEADER </ListItem>
          }
          renderRow={(example) => (
            <ListItem key={example.title} onClick={this.goto.bind(this, example)}>{example.title}</ListItem>
          )}
        />
      </Page>
    );
  }
}

export default Examples;
