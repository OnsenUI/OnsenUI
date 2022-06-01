<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Tabbar Visible: <input type="checkbox" v-model="tabbarVisibility" /></div>
    </v-ons-toolbar>

    <v-ons-tabbar :visible="tabbarVisibility" @init="log('init')">
      <template v-slot:pages>
        <keep-alive>
          <component shown :is="currentPage"></component>
        </keep-alive>
      </template>

      <v-ons-tab :active="currentPage === 'home'" @click.prevent="currentPage = 'home'" :icon="tab1Icon" :label="tab1Label"></v-ons-tab>
      <v-ons-tab :active="currentPage === 'settings'" @click.prevent="currentPage = 'settings'" icon="fa-cogs" label="Settings"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  let home = {
    template: `
      <v-ons-page>
        Home page
      </v-ons-page>
    `
  };

  let settings = {
    template: `
      <v-ons-page>
        Settings Page
      </v-ons-page>
    `
  };

	export default {
    data() {
      return {
        tab1Label: 'Home',
        tab1Icon: 'ion-ios-home',
        tabbarVisibility: true,
        currentPage: 'home'
      };
    },

    components: {
      home,
      settings
    },

    methods: {
      log(...args) {
        console.log(...args);
      }
    }
	};
</script>
