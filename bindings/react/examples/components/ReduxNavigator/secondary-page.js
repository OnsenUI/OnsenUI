import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Page, Toolbar, Button, BackButton, RouterNavigator, RouterUtil} from 'react-onsenui';

import MyToolbar from './my-toolbar';
import {popPage} from './actions';

let SecondaryPage = ({dispatch}) => {
  return (
    <Page
      renderToolbar={() => <MyToolbar title='Second page' onBackButton={() => dispatch(popPage())} />}
    >
      <div style={{
        textAlign: 'center',
        margin: 10
      }}>
        <Button
          onClick={() => dispatch(popPage())}
        >
          Pop page
        </Button>
      </div>
    </Page>
  );
};

SecondaryPage = connect()(SecondaryPage);

export default SecondaryPage;
