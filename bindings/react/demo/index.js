import React from 'react';
import ReactDOM from 'react-dom';

import 'onsenui';

import '../../../build/css/onsenui.css';
import '../../../build/css/onsen-css-components.css';

import {
  Page,
  Navigator,
  Toolbar,
  List,
  ListItem
} from 'react-onsenui';

import PageExample from './examples/Page';
import ListExample from './examples/List';
import CardExample from './examples/Card';
import LazyListExample from './examples/LazyList';
import TabbarExample from './examples/Tabbar';
import AlertDialogExample from './examples/AlertDialog';
import ActionSheetExample from './examples/ActionSheet';
import ToastExample from './examples/Toast';
import SplitterExample from './examples/Splitter';
import InputExample from './examples/Input';
import IconExample from './examples/Icon';
import RippleExample from './examples/Ripple';
import SpeedDialExample from './examples/SpeedDial';
import PullHookExample from './examples/PullHook';
import CarouselExample from './examples/Carousel';
import PopoverExample from './examples/Popover';
import DialogExample from './examples/Dialog';
import ModalExample from './examples/Modal';
import SwitchExample from './examples/Switch';
import ProgressBarExample from './examples/ProgressBar';
import RangeExample from './examples/Range';
import SelectExample from './examples/Select';
import RowColumnExample from './examples/RowColumn';
import BackButtonExample from './examples/BackButton';
import BottomToolbarExample from './examples/BottomToolbar';
import RouterNavigatorExample from './examples/RouterNavigator';
import ReduxNavigatorExample from './examples/ReduxNavigator';

class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.state = {class: 'test'};
    this.getExamples = this.getExamples.bind(this);
  }

  getExamples() {
    return [
      {
        title: 'Bottom Toolbar',
        component: BottomToolbarExample,
      },
      {
        title: 'Page',
        component: PageExample
      },
      {
        title: 'Back button',
        component: BackButtonExample
      },
      {
        title: 'Row & Column',
        component: RowColumnExample
      },
      {
        title: 'Carousel',
        component: CarouselExample
      },
      {
        title: 'Card',
        component: CardExample
      },
      {
        title: 'Switch',
        component: SwitchExample
      },
      {
        title: 'Range',
        component: RangeExample
      },
      {
        title: 'Select',
        component: SelectExample
      },
      {
        title: 'ProgressBar',
        component: ProgressBarExample
      },

      {
        title: 'Dialog',
        component: DialogExample
      },
      {
        title: 'Modal',
        component: ModalExample
      },

      {
        title: 'Popover',
        component: PopoverExample
      },
      {
        title: 'Tabbar',
        component: TabbarExample
      },
      {
        title: 'Splitter',
        component: SplitterExample
      },
      {
        title: 'SpeedDial',
        component: SpeedDialExample
      },
      {
        title: 'PullHook',
        component: PullHookExample
      },
      {
        title: 'Ripple',
        component: RippleExample
      },

      {
        title: 'Icon',
        component: IconExample
      },
      {
        title: 'List',
        component: ListExample
      },
      {
        title: 'Lazy List',
        component: LazyListExample
      },
      {
        title: 'Alert dialog',
        component: AlertDialogExample
      },
      {
        title: 'Action sheet',
        component: ActionSheetExample
      },
      {
        title: 'Toast',
        component: ToastExample
      },
      {
        title: 'Input',
        component: InputExample
      },
      {
        title: 'Stateless Navigator',
        component: RouterNavigatorExample
      },
      {
        title: 'Redux Navigator',
        component: ReduxNavigatorExample
      }
    ];
  }

  goto(example) {
    this.props.navigator.pushPage({
      component: example.component,
      props: {
        key: example.title
      }
    });
  }

  render() {
    return (
      <Page style={{background: 'green'}}
        renderToolbar={() => <Toolbar> <div className='center'> Up Toolbar </div> </Toolbar>}
      >
        <List modifier='inset'
          dataSource={this.getExamples()}
          renderHeader={() =>
            <ListItem lockOnDrag style={{background: 'green'}} tappable tap-background-color='red'> HEADER </ListItem>
          }
          renderRow={(example) => (
            <ListItem key={example.title} onClick={this.goto.bind(this, example)}>{example.title}</ListItem>
          )}
        />
      </Page>
    );
  }
}

class App extends React.Component {
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, route.props);
  }

  render() {
    return (
      <Navigator
        renderPage={this.renderPage}
        onPrePush={e => console.log('prepush', e)}
        onPostPush={e => console.log('postpush', e)}
        onPrePop={e => console.log('prepop', e)}
        onPostPop={e => console.log('postpop', e)}
        initialRoute={{
          component: Examples,
          props: {
            key: 'examples'
          }
        }}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
