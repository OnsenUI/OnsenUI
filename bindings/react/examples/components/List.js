import React from 'react';
import MyToolbar from './MyToolbar';

import {
  Page,
  List,
  ListItem,
  ListHeader,
  ListTitle,
  Toolbar,
  ToolbarButton,
  BackButton,
  Button
} from 'react-onsenui';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [1, 2, 3, 4, 5, 6]
    };
  }

  reverseData() {
    this.setState({
      data: this.state.data.reverse()
    });
  }

  remove(idx) {
    const data = this.state.data;
    data.splice(idx, 1);

    this.setState({
      data: data
    });
  }

  add() {
    const data = this.state.data;
    data.push(data.length);

    this.setState({
      data: data
    });
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='List' />} >
        <ListTitle>List Title</ListTitle>
        <List
          dataSource={this.state.data}
          renderHeader={() => <ListHeader style={{fontSize: 15}} className="testClass"> Header Text </ListHeader> }
          renderRow={(row, idx) => (
            <ListItem modifier={idx === this.state.data.length - 1 ? 'longdivider' : null}>
              {row}
              <Button modifier="quiet" onClick={this.remove.bind(this, idx)}>Remove</Button>
            </ListItem>
          )}
          renderFooter={() => (
            <ListItem><Button modifier="quiet" onClick={this.add.bind(this)}>Add more</Button></ListItem>
          )}
        />
      </Page>
    );
  }
}
