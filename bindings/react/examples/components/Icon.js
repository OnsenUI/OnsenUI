
import React from 'react';

import {Button, Page, Icon} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.changeModifier = this.changeModifier.bind(this);
    this.state = {
      showMaterial: false,
      btnText: 'Switch to material design',
      modifier: 'defaullt',
    };
  }

  changeModifier() {
    if (this.state.showMaterial) {
      this.setState({
        showMaterial: false,
        btnText: 'Switch to material design',
        modifier: 'defaullt',
      });
    } else {
      this.setState({
        showMaterial: true,
        btnText: 'Switch to default design',
        modifier: 'material'
      });
    }
  }

  render() {
    return (
      <Page modifier={this.state.modifier} renderToolbar={() => <MyToolbar modifier={this.state.modifier} title='Icon' />} >
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <p> </p>
          <Button modifier={this.state.modifier} onClick={this.changeModifier} > {this.state.btnText} </Button>
          <p> modifier: {this.state.modifier} </p>
          <p> Button standard </p>
          <ons-icon
            modifier={this.state.modifier}
            fixed-width='false'
            icon='ion-edit, material:md-edit' size='20px, material:20px' />
          <p> Button standard2</p>
          {[0, 90, 180, 270].map((val) =>

          <Icon
            modifier={this.state.modifier}
            fixedWidth={true}
            rotate={val}
            size={{
              default: 20,
              material: 18
            }}
            icon={{
              default: 'shield',
              material: 'md-edit'
            }}/>
          )}
        </div>
      </Page>
    );
  }
}
