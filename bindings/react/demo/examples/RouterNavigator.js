import React, {Component} from 'react';

import {Page, Toolbar, Button, BackButton, RouterNavigator, RouterUtil} from '../../src/index.js';

const MyToolbar = ({title, onBackButton = null}) => (
  <Toolbar>
    {
      onBackButton
      ? <div className='left'><BackButton onClick={onBackButton} /></div>
      : null
    }
    <div className='center'>{title}</div>
  </Toolbar>
);

const MainPage = ({pushPage}) => {
  return (
    <Page
      renderToolbar={() => <MyToolbar title='Main page' />}
    >
      <div style={{
        textAlign: 'center',
        margin: 10
      }}>
        <Button
          onClick={pushPage}
        >
          Push page
        </Button>
      </div>
    </Page>
  );
};

const SecondaryPage = ({popPage}) => {
  return (
    <Page
      renderToolbar={() => <MyToolbar title='Second page' onBackButton={popPage} />}
    >
      <div style={{
        textAlign: 'center',
        margin: 10
      }}>
        <Button
          onClick={popPage}
        >
          Pop page
        </Button>
      </div>
    </Page>
  );
};

export default class extends Component {
  constructor(props) {
    super(props);

    const routeConfig = RouterUtil.init([{
        component: MainPage,
        props: {
          key: 'main',
          pushPage: () => this.pushPage()
        }
    }]);

    this.state = {routeConfig};

  }

  pushPage() {
    const route = {
      component: SecondaryPage,
      props: {
        key: 'secondary',
        popPage: () => this.popPage()
      }
    };

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route
    });

    this.setState({routeConfig});
  }

  popPage() {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig
    });

    this.setState({routeConfig});
  }

  onPostPush() {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({routeConfig});
  }

  onPostPop() {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({routeConfig});
  }

  renderPage(route) {
    const props = route.props || {};
    return <route.component {...props} />;
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton />
        </div>
        <div className='center'>Stateless Navigator</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <RouterNavigator
          routeConfig={this.state.routeConfig}
          renderPage={this.renderPage}
          onPostPush={() => this.onPostPush()}
          onPostPop={() => this.onPostPop()}
        />
      </Page>
    );
  }
}
