<template>
  <ons-page>
    <ons-tabbar
      :index="index"
      :tabs="tabs"
      @tab-change="onChange"
    ></ons-tabbar>
  </ons-page>
</template>

<script>
  import {
    OnsTabbar
  } from 'vue-onsenui';

	export default {
    data() {
      return {
        index: 0,
        tabs: [
          {
            component: 'home',
            label: 'Home',
            icon: 'ion-ios-home-outline'
          },
          {
            component: 'dialogs',
            label: 'Dialogs',
            icon: 'ion-ios-albums-outline'
          },
          {
            component: 'forms',
            label: 'Forms',
            icon: 'ion-edit'
          },
          {
            component: 'animations',
            label: 'Animations',
            icon: 'ion-film-marker'
          }
        ],
      };
    },

    components: {
      OnsTabbar
    },

    methods: {
      onChange({index}) {
        this.index = index;
      }
    }
	};
</script>

<style>
</style>
