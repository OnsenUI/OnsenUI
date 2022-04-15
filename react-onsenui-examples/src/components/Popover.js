import React from 'react';
import MyToolbar from './MyToolbar';

import {
  Page,
  Button,
  Popover
} from 'react-onsenui';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.showClick = this.showClick.bind(this);
    this.getTarget = this.getTarget.bind(this);
    this.cancel = this.cancel.bind(this);

    this.navigation = React.createRef();
    this.topRight = React.createRef();
    this.button = React.createRef();
    this.stop = React.createRef();
    this.record = React.createRef();
    this.star = React.createRef();
    this.cloud = React.createRef();
    this.pie = React.createRef();
  }

  showClick(target) {
    console.log('target: ' + target);
    this.setState({isOpen: true, target: target});
  }

  getTarget() {
    return this.state.target;
  }

  cancel() {
    console.log('cancel');
    this.setState({isOpen: false});
  }

  render() {
    return (
      <Page
        renderToolbar={() => <MyToolbar title='Popover' />}
        >
      <div className='toolbar'>
        <div className='toolbar__left'>
          <span ref={this.navigation} onClick={() => this.showClick(this.navigation)} className='toolbar-button--outline toolbar__line-height'>
            <i className='ion-ios-menu' style={{fontSize: 32, verticalAlign: -6}}></i>
          </span>
        </div>

        <div className='toolbar__center'>
          Popover demo!
        </div>

        <div className='toolbar__right'>
          <span ref={this.topRight} onClick={() => this.showClick(this.topRight)} className='toolbar-button--outline toolbar__line-height'>Button</span>
        </div>
      </div>

      <div style={{textAlign: 'center'}}>
        <br />
        <br />
        <Button ref={this.button} onClick={() => this.showClick(this.button)}>Click me!</Button>
      </div>

      <div className='tabbar'>
        <label onClick={() => this.showClick(this.stop)} className='tabbar__item'>
          <input type='radio' name='tabbar-b' defaultChecked='checked' />
          <button ref={this.stop} className='tabbar__button'>
            <i className='tabbar__icon ion-ios-square'></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.record)} className='tabbar__item'>
          <input type='radio' name='tabbar-b' />
          <button ref={this.record} className='tabbar__button'>
            <i className='tabbar__icon ion-ios-microphone'></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.star)} className='tabbar__item'>
          <input type='radio' name='tabbar-b' />
          <button ref={this.star} className='tabbar__button'>
            <i className='tabbar__icon ion-ios-star'></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.cloud)} className='tabbar__item'>
          <input type='radio' name='tabbar-b' />
          <button ref={this.cloud} className='tabbar__button'>
            <i className='tabbar__icon ion-ios-cloud-outline'></i>
          </button>
        </label>

        <label onClick={() => this.showClick(this.pie)} className='tabbar__item'>
          <input type='radio' name='tabbar-b' />
          <button ref={this.pie} className='tabbar__button'>
            <i className='tabbar__icon ion-ios-pie'></i>
          </button>
        </label>
      </div>
      <Popover isOpen={this.state.isOpen} onCancel={this.cancel} getTarget={this.getTarget} direction='up down' cancelable>
        <div style={{textAlign: 'center', opacity: 0.5}}>
          <p>This is a popover!</p>
          <p><small>Click the background to remove the popover.</small></p>
        </div>
        </Popover>
    </Page>
    );
  }
};
