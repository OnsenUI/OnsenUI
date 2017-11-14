import React from 'react';

import {
  Page,
  Card,
  List,
  ListHeader,
  ListItem,
  Button,
  Icon
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
            <img src={"https://monaca.io/img/logos/download_image_onsenui_01.png"} alt="Onsen UI" style={{width: '100%'}} />
            <div className="title">
              Awesome framework
            </div>
            <div className="content">
              <div>
                <Button><Icon icon="ion-thumbsup"></Icon></Button>
                <Button><Icon icon="ion-share"></Icon></Button>
              </div>
              <List>
                <ListHeader>Bindings</ListHeader>
                <ListItem>Vue</ListItem>
                <ListItem>Angular</ListItem>
                <ListItem>React</ListItem>
              </List>
            </div>
          </Card>
        </div>
      </Page>
    );
  }
}
