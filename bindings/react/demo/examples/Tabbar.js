import React from 'react';

import {Tabbar, Tab, Page, Button} from 'react-onsenui';
import MyToolbar from './MyToolbar';

class TabPage extends React.Component {
  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title={this.props.title} />} >
        {this.props.active
          ? <p>This is the <strong>{this.props.title}</strong> page.</p>
          : null}
        <Button onClick={this.props.switchTab}>Go to the other tab</Button>
      </Page>
    );
  }
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 1
    };
    this.renderTabs = this.renderTabs.bind(this);
  }

  renderTabs(activeIndex, tabbar) {
    console.log('index : ' , activeIndex);
    return [
      {
        content: <TabPage switchTab={() => { this.setState({index: 1}); }}
        title='Home' active={activeIndex == 0} tabbar={tabbar} />,
        tab: <Tab
          onClick={() => console.log('click home')}
          label='Home'
          icon='md-home' />
      },
      {
        content: <TabPage
          switchTab={() => { this.setState({index: 0}); }}

        title='Settings' active={activeIndex == 1} tabbar={tabbar} />,
        tab: <Tab onClick={() => console.log('click setting')} label='Settings' icon='md-settings' />
      }
    ];
  }

  render() {
    return (
      <Page>
        <Tabbar
          index={this.state.index}
          onPreChange={(event) =>
            {
              this.setState({index: event.index});
              console.log('preChange', event.index);
            }
          }
          onPostChange={() => console.log('postChange')}
          onReactive={() => console.log('postChange')}
          position='bottom'
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}
