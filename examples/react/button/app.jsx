var MyPage  = React.createClass({
  render: function() {
    return (
    <Ons.Page>
    <Ons.Toolbar>
      <div className="center">Button</div>
    </Ons.Toolbar>

    <section style={{padding: 8}}>
      <p></p>
      <h3>Material design buttons</h3>
      <Ons.Button modifier="material">
        <Ons.Ripple />
        button with ripple
      </Ons.Button>
      <Ons.Button modifier="material">button</Ons.Button>
      <Ons.Button modifier="material" disabled>disabled</Ons.Button>
      <Ons.Button modifier="material--flat">
        <Ons.Ripple color="rgba(66, 130, 204, 0.2)" />
        flat with ripple
      </Ons.Button>
      <Ons.Button modifier="material--flat">flat</Ons.Button>
      <Ons.Button modifier="material--flat" disabled>flat disabled</Ons.Button>
    </section>
    <section style={{padding: 8}}>
      <h3>iOS buttons</h3>
      <Ons.Button modifier="light">light</Ons.Button>
      <Ons.Button modifier="light">light</Ons.Button>
      <Ons.Button modifier="outline">outline</Ons.Button>
      <Ons.Button modifier="quiet">quiet</Ons.Button>
      <Ons.Button>Default</Ons.Button>
      <Ons.Button modifier="cta">cta</Ons.Button>
      <p></p>
      <Ons.Button modifier="large--quiet">large--quiet</Ons.Button>
      <p></p>
      <Ons.Button modifier="large">large</Ons.Button>
      <p></p>
      <Ons.Button modifier="large--cta">large--cta</Ons.Button>
    </section>

    <section style={{padding: 8}}>
      <p></p><br /><br />
      <Ons.Button modifier="light" disabled="true">light</Ons.Button>
      <Ons.Button modifier="outline" disabled="true">outline</Ons.Button>
      <Ons.Button modifier="quiet" disabled="true">quiet</Ons.Button>
      <Ons.Button disabled="true">Default</Ons.Button>
      <Ons.Button modifier="cta" disabled="true">cta</Ons.Button>
      <p></p>
      <Ons.Button modifier="large--quiet" disabled="true">large--quiet</Ons.Button>
      <p></p>
      <Ons.Button modifier="large" disabled="true">large</Ons.Button>
      <p></p>
      <Ons.Button modifier="large--cta" disabled="true">large--cta</Ons.Button>
    </section>

    </Ons.Page>);
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
