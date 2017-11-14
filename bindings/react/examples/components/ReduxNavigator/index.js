import React, {Component} from 'react';

import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import reducer from './reducer';
import {postPush, postPop} from './actions';

import {Page, Toolbar, Button, BackButton, RouterNavigator, RouterUtil} from 'react-onsenui';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(state => console.log('state', store.getState()));

let MyNavigator = ({routeConfig, postPush, postPop}) => {
  const renderPage = route => {
    const props = route.props || {};
    return <route.component {...props} />
  };

  return (
    <RouterNavigator
      routeConfig={routeConfig}
      renderPage={renderPage}
      onPostPush={postPush}
      onPostPop={postPop}
    />
  );
};

const mapStateToProps = state => ({
  routeConfig: state
});

const mapDispatchToProps = ({
  postPush,
  postPop
});

MyNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNavigator);

export default class extends Component {
  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton />
        </div>
        <div className='center'>Redux Navigator</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
				<Provider store={store}>
          <MyNavigator />
				</Provider>
      </Page>
    );
  }
};

