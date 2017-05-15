import React from 'react';

import {
  Page,
  Card,
  List,
  ListHeader,
  ListItem,
  Button
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='Card' />} >
        <div style={{margin: 50}}>
          <Card>
            <div className="title right">Awesome card title</div>
            <div className="content">
              <List>
                <ListHeader>Awesome card 1 info</ListHeader>
                <ListItem>Awesome card 1 info 1</ListItem>
                <ListItem>Awesome card 1 info 2</ListItem>
                <ListHeader>Awesome card 2 info</ListHeader>
                <ListItem>Awesome card 2 info 1</ListItem>
                <ListItem>Awesome card 2 info 2</ListItem>
              </List>
              <div className="button-bar" style={{marginTop: '1%'}}>
                <Button>Action 1</Button>
                <Button>Action 2</Button>
                <Button>Action 3</Button>
              </div>
            </div>
          </Card>
        </div>
      </Page>
    );
  }
}
