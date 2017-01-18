<template>
  <v-ons-page>
    <ons-fab
      @click="$notification.alert('Button clicked!')"
      position="bottom right"
      icon="md-account-add"
    >
      <ons-icon icon="md-account-add"></ons-icon>
    </ons-fab>

  </v-ons-page>
</template>

<script>
	export default {
	};
</script>
