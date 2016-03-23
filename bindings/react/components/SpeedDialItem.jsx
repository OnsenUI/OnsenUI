import React from 'react';

var SpeedDialItem = React.createClass({
  getInitialState: function() {
    return { };
  },
  render: function() {
    return (
      <ons-speed-dial-item {...this.props} />
    );
  }
});

export default SpeedDialItem;
