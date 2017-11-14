import React from 'react';

import {
  Page,
  Toolbar,
  BackButton,
  Segment,
  Tabbar,
  Tab,
  Button
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

class TabPage extends React.Component {
  render() {
    return (
      <Page>
        {this.props.active
          ? <h2>{this.props.title}</h2>
          : null}
        <Button onClick={this.props.logIndexes}>Log current button index</Button>
      </Page>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <Page>
        {this.props.active
          ? <h2>{this.props.title}</h2>
          : null}
        <Button onClick={this.props.changeTab}>Chang tab via tabbar</Button>
        <Button onClick={this.props.changeButton}>Change tab via segment</Button>
        <Button onClick={this.props.logIndexes}>Log current button index</Button>
      </Page>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentIndex: 0,
      tabbarIndex: 0
    };
    this.renderTabs = this.renderTabs.bind(this);
    this.onPostChange = (event) => {
      console.log('segment postchange', event.index);
      this.setState({ segmentIndex: event.index});
    };

    this.logIndexes = () => console.log('segment index:', this.state.segmentIndex, 'tabbar index:', this.state.tabbarIndex);
  }

  renderTabs(activeIndex, tabbar) {
    return [
      {
        content: <HomePage key="page1" title="Page1" active={activeIndex == 0} tabbar={tabbar}
          logIndexes={this.logIndexes}
          changeTab={() => this.setState({ tabbarIndex: 1 })}
          changeButton={() => this.setState({ segmentIndex: 1 })}
        />,
        tab: <Tab key="page1" />
      },
      {
        content: <TabPage key="page2" title="Page2" active={activeIndex == 1} tabbar={tabbar}
          logIndexes={this.logIndexes}
        />,
        tab: <Tab key="page2" />
      },
      {
        content: <TabPage key="page3" title="Page3" active={activeIndex == 2} tabbar={tabbar}
          logIndexes={this.logIndexes}
        />,
        tab: <Tab key="page3" />
      }
    ];
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">
          <Segment index={this.state.segmentIndex} onPostChange={this.onPostChange} tabbarId="tabbar" style={{ width: '280px' }}>
            <button>Page 1</button>
            <button>Page 2</button>
            <button>Page 3</button>
          </Segment>
        </div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)} >

        {/* Comment <Tabbar> out to test this one */}
        <Segment index={1} style={{ width: '280px', margin: '10px 20px' }}>
          <button>Label 1</button>
          <button>Label 2</button>
          <button>Label 3</button>
        </Segment>

        <Tabbar
          swipeable
          id="tabbar"
          index={this.state.tabbarIndex}
          onPreChange={(event) => {
            this.setState({ tabbarIndex: event.index });
          }}
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}
