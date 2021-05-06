<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="tabbarIndex--" :disabled="tabbarIndex <= 0">Index--</v-ons-toolbar-button>
      </div>
      <div class="center">
        Index: {{tabbarIndex}} -- Show:
        <input type="checkbox" v-model="tabbarVisibility" /> -
        <v-ons-button @click="tabs[0].props.test = 'Modified!'">Set Home prop</v-ons-button> -
        <v-ons-button @click="tabs[1].badge++">Modify News badge</v-ons-button>
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="tabbarIndex++" :disabled="tabbarIndex >= tabs.length - 1">Index++</v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-tabbar
      swipeable
      v-model:tabs="tabs"
      v-model:index="tabbarIndex"
      :visible="tabbarVisibility"
      position="auto"
      @reactive="log('reactive')"
      @postchange="log('postchange')"
      @prechange="log('prechange')"
      @init="log('init')"
      @show="log('show')"
      @hide="log('hide')"
      @destroy="log('destroy')"
    >
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  import { markRaw } from 'vue';

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
        tabbarIndex: 2,
        tabbarVisibility: true,
        tabs: [
          {
            label: 'Home',
            icon: 'ion-ios-home',
            page: home,
            props: {
              test: 'This is a page prop.'
            }
          },
          {
            label: 'News',
            icon: 'ion-ios-notifications',
            badge: 7,
            page: news
          },
          {
            label: 'Settings',
            icon: 'fa-cogs',
            page: settings
          }
        ].map(tab => ({ ...tab, page: markRaw(tab.page) }))
      };
    },

    methods: {
      log(...args) {
        console.log(...args)
      }
    }
	};
</script>
