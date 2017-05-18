<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="right"><v-ons-toolbar-button @click="$emit('refresh')">Refresh</v-ons-toolbar-button></div>
    </v-ons-toolbar>
    <v-ons-list-title>List Title</v-ons-list-title>
    <v-ons-list>
      <v-ons-lazy-repeat :render-item="renderItem" :length="1000">
      </v-ons-lazy-repeat>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import Vue from 'vue';

	export default {
    data() {
      return {
        renderItem: i => {
          return new Vue({
            template: `<v-ons-list-item :index="index" :key="index">#{{ index }}</v-ons-list-item>`,
            data() {
              return {
                index: i
              };
            }
          });
        }
      };
    },

    methods: {
    }
	};
</script>
