import {Component} from 'react';

import {Page, Toolbar, Button, RouterNavigator} from '../../src/index.js';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RouterNavigator
      />
    );
  }
}
