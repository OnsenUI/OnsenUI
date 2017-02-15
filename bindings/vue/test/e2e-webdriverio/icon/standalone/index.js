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
        <v-ons-icon id="no-attributes"></v-ons-icon><br>

        <h2>Props</h2>

        <h3>icon</h3>
        <v-ons-icon icon="md-face"></v-ons-icon><br>
        <v-ons-icon icon="md-home"></v-ons-icon><br>
        <v-ons-icon icon="md-zoom-in"></v-ons-icon><br>
        <v-ons-icon icon="file"></v-ons-icon><br>
        <v-ons-icon icon="cog"></v-ons-icon><br>
        <v-ons-icon icon="car"></v-ons-icon><br>
        <v-ons-icon icon="ion-navicon"></v-ons-icon><br>
        <v-ons-icon icon="ion-hammer"></v-ons-icon><br>
        <v-ons-icon icon="ion-calendar"></v-ons-icon><br>
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon><br>

        <h3>size</h3>
        <v-ons-icon icon="md-face" size="10px"></v-ons-icon><br>
        <v-ons-icon icon="md-face" size="20px"></v-ons-icon><br>
        <v-ons-icon icon="md-face" size="30px"></v-ons-icon><br>

        <h3>spin</h3>
        <v-ons-icon icon="md-spinner" size="30px" spin></v-ons-icon><br>

        <h3>rotate</h3>
        <v-ons-icon icon="md-face"></v-ons-icon><br>
        <v-ons-icon icon="md-face" rotate="90"></v-ons-icon><br>
        <v-ons-icon icon="md-face" rotate="180"></v-ons-icon><br>
        <v-ons-icon icon="md-face" rotate="270"></v-ons-icon><br>

        <h3>flip</h3>
        <v-ons-icon icon="shield"></v-ons-icon><br>
        <v-ons-icon icon="shield" flip="horizontal"></v-ons-icon><br>
        <v-ons-icon icon="shield" flip="vertical"></v-ons-icon><br>
      </div>
    `,
  });
});
