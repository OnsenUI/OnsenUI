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
        <v-ons-range id="no-attributes"></v-ons-range><br>

        <h2>Props</h2>

        <h3>disabled</h3>
        <v-ons-range id="disabled-prop-false" :disabled="false"></v-ons-range> :disabled="false"<br>
        <v-ons-range id="disabled-prop-true" :disabled="true"></v-ons-range> :disabled="true"<br>

        <h3>value</h3>
        <v-ons-range id="value-prop-25" value="25"></v-ons-range> value="25"<br>

        <h3>modifier</h3>
        <v-ons-range id="modifier-prop-material" modifier="material"></v-ons-range> modifier="material"<br>
      </div>
    `,
  });
});
