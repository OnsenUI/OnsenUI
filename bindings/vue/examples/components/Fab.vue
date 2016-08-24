<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">
        Floating action button
      </div>
      <div class="left">
        <ons-back-button label="Home" @click="$pop()"></ons-back-button>
      </div>
    </ons-toolbar>

    <ons-fab
      @click="$notification.alert('Button clicked!')"
      position="bottom right"
      icon="md-account-add"
    >
      <ons-icon icon="md-account-add"></ons-icon>
    </ons-fab>

  </ons-page>
</template>

<script>
  import {
    OnsBackButton
  } from 'vue-onsenui';

	export default {
    components: {
      OnsBackButton
    }
	};
</script>
