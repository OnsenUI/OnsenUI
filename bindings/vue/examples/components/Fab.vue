<template>
  <v-ons-page>
    <p><label>Show FAB: <input type="checkbox" v-model="fabVisible" /></label></p>
    <p>
      <label>Show SPD: <input type="checkbox" v-model="speedDialVisible" /></label> --
      <label>Open SPD: <input type="checkbox" v-model="speedDialOpen" /></label>
    </p>
    <v-ons-fab
      :visible="fabVisible"
      @click="$ons.notification.alert('FAB clicked!')"
      position="top right"
    >
      <v-ons-icon icon="md-account-add"></v-ons-icon>
    </v-ons-fab>

    <v-ons-speed-dial
      :visible="speedDialVisible"
      :open.sync="speedDialOpen"
      position="bottom left"
      direction="up"
      @open="log('open')"
      @close="log('close')"
    >
      <v-ons-fab :visible="speedDialVisible">
        <v-ons-icon icon="md-share"></v-ons-icon>
      </v-ons-fab>
      <v-ons-speed-dial-item
        @click="$ons.notification.confirm('Share on Twitter?')"
      >
        <v-ons-icon icon="md-twitter"></v-ons-icon>
      </v-ons-speed-dial-item>
      <v-ons-speed-dial-item
        @click="$ons.notification.confirm('Share on Facebook?')"
      >
        <v-ons-icon icon="md-facebook"></v-ons-icon>
      </v-ons-speed-dial-item>
      <v-ons-speed-dial-item
        @click="$ons.notification.confirm('Share on Google+?')"
      >
        <v-ons-icon icon="md-google-plus"></v-ons-icon>
      </v-ons-speed-dial-item>
    </v-ons-speed-dial>

  </v-ons-page>
</template>

<script>
	export default {
    data() {
      return {
        fabVisible: true,
        speedDialVisible: true,
        speedDialOpen: true
      };
    },
    methods: {
      log() {
        console.log(...arguments);
      }
    }
	};
</script>
