<template>
  <v-ons-page>
    <v-ons-speed-dial
      position="bottom right"
      @open="log('open!!')"
      @close="log('close!!')"
    >
      <v-ons-fab>
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
    methods: {
      log: function() {
        console.log(...arguments);
      }
    }
	};
</script>
