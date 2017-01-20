<template>
  <v-ons-page>
    <ons-toolbar>
      <div class="center">Progress</div>
    </ons-toolbar>

    <ons-progress-bar value="10"></ons-progress-bar>

    <div style="margin: 20px auto; width: 320px;">
      <p>Loading stuff...</p>
      <ons-progress-bar value="20" secondary-value="50"></ons-progress-bar>
    </div>

    <ons-progress-bar indeterminate></ons-progress-bar>
  </v-ons-page>
</template>

<script>
	export default {
    data() {
      return {
        volume: '50'
      };
    }
	};
</script>