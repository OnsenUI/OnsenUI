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
        content: <TabPage active={activeIndex === 0} key='asd1' switchTab={() => { this.setState({index: 1}); }}
        title='Home' tabbar={tabbar} />,
        tab: <Tab key='jio1'
          onClick={() => console.log('click home')}
          label='Home'
          icon='md-home' />
      },
      {
        content: <TabPage active={activeIndex === 1} key='asd2' switchTab={() => { this.setState({index: 0}); }} title='Settings' tabbar={tabbar} />,
        tab: <Tab key='jio2' onClick={() => console.log('click setting', this.state.index)} label='Settings' icon='md-settings' />
      }
    ];
  }

  render() {
    return (
      <Page>
        <Tabbar
          animation={'none'}
          swipeable={true}
          index={this.state.index}
          onPreChange={() => console.log('preChange')}
          onPostChange={(event) =>
            {
              this.setState({index: event.index});
              console.log('postChange', event.index);
            }
          }
          onReactive={() => console.log('reactive')}
          position='bottom'
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}
