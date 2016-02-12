var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  
  render: function() {
    return (
    <div> 
    <OnsTabbar>
      <OnsTab page="page1.html" active="true">
        <div ons-tab-active>
          HOME
        </div>
        <div ons-tab-inactive>
          home
        </div>
      </OnsTab>
      <OnsTab
        page="page2.html"
        icon="ion-chatbox-working"
        label="Comments">
      </OnsTab>
      <OnsTab
        page="page3.html"
        icon="ion-ios-cog"
        label="Settings"
        ></OnsTab>
    </OnsTabbar>
    <OnsTemplate id="page1.html"> 
      <OnsPage>
        <div>Hello</div>
      </OnsPage>
    </OnsTemplate>
    <OnsTemplate id="page2.html"> 
      <OnsPage>
        <div>Hello</div>
      </OnsPage>
    </OnsTemplate>
    <OnsTemplate id="page3.html"> 
      <OnsPage>
        <div>Hello</div>
      </OnsPage>
    </OnsTemplate>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
