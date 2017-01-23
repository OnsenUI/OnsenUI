<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        <v-ons-toolbar-button ref="myToolbarButton">Test</v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
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
        @click="dialogShown = true"
      >
        <div class="center">
          Simple Dialog
        </div>
        <div class="right">V-Model: {{dialogShown}}</div>
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

      <v-ons-list-item
        tappable
        @click="$refs.myModal.show()"
      >
        <div class="center">
          Modal
        </div>
      </v-ons-list-item>

      <v-ons-list-item
        tappable
        @click="$refs.myPopover.show('ons-toolbar-button')"
      >
        <div class="center">
          Popover (CSS selector - method)
        </div>
      </v-ons-list-item>

      <v-ons-list-item
        tappable
        @click="log('hey'); popoverShown = true"
      >
        <div class="center">
          Popover ($ref - prop)
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-dialog ref="myDialog" cancelable
      @preshow="log('preshow!!')"
      @postshow="log('postshow!!')"
      @prehide="log('prehide!!')"
      @posthide="log('posthide!!')"
      @mask="dialogShown = false; log('canceled!!'); "
      :shown="dialogShown"
    >
     Dead simple dialog
     <button @click="dialogShown = !dialogShown">toggle</button>
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

    <v-ons-modal ref="myModal">
      <p>This is a modal</p>
      <p><ons-button @click="log($refs.myModal); $refs.myModal.hide()">Close</ons-button></p>
    </v-ons-modal>

    <v-ons-popover ref="myPopover" cancelable
      @preshow="log('preshow!!')"
      @postshow="log('postshow!!')"
      @prehide="log('prehide!!')"
      @posthide="log('posthide!!')"
      :shown="popoverShown"
      :target="$refs.myToolbarButton"
      :cancelable="true"
    >
    </v-ons-popover>

  </v-ons-page>
</template>

<script>
	export default {
    data: function() {
      return {
        dialogShown: false,
        popoverShown: false
      }
    },
    methods: {
      log: function() {
        console.log(...arguments);
      }
    }
	};
</script>
