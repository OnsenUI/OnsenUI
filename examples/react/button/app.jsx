var MyPage  = React.createClass({
  render: function() {
    return (
    <OnsPage>
    <OnsToolbar>
      <div className="center">Button</div>
    </OnsToolbar>

    <section style={{padding: 8}}>
      <p></p>
      <h3>Material design buttons</h3>
      <OnsButton modifier="material">
        <OnsRipple />
        button with ripple
      </OnsButton>
      <OnsButton modifier="material">button</OnsButton>
      <OnsButton modifier="material" disabled>disabled</OnsButton>
      <OnsButton modifier="material--flat">
        <OnsRipple color="rgba(66, 130, 204, 0.2)" />
        flat with ripple
      </OnsButton>
      <OnsButton modifier="material--flat">flat</OnsButton>
      <OnsButton modifier="material--flat" disabled>flat disabled</OnsButton>
    </section>
    <section style={{padding: 8}}>
      <h3>iOS buttons</h3>
      <OnsButton modifier="light">light</OnsButton>
      <OnsButton modifier="light">light</OnsButton>
      <OnsButton modifier="outline">outline</OnsButton>
      <OnsButton modifier="quiet">quiet</OnsButton>
      <OnsButton>Default</OnsButton>
      <OnsButton modifier="cta">cta</OnsButton>
      <p></p>
      <OnsButton modifier="large--quiet">large--quiet</OnsButton>
      <p></p>
      <OnsButton modifier="large">large</OnsButton>
      <p></p>
      <OnsButton modifier="large--cta">large--cta</OnsButton>
    </section>

    <section style={{padding: 8}}>
      <p></p><br /><br />
      <OnsButton modifier="light" disabled="true">light</OnsButton>
      <OnsButton modifier="outline" disabled="true">outline</OnsButton>
      <OnsButton modifier="quiet" disabled="true">quiet</OnsButton>
      <OnsButton disabled="true">Default</OnsButton>
      <OnsButton modifier="cta" disabled="true">cta</OnsButton>
      <p></p>
      <OnsButton modifier="large--quiet" disabled="true">large--quiet</OnsButton>
      <p></p>
      <OnsButton modifier="large" disabled="true">large</OnsButton>
      <p></p>
      <OnsButton modifier="large--cta" disabled="true">large--cta</OnsButton>
    </section>

    </OnsPage>);
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
