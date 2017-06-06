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
        <v-ons-switch id="no-attributes"></v-ons-switch><br>

        <h2>Props</h2>

        <h3>checked</h3>
        <v-ons-switch id="checked-prop-false" :checked="false"></v-ons-switch> :checked="false"<br>
        <v-ons-switch id="checked-prop-true" :checked="true"></v-ons-switch> :checked="true"<br>

        <h3>disabled</h3>
        <v-ons-switch id="disabled-prop-false" :disabled="false"></v-ons-switch> :disabled="false"<br>
        <v-ons-switch id="disabled-prop-true" :disabled="true"></v-ons-switch> :disabled="true"<br>

        <h3>input-id</h3>
        <label for="foo">Label: </label><v-ons-switch id="input-id-prop-foo" input-id="foo"></v-ons-switch> input-id="foo"<br>

        <h3>modifier</h3>
        <v-ons-switch id="modifier-prop-material" modifier="material"></v-ons-switch> modifier="material"<br>

        <h2>Events</h2>

        <h3>change</h3>
        <v-ons-switch id="change-event" @change.native="message   = 'it works!'"></v-ons-switch><span id="change-event-message">{{message}}</span><br>
      </div>
    `,
    data: {
        message: '',
    },
  });
});
