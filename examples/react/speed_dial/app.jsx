var MyPage  = React.createClass({
  render: function() {
    return (
<OnsPage modifier="material">
    <ons-toolbar modifier="material">
      <div className="center">Speed Dial</div>
    </ons-toolbar>

    <section style={{textAlign: 'center'}}>
      <p></p>

      <OnsSpeedDial position="left bottom" direction="right">
        <ons-icon icon="md-car"></ons-icon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>

      </OnsSpeedDial>

      <OnsSpeedDial position="top right" style={{top: 100}} direction="left">
        <ons-icon icon="md-car"></ons-icon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>
      </OnsSpeedDial>

      <OnsSpeedDial position="top left" style={{top: 100}} direction="down">
        <ons-icon icon="md-car"></ons-icon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>

      </OnsSpeedDial>

      <OnsSpeedDial position="bottom right" direction="up">
        <ons-icon icon="md-car"></ons-icon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>
      </OnsSpeedDial>
    </section>
  </OnsPage>);
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
