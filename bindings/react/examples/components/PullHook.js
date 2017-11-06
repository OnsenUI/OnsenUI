import React from 'react';

import {
  Page,
  PullHook,
  Fab,
  Icon,
  Toolbar,
  List,
  ListItem
} from 'react-onsenui';

import MyToolbar from './MyToolbar.js';

class MyPullHook extends React.Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {pullHookState: 'initial'};
  }

  onLoad(done) {
    setTimeout(done, 1000);
  }

  onChange(event) {
    console.log('state : ' + event.state);
    this.setState({pullHookState: event.state});
  }

  render() {
    var child;

    if (this.state.pullHookState === 'initial') {
      child = <span >
        <Icon
          size={35}
          spin={false}
          icon='ion-arrow-down-a' />
        Pull down to refresh
        </span>;
    } else if (this.state.pullHookState === 'preaction') {
      child = <span><Icon size={35} spin={false} icon='ion-arrow-up-a'></Icon> Release to refresh</span>;
    } else {
      child = <span><Icon size={35} spin={true} icon='ion-load-d'></Icon> Loading data...</span>;
    }

    return (
      <PullHook onChange={this.onChange} onLoad={this.onLoad}>
        {child}
      </PullHook>
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

  render() {
    return (
      <Page
        renderToolbar={() => <MyToolbar title='Dialog' />}
        renderFixed={() => <Fab position='bottom right'><Icon icon='md-plus' /></Fab>}>
        <MyPullHook />

        <List
          dataSource={[1, 2, 3, 4]}
          renderRow={(data) => <ListItem>{data}</ListItem>} />
      </Page>
    );
  }
}
