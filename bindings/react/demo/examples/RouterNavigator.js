import React, {Component} from 'react';

import {Page, Toolbar, Button, BackButton, RouterNavigator, RouterUtil} from 'react-onsenui';

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

const ThirdPage = ({popPage}) => {
  return (
    <Page
      renderToolbar={() => <MyToolbar title='Third page' onBackButton={popPage} />}
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

const SecondPage = ({pushPage, popPage}) => {
  return (
    <Page
      renderToolbar={() => <MyToolbar title='Second page' onBackButton={popPage} />}
    >
      <div style={{
        textAlign: 'center',
        margin: 10
      }}>
        <Button
          onClick={() => pushPage(ThirdPage, 'third')}
        >
          Push page
        </Button>
        <Button
          onClick={popPage}
        >
          Pop page
        </Button>
      </div>
    </Page>
  );
};

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
          onClick={() => pushPage(SecondPage, 'second')}
        >
          Push page
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
          pushPage: (...args) => this.pushPage(...args)
        }
    }]);

    this.state = {routeConfig};

  }

  pushPage(page, key) {
    const route = {
      component: page,
      props: {
        key: key,
        popPage: () => this.popPage(),
        pushPage: (...args) => this.pushPage(...args)
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
      routeConfig,
      options: {
        animationOptions: {duration: 2}
      }
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
