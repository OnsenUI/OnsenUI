<template>
  <v-ons-page>
    <v-ons-navigator
      :page-stack="pageStack"
      :options="{animation: 'slide'}"
    >
      <div v-for="page in pageStack" :key="page" :is="page" :page-stack="pageStack"></div>
    </v-ons-navigator>
  </v-ons-page>
</template>

<script>
  const log = (...args) => console.log(...args);

  const myToolbar = {
    template: `
    <v-ons-toolbar>
      <div class="left"><v-ons-back-button>Back</v-ons-back-button></div>,
      <div class="center"><slot></slot></div>
    </v-ons-toolbar>
    `,
    methods: { log }
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
      log,
      replace() {
        this.pageStack.pop();
        this.pageStack.push(page1);
      },
      reset() {
        this.pageStack.splice(1, this.pageStack.length - 1);
      }
    },
    components: { myToolbar },
    props: ['pageStack']
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
      log,
      push() {
        this.pageStack.push(page3);
        this.pageStack.push(page3);
        this.pageStack.push(page3);
        this.$nextTick(() => this.navigator.isReady().then(() => {
          console.log('is ready');
        }));
      }
    },
    components: { myToolbar },
    inject: ['navigator'],
    props: ['pageStack'],
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
      log,
      push() {
        this.pageStack.push(page2)
      }
    },
    components: { myToolbar },
    props: ['pageStack'],
    mounted() {
    }
  };

	export default {
    data() {
      return {
        pageStack: [page1]
      };
    },
    methods: {
      log
    },
    components: {
      page1,
      page2,
      page3
    }
	};
</script>

<style>
</style>
