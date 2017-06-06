<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left"><v-ons-toolbar-button @click="tabbarIndex--">Index--</v-ons-toolbar-button></div>
      <div class="center">Index: {{tabbarIndex}} -- Show: <input type="checkbox" v-model="tabbarVisibility" /> - <button @click="tabs[0].props.test = 'Modified!'; tabs[1].badge = 2">Props</button></div>
      <div class="right"><v-ons-toolbar-button @click="tabbarIndex++">Index++</v-ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-tabbar :tabs="tabs" :index.sync="tabbarIndex" :visible="tabbarVisibility" position="auto" @reactive="log('reactive')" @postchange="log('postchange')" @prechange="log('prechange')" @init.native="log('init')" @show.native="log('show')" @hide.native="log('hide')" @destroy.native="log('destroy')">
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  const home = {
    template: `
      <v-ons-page>
        Home page.
        <p>{{ test }}</p>
      </v-ons-page>
    `,
    props: ['test']
  };

  const news = {
    template: `
      <v-ons-page>
        News page
      </v-ons-page>
    `
  };

  const settings = {
    template: `
      <v-ons-page>
        Settings page
      </v-ons-page>
    `
  };

	export default {
    data() {
      return {
        tabbarIndex: 0,
        tabbarVisibility: true,
        tabs: [
          {
            label: 'Home',
            icon: 'ion-ios-home-outline',
            page: home,
            props: {
              test: 'This is a page prop.'
            },
          },
          {
            label: 'News',
            icon: 'ion-ios-bell',
            badge: 7,
            page: news
          },
          {
            label: 'Settings',
            icon: 'fa-cogs',
            page: settings
          }
        ]
      };
    },

    methods: {
      log(...args) {
        console.log(...args)
      }
    }
	};
</script>

<style>
</style>
