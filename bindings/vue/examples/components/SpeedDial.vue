<template>
  <ons-page>
    <ons-speed-dial position="bottom right">
      <ons-fab>
        <ons-icon icon="md-share"></ons-icon>
      </ons-fab>
      <ons-speed-dial-item
        @click="$notification.confirm('Share on Twitter?')"
      >
        <ons-icon icon="md-twitter"></ons-icon>
      </ons-speed-dial-item>
      <ons-speed-dial-item
        @click="$notification.confirm('Share on Facebook?')"
      >
        <ons-icon icon="md-facebook"></ons-icon>
      </ons-speed-dial-item>
      <ons-speed-dial-item
        @click="$notification.confirm('Share on Google+?')"
      >
        <ons-icon icon="md-google-plus"></ons-icon>
      </ons-speed-dial-item>
    </ons-speed-dial>

  </ons-page>
</template>

<script>
	export default {
	};
</script>
