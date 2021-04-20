<template>
  <v-ons-page>
    <v-ons-tabbar :index="0">
      <template slot="pages">
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

        <v-ons-page :infinite-scroll="loadMore" jioo="asd" :qwe="'zxc'">
          <v-ons-toolbar>
            <div class="center">Load More</div>
          </v-ons-toolbar>

          <v-ons-list>
            <v-ons-list-item v-for="i in normalListCount" :key="i"># {{ i }}</v-ons-list-item>
          </v-ons-list>

          <div style=" margin: 20px; text-align: center">
            <v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>
          </div>
        </v-ons-page>
      </template>

      <v-ons-tab v-for="t in ['Lazy Repeat', 'Load More']" :key="t" :label="t"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  import Vue from 'vue';

	export default {
    data() {
      return {
        normalListCount: 20,
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
      loadMore(done) {
        setTimeout(() => {
          this.normalListCount += 10;
          done();
        }, 500);
      }
    }
	};
</script>
