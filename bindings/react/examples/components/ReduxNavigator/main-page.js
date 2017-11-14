import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Page, Toolbar, Button, BackButton, RouterNavigator, RouterUtil} from 'react-onsenui';

import {pushPage} from './actions';
import MyToolbar from './my-toolbar';
import SecondaryPage from './secondary-page';

let MainPage = ({dispatch}) => {
  const route = {
    component: SecondaryPage,
    props: {
      key: 'secondary'
    }
  };

  return (
    <Page
      renderToolbar={() => <MyToolbar title='Main page' />}
    >
      <div style={{
        textAlign: 'center',
        margin: 10
      }}>
        <Button
          onClick={() => dispatch(pushPage(route))}
        >
          Push page
        </Button>
      </div>
    </Page>
  );
};

MainPage = connect()(MainPage);

export default MainPage;
