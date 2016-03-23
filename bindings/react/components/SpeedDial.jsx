import React from 'react';
import ReactDOM from 'react-dom';
import reactUtil from './reactUtil.jsx';

import Fab from './Fab.jsx';

var SpeedDial = React.createClass({
  componentDidMount: function() {
    var node = this.node = ReactDOM.findDOMNode(this);
    node._updateClasses();
  },
  render: function() {
    var items  = [];
    var btnContent = [];
    React.Children.forEach(this.props.children, function(child) {
      if (child == null) return;

      if (reactUtil.rendersTo(child, '<ons-speed-dial-item')) {
        items.push(child);
      } else {
        btnContent.push(child);
      }
    });

    return(
      <ons-speed-dial {...this.props} _compiled="">
        <Fab>
          {btnContent}
        </Fab>
        {items}
      </ons-speed-dial>);
    }
});

export default SpeedDial;
