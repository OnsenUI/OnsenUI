<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">Dialogs</div>
    </ons-toolbar>

    <ons-list>
      <ons-list-header>Notifications</ons-list-header>
      <ons-list-item
        tappable
        @click="$notification.alert('Hello, world!')"
      >
        <div class="center">
          Alert
        </div>
      </ons-list-item>
      <ons-list-item
        tappable
        @click="$notification.confirm('Do you like Onsen UI?')"
      >
        <div class="center">
          Confirmation
        </div>
      </ons-list-item>
      <ons-list-item
        tappable
        @click="$notification.prompt('What is your name?')"
      >
        <div class="center">
          Prompt
        </div>
      </ons-list-item>
    </ons-list>

  </ons-page>
</template>

<script>
	export default {
	};
</script>
