<template>
  <v-ons-page>
    <v-ons-navigator @prepush="log('prepush')" @postpush="log('postpush')" @prepop="log('prepop')" @postpop="log('postpop')" @init.native="log('init')" @destroy.native="log('destroy')" @show.native="log('show')" @hide.native="log('hide')"
      :options="{animation: 'slide'}"
    >
      <div v-for="page in pageStack" :key="page" :is="page" :page-stack="pageStack"></div>
    </v-ons-navigator>
  </v-ons-page>
</template>

<script>
  const log = (...args) => console.log(...args);
  const pop = function() { this.pageStack.pop(); };

  const myToolbar = {
    template: `
    <v-ons-toolbar>
      <div class="left"><v-ons-back-button :onClick="pop">Back</v-ons-back-button></div>,
      <div class="center"><slot></slot></div>
    </v-ons-toolbar>
    `,
    props: ['pop']
  };

  const page3 = {
    template: `
      <v-ons-page p3>
        <my-toolbar :pop="pop">Page 3</my-toolbar>
        Page 3
        <ons-button @click="replace">Replace with first page</ons-button>
        <ons-button @click="reset">Reset to first page</ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      replace: function() {
        this.pageStack.pop();
        this.pageStack.push(page1);
      },
      reset: function() {
        this.pageStack.splice(1, this.pageStack.length - 1);
      },
      pop
    },
    components: { myToolbar },
    props: ['pageStack']
  };

  const page2 = {
    template: `
      <v-ons-page p2>
        <my-toolbar :pop="pop">Page 2</my-toolbar>
        Page 2
        <ons-button @click="push">Push 3 pages</ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      push: function() {
        this.pageStack.push(page3);
        this.pageStack.push(page3);
        this.pageStack.push(page3);
        this.$nextTick(() => this.navigator.isReady().then(() => {
          console.log('is ready');
        }));
      },
      pop
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
        <my-toolbar :pop="pop">Page 1</my-toolbar>
        Page 1
        <ons-button @click="push">Push</ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      push: function() {
        this.pageStack.push(page2)
      },
      pop
    },
    components: { myToolbar },
    props: ['pageStack'],
    mounted() {
    }
  };

	export default {
    data: function() {
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
