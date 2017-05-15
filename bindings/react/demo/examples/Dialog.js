import React from 'react';

import {
  Page,
  Button,
  Toolbar,
  Dialog,
  Navigator,
  Input
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

import ons from 'onsenui';

class MyPage2 extends React.Component {
  render() {
    return (
      <Page>
          <Toolbar inline>
            <div className='center'>Description</div>
          </Toolbar>
          <br />
          <div style={{textAlign: 'center'}}>
            <Input value={this.props.description} onChange={this.props.onChange} />
            <p>
              <Button modifier='light' onClick={this.props.popPage}>Previous</Button>
            </p>
          </div>
      </Page>
    );
  }
};

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<Page>
      <Toolbar inline>
        <div className='center'>Name</div>
      </Toolbar>
      <br />
      <div style={{textAlign: 'center'}}>
        <Input value={this.props.name} onChange={this.props.onNameChanged} />
        <p>
          <Button modifier='light' onClick={this.props.pushPage}>Next</Button>
        </p>
      </div>
    </Page>);
  }
};

class MyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.popPage = this.popPage.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  popPage() {
    this.refs.navi.popPage();
  }

  pushPage() {
    this.refs.navi.pushPage(
      {comp: MyPage2, props: {onChange: this.onDescriptionChanged, popPage: this.popPage}});
      // <MyPage2 description={this.props.description} onChange={this.onDescriptionChanged} popPage={this.popPage} />);
  }

  onNameChanged(event) {
    this.props.onNameChanged(event.target.value);
  }

  onDescriptionChanged(event) {
    console.log('description changed');
    this.props.onDescriptionChanged(event.target.value);
  }

  renderPage(route, navigator) {
    var comp = route.comp;
    var props = route.props;
    props.description = this.props.description;
    props.name = this.props.name;

    return React.createElement(comp, props);
  }

  render() {
    return (
      <Dialog
        onCancel={this.props.onCancel} isOpen={this.props.isOpen} animation='default' cancelable>
      <Navigator animation='slide' ref='navi'
        initialRoute={{comp: FirstPage, props: {
          pushPage: this.pushPage, onNameChanged: this.onNameChanged }}}
        renderPage={this.renderPage}>
       </Navigator>
    </Dialog>
    );
  }
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      name: '',
      description: ''
    };

    this.hide = this.hide.bind(this);
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.showAlert2 = this.showAlert2.bind(this);
  }

  hide() {
    console.log('call hide');
    this.setState({dialogOpen: false});
  }

  onNameChanged(value) {
    this.setState({name: value});
  }

  onDescriptionChanged(value) {
    this.setState({description: value});
  }

  showAlert() {
    this.setState({dialogOpen: true});
  }

  showAlert2() {
    ons.notification.alert({
      message: 'You pressed "ok"'
    });
  }

  render() {
    return (
      <Page
        renderToolbar={() => <MyToolbar title='Dialog' />}>
      <div style={{textAlign: 'center'}}>
        <h1>Page Content</h1>
        <Button onClick={this.showAlert2}> Hello </Button>
        <Button onClick={this.showAlert}> Show Alert </Button>
        <div> Name : {this.state.name} </div>
        <div> Description : {this.state.description} </div>
      </div>
      <MyDialog onCancel={this.hide} name={this.state.name} description={this.state.description}
        onNameChanged={this.onNameChanged}
        onDescriptionChanged={this.onDescriptionChanged}
        isOpen={this.state.dialogOpen} />
    </Page>
    );
  }
};
