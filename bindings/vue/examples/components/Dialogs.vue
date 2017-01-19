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

      <v-ons-list-item
        tappable
        @click="$refs.myAlertDialog1.show()"
      >
        <div class="center">
          Alert Dialog (slots)
        </div>
      </v-ons-list-item>

      <v-ons-list-item
        tappable
        @click="$refs.myAlertDialog2.show()"
      >
        <div class="center">
          Alert Dialog (props)
        </div>
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

    <v-ons-alert-dialog ref="myAlertDialog1" cancelable modifier="rowfooter">
      <span slot="title">Title slots</span>
      Lorem ipsum
      <template slot="footer">
        <button class="test zxc" other="asd" @click="$refs.myAlertDialog1.hide()">Ok</button>
        <button @click="$refs.myAlertDialog1.hide()">Cancel</button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog ref="myAlertDialog2" cancelable :title="'Title props'" :footer="{Ok: () => $refs.myAlertDialog2.hide(), Cancel: () => $refs.myAlertDialog2.hide()}" modifier="rowfooter">
      Lorem ipsum
    </v-ons-alert-dialog>

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
