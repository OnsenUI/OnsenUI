import React from 'react';
import ReactDOM from 'react-dom';
import MyToolbar from './MyToolbar';

import {
  Page,
  Button,
  Navigator,
  Toolbar,
  List,
  ListItem,
  Ripple,
  Carousel,
  CarouselItem,
  BottomToolbar,
  ToolbarButton
} from 'react-onsenui';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      items: [
        'gray',
        'red',
        'orange',
        'blue'
      ]
    };
    this.goTo = this.goTo.bind(this);
  }

  goTo(number) {
    console.log('number', number);
    this.setState({index: number});
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Fullscreen' />}>
        <Carousel
          animationOptions={{
            duration: 1.0,
            delay: 0.3,
            timing: 'ease-in'
          }}
          index={this.state.index}
          onPostChange={(event) => this.setState({index: event.activeIndex})}
          onOverscroll={() => console.log('onOverscroll')}
          onRefresh={() => console.log('onRefresh')}
          ref='carousel' swipeable overscrollable autoScroll fullscreen autoScrollRatio={0.2}>

          {this.state.items.map((item) =>
            <CarouselItem style={{backgroundColor: item}}>
              <div className='item-label'>{item}</div>
              {this.state.items.map((item, index) =>
                <Button onClick={() => this.goTo(index)}> Go to page {index + 1}</Button>
              )}
              <Button onClick={() => this.setState({items: this.state.items.slice(0, this.state.items.length - 1)})}>Remove</Button>
              <Button onClick={() => this.setState({items: [...this.state.items, 'yellow']})}>Add</Button>
            </CarouselItem>
          )}
        </Carousel>

        <BottomToolbar>
          <ToolbarButton style={{float: 'right'}} onClick={this.moveRight}>Next</ToolbarButton>
          <ToolbarButton style={{float: 'left'}} onClick={this.moveLeft}>Prev</ToolbarButton>
        </BottomToolbar>
      </Page>
    );
  }
};
