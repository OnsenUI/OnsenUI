var MyPage  = React.createClass({
  render: function() {
    return (
      <Ons.Page modifier="material">
        <Ons.Toolbar modifier="material">
          <div className="center">Speed Dial</div>
        </Ons.Toolbar>

        <section style={{textAlign: 'center'}}>
          <Ons.SpeedDial position="left bottom" direction="right">
            <Ons.Icon icon="md-car"></Ons.Icon>
            <Ons.SpeedDialItem>A</Ons.SpeedDialItem>
            <Ons.SpeedDialItem>B</Ons.SpeedDialItem>
            <Ons.SpeedDialItem>C</Ons.SpeedDialItem>
            <Ons.SpeedDialItem>D</Ons.SpeedDialItem>
          </Ons.SpeedDial>
        </section>
      </Ons.Page>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
