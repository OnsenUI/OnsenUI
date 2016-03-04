var MyPage  = React.createClass({
  render: function() {
    return (
<OnsPage modifier="material">
    <OnsToolbar modifier="material">
      <div className="center">Speed Dial</div>
    </OnsToolbar>

    <section style={{textAlign: 'center'}}>
      <p></p>

      <OnsSpeedDial position="left bottom" direction="right">
        <OnsIcon icon="md-car"></OnsIcon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>

      </OnsSpeedDial>

      <OnsSpeedDial position="top right" style={{top: 100}} direction="left">
        <OnsIcon icon="md-car"></OnsIcon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>
      </OnsSpeedDial>

      <OnsSpeedDial position="top left" style={{top: 100}} direction="down">
        <OnsIcon icon="md-car"></OnsIcon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>

      </OnsSpeedDial>

      <OnsSpeedDial position="bottom right" direction="up">
        <OnsIcon icon="md-car"></OnsIcon>
        <OnsSpeedDialItem>C</OnsSpeedDialItem>
        <OnsSpeedDialItem>B</OnsSpeedDialItem>
        <OnsSpeedDialItem>A</OnsSpeedDialItem>
      </OnsSpeedDial>
    </section>
  </OnsPage>);
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
