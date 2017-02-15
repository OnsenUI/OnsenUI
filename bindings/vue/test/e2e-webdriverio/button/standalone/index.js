import ons from 'onsenui';

ons.ready(function(){
  // new Vue() should be called after ons.ready.
  // Otherwise something will be broken.
  new Vue({
    el: '#app',
    template: `
      <div>
        <span id="is-mounted"></span>

        <h2>No attributes</h2>
        <v-ons-button id="no-attributes">Push</v-ons-button><br>

        <h2>Props</h2>

        <h3>disabled</h3>
        <v-ons-button id="disabled-prop-false" :disabled="false">Push</v-ons-button> :disabled="false"<br>
        <v-ons-button id="disabled-prop-true" :disabled="true">Push</v-ons-button> :disabled="true"<br>

        <h3>ripple</h3>
        <v-ons-button id="ripple-prop-false" :ripple="false">Push</v-ons-button> :ripple="false"<br>
        <v-ons-button id="ripple-prop-true" :ripple="true">Push</v-ons-button> :ripple="true"<br>

        <h3>modifier</h3>
        <v-ons-button id="modifier-prop-material" modifier="material">Push</v-ons-button> modifier="material"<br>
      </div>
    `,
  });
});
