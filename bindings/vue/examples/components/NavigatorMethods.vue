<template>
  <v-ons-page>
    <v-ons-navigator @prepush="log('prepush!!')" @postpush="log('postpush!!')" @prepop="log('prepop!!')" @postpop="log('postpop!!')"
      :options="{animation: 'slide-md'}"
    >
      <page1></page1>
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
    `
  };

  const page3 = {
    template: `
      <v-ons-page p3>
        <my-toolbar>Page 3</my-toolbar>
        Page 3
        <ons-button @click="replace">Replace with first page</ons-button>
        <ons-button @click="reset">Reset to first page</ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      replace: function() {
        this.navigator.replacePage(page1);
      },
      reset: function() {
        this.navigator.resetToPage(this.navigator.pages[0].__vue__)
      }
    },
    components: { myToolbar }
  };

  const page2 = {
    template: `
      <v-ons-page p2 @init="log('init!!')" @destroy="log('destroy!!')" @show="log('show!!')" @hide="log('hide!!')">
        <my-toolbar>Page 2</my-toolbar>
        Page 2. Test: {{ data }} - Another test: {{ anotherTest }}
        <ons-button @click="push">Push 3 pages</ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      push: function() {
        this.navigator.pushPage(page3).then(() => this.navigator.pushPage(page3).then(() => this.navigator.pushPage(page3)));
        this.$nextTick(() => this.navigator.isReady().then(() => {
          console.log('is ready');
        }));
      }
    },
    components: { myToolbar },
    data: function() {
      return {anotherTest: 10}
    },
    mounted() {
      console.log(this)
    }
  };

  const page1 = {
    template: `
      <v-ons-page p1>
        <my-toolbar>Page 1</my-toolbar>
        Page 1
        <ons-button @click="push">Push</ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      push: function() {
        page2.asd = 'hola';
        this.navigator.pushPage(page2, {data: {test: 5}});
      }
    },
    components: { myToolbar }
  };

	export default {
    data: function() {
      return {
        page1
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
