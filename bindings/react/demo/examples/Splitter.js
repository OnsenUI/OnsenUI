import React from 'react';

import {
  Splitter,
  SplitterSide,
  SplitterContent,
  Page,
  Toolbar,
  Button
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: false,
      openLeft: false,
      openRight: false,
      isSwipeable: true
    };
  }

  handleLeftClose() {
    this.setState({
      openLeft: false
    });
  }

  handleLeftOpen() {
    this.setState({
      openLeft: true
    });
  }

  handleRightClose() {
    this.setState({
      openRight: false
    });
  }

  handleRightOpen() {
    this.setState({
      openRight: true,
    });
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title="Splitter" />} >
        <Splitter>
          <SplitterSide
            side="left"
            width={200}
            collapse={!this.state.showLeft}
            isOpen={this.state.openLeft}
            onClose={this.handleLeftClose.bind(this)}
            onOpen={this.handleLeftOpen.bind(this)}
            isSwipeable={this.state.isSwipeable}>
            <Page>
              <Toolbar>
                <div className="center">content</div>
              </Toolbar>
            </Page>
          </SplitterSide>

          <SplitterContent>
            <Page renderToolbar={() => <MyToolbar title="ons-splitter-content" />}>
              <p>
                <Button
                  onClick={() => this.setState({isSwipeable: !this.state.isSwipeable})}
                >
                  {this.state.isSwipeable ? 'Disable Swipe' : 'Enable Swipeable'}
                </Button>
              </p>
              <p>
                <Button
                  onClick={() => this.setState({showLeft: !this.state.showLeft})}
                  >toggle left menu 2</Button>
              </p>
              <p>
                <Button
                  onClick={() => this.setState({showRight: !this.state.showRight })} > toggle right menu</Button> </p>

              <p>
                <Button
                  onClick={() => this.setState({openLeft: true})}>
                  Open left menu
                </Button>
              </p>

              <p>
                <Button
                  onClick={() => this.setState({openRight: true})}>
                  Open right menu
                </Button>
              </p>
            </Page>
          </SplitterContent>

          <SplitterSide
            side="right"
            width={300}
            collapse={!this.state.showRight}
            isOpen={this.state.openRight}
            onClose={this.handleRightClose.bind(this)}
            onOpen={this.handleRightOpen.bind(this)}
            isSwipeable={this.state.isSwipeable}>
            <Page>
              <Toolbar>
                <div className="center">ons-splitter-side</div>
              </Toolbar>
            </Page>
          </SplitterSide>
        </Splitter>
      </Page>
    );
  }
}
