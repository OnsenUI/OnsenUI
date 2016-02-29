var OnsSwitch= React.createClass({
  render: function() {
    var myStyle= {
      WebkitUserSelect: 'none',
      TouchAction: 'pan-y',
      WebkitUserDrag: 'none',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
    };
    return (
      <ons-switch style={myStyle} class="switch" _compiled="" {...this.props} >
       <input type="checkbox" className="switch__input" {...this.props} />
       <div className="switch__toggle">
         <div className="switch__handle">
           <div className="switch__touch"></div>
         </div>
       </div>
     </ons-switch>
    );
  }
});
