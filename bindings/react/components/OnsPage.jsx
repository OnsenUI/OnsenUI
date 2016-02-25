var OnsPage = React.createClass({
  render: function() {
    var toolbar;
    var modal;
    var otherChildren = [];

    React.Children.forEach(this.props.children, function(child) {
      if (child == null) return;
      if (reactUtil.rendersToOnsToolbar(child)) {
        toolbar = child;
      }  else if (reactUtil.rendersToOnsModal(child)) {
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
