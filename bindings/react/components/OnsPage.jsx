var OnsPage = React.createClass({
  render: function() {
    var toolbar;
    var otherChildren = [];

    React.Children.forEach(this.props.children, function(child) {
      if (reactUtil.rendersToOnsToolbar(child)) {
        toolbar = child;
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
      </ons-page>;
    }, 
});
