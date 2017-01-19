<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>Notifications</v-ons-list-header>
      <v-ons-list-item
        tappable
        @click="$notification.alert('Hello, world!')"
      >
        <div class="center">
          Alert
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        tappable
        @click="$notification.confirm('Do you like Onsen UI?')"
      >
        <div class="center">
          Confirmation
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        tappable
        @click="$notification.prompt('What is your name?')"
      >
        <div class="center">
          Prompt
        </div>
      </v-ons-list-item>


      <v-ons-list-header>Components</v-ons-list-header>
      <v-ons-list-item
        tappable
        @click="shown = true"
      >
        <div class="center">
          Simple Dialog
        </div>
        <div class="right">V-Model: {{shown}}</div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-dialog ref="myDialog" cancelable
      @preshow="log('preshow!!')"
      @postshow="log('postshow!!')"
      @prehide="log('prehide!!')"
      @posthide="log('posthide!!')"
      v-model="shown"
    >
     Dead simple dialog
     <button @click="shown = !shown">toggle</button>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
	export default {
    data: function() {
      return {
        shown: false
      }
    },
    methods: {
      log: function() {
        console.log(...arguments);
      }
    }
	};
</script>
