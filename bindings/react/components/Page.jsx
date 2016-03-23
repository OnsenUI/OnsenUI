import React from 'react';
import reactUtil from './reactUtil.jsx';

var Page = React.createClass({
  render: function() {
    var toolbar;
    var modal;
    var otherChildren = [];

    React.Children.forEach(this.props.children, function(child) {
      if (child == null) return;
      if (reactUtil.rendersToToolbar(child)) {
        toolbar = child;
      }  else if (reactUtil.rendersToModal(child)) {
        modal = child;
      } else {
        otherChildren.push(child);
      }
    });

    return <ons-page   {...this.props}  _compiled="true" >
        {toolbar}
        <div className="page__background"> </div>
        <div className="page__content">
          {otherChildren}
        </div>
        <div className="page__extra" style={{zIndex: 10001}}>
          {modal}
        </div>
      </ons-page>;
    },
});

export default Page;
