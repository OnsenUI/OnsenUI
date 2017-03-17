<template>
  <v-ons-page>
    <v-ons-navigator :page-stack="pageStack" :pop-page="pop"></v-ons-navigator>
  </v-ons-page>
</template>

<script>
  import Vue from 'vue';
  import Vuex from 'vuex';

  Vue.use(Vuex);

  const store = new Vuex.Store({
    strict: true,
    state: {
      pageStack: []
    },
    mutations: {
      pushPage(state, page) {
        state.pageStack = [
          ...state.pageStack,
          ...(page instanceof Array ? page : [page])
        ];
      },
      popPage(state) {
        if (state.pageStack.length > 1) {
          state.pageStack.pop();
        }
      },
      replacePage(state, page) {
        state.pageStack.pop();
        state.pageStack.push(page);
      },
      resetPageStack(state) {
        state.pageStack = [state.pageStack[0]];
      }
    }
  });

  const myToolbar = {
    template: `
    <v-ons-toolbar>
      <div class="left"><v-ons-back-button>Back</v-ons-back-button></div>,
      <div class="center"><slot></slot></div>
    </v-ons-toolbar>
    `
  };

  const page3 = {
    template: `
      <v-ons-page p3>
        <my-toolbar>Page 3</my-toolbar>
        Page 3
        <v-ons-button @click="replace">Replace with first page</v-ons-button>
        <v-ons-button @click="reset">Reset to first page</v-ons-button>
      </v-ons-page>
    `,
    methods: {
      replace() {
        this.$store.commit('replacePage', page1);
      },
      reset() {
        this.$store.commit('resetPageStack');
      }
    },
    components: { myToolbar }
  };

  const page2 = {
    template: `
      <v-ons-page p2>
        <my-toolbar>Page 2</my-toolbar>
        Page 2
        <v-ons-button @click="push">Push 3 pages</v-ons-button>
      </v-ons-page>
    `,
    methods: {
      push() {
        this.$store.commit('pushPage', [page3, page3, page3]);
        this.$nextTick(() => this.navigator.isReady().then(() => {
          console.log('is ready');
        }));
      }
    },
    components: { myToolbar },
    inject: ['navigator'],
    mounted() {
    }
  };

  const page1 = {
    template: `
      <v-ons-page p1>
        <my-toolbar>Page 1</my-toolbar>
        Page 1
        <v-ons-button @click="push">Push</v-ons-button>
      </v-ons-page>
    `,
    methods: {
      push() {
        this.$store.commit('pushPage', page2);
      }
    },
    components: { myToolbar },
    mounted() {
    }
  };

	export default {
    store,
    computed: {
      pageStack() {
        return this.$store.state.pageStack;
      }
    },
    beforeCreate() {
      this.$store.commit('pushPage', page1);
    },
    methods: {
      pop() {
        this.$store.commit('popPage');
      }
    }
	};
</script>

<style>
</style>
