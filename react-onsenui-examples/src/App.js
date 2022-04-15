import React from 'react';
import ons from 'onsenui';
import { Navigator } from 'react-onsenui';
import Examples from './Examples';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class App extends React.Component {
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, props);
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

export default App;
