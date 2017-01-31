<template>
  <v-ons-page>
    <p><label>Show FAB: <input type="checkbox" v-model="fabVisible" /></label></p>
    <p>
      <label>Show SPD: <input type="checkbox" v-model="speedDialVisible" /></label> --
      <label>Open SPD: <input type="checkbox" v-model="speedDialOpen" /></label>
    </p>
    <v-ons-fab
      :visible="fabVisible"
      @click="$notification.alert('FAB clicked!')"
      position="top right"
    >
      <v-ons-icon icon="md-account-add"></v-ons-icon>
    </v-ons-fab>

    <v-ons-speed-dial
      :visible="speedDialVisible"
      :open="speedDialOpen"
      :onClick="() => speedDialOpen = !speedDialOpen"
      position="bottom left"
      direction="up"
      @open="log('open!!')"
      @close="log('close!!')"
    >
      <v-ons-fab :visible="speedDialVisible">
        <v-ons-icon icon="md-share"></v-ons-icon>
      </v-ons-fab>
      <v-ons-speed-dial-item
        @click="$notification.confirm('Share on Twitter?')"
      >
        <v-ons-icon icon="md-twitter"></ons-icon>
      </v-ons-speed-dial-item>
      <v-ons-speed-dial-item
        @click="$notification.confirm('Share on Facebook?')"
      >
        <v-ons-icon icon="md-facebook"></v-ons-icon>
      </v-ons-speed-dial-item>
      <v-ons-speed-dial-item
        @click="$notification.confirm('Share on Google+?')"
      >
        <v-ons-icon icon="md-google-plus"></v-ons-icon>
      </v-ons-speed-dial-item>
    </v-ons-speed-dial>

  </v-ons-page>
</template>

<script>
	export default {
    data: function() {
      return {
        fabVisible: true,
        speedDialVisible: false,
        speedDialOpen: false
      };
    },
    methods: {
      log: function() {
        console.log(...arguments);
      }
    }
	};
</script>
