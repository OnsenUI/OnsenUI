var OnsPage = React.createClass({
  render: function() {
    var toolbar;
    var modal;
    var otherChildren = [];

    console.log('render page');

    React.Children.forEach(this.props.children, function(child) {
      console.log('child');
      console.log(child);
      if (child == null) return;
      if (reactUtil.rendersToOnsToolbar(child)) {
        console.log('toolbar');
        toolbar = child;
      }  else if (reactUtil.rendersToOnsModal(child)) {
        console.log('model');
        modal = child;
      } else {
        otherChildren.push(child);
      }
    });

    console.log('compile');

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
