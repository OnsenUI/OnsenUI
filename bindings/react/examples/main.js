import React from 'react';
import ReactDOM from 'react-dom';

import ons from 'onsenui';

import {
  Page,
  Navigator,
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

class App extends React.Component {
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, route.props);
  }

  render() {
    ons.mockStatusBar();
    return (
      <Navigator
        swipeable={true}
        renderPage={this.renderPage}
        onPrePush={e => console.log('prepush', e)}
        onPostPush={e => console.log('postpush', e)}
        onPrePop={e => console.log('prepop', e)}
        onPostPop={e => console.log('postpop', e)}
        initialRoute={{
          component: Examples,
          props: {
            key: 'examples'
          }
        }}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
