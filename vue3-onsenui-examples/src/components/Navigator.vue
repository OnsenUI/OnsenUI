<template>
  <v-ons-page>
    <v-ons-navigator swipeable
      v-model:page-stack="pageStack"
      @postpush="log('postpush!')"
      @show="log('show from navigator!')"

      @push="pageStack = [...pageStack, $event]"
      @reset="pageStack = [pageStack[0]]"
      @pop="pageStack = pageStack.slice(0, -1)"
      @replace="pageStack = [...pageStack.slice(0, -1), $event]"
    >
    </v-ons-navigator>
  </v-ons-page>
</template>

<script>
  import { markRaw } from 'vue';

  const log = (...args) => console.log(...args);

  const myToolbar = {
    template: `
    <v-ons-toolbar>
      <div class="left"><v-ons-back-button>Back</v-ons-back-button></div>
      <div class="center"><slot></slot></div>
    </v-ons-toolbar>
    `,
    methods: { log }
  };

  const page3 = {
    name: 'page3',
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
        this.$emit('replace', page1);
      },
      reset() {
        this.$emit('reset')
      }
    },
    onsNavigatorOptions: {
      animation: 'fade'
    },
    components: { myToolbar },
    emits: [ 'replace', 'reset' ]
  };

  const page2 = {
    name: 'page2',
    template: `
      <v-ons-page p2 @init="log('init!')">
        <my-toolbar>Page 2</my-toolbar>
        <p>Page 2 {{ myProp }}</p>
        <v-ons-button @click="push">Push 3 pages</v-ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      push() {
        this.$emit('push', markRaw(page3));
        this.$emit('push', markRaw(page3));
        this.$emit('push', markRaw(page3));
      }
    },
    props: {
      myProp: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        onsNavigatorOptions: {
          animation: 'lift',
        }
      };
    },
    components: { myToolbar },
    mounted() {
    },
    emits: [ 'push' ]
  };

  const page1 = {
    name: 'page1',
    template: `
      <v-ons-page p1 @deviceBackButton="log($event)" @show="log('showing p1')">
        <my-toolbar>Page 1</my-toolbar>
        Page 1
        <v-ons-button @click="push">Push</v-ons-button>
      </v-ons-page>
    `,
    methods: {
      log,
      push() {
        this.$emit('push', markRaw({
          extends: page2,
          onsNavigatorProps: {
            myProp: 'This is a navigator prop'
          }
        }));
      }
    },
    components: { myToolbar },
    mounted() {
    },
    emits: [ 'push' ]
  };

	export default {
    data() {
      return {
        pageStack: [markRaw(page1)]
      };
    },
    methods: {
      log
    }
	};
</script>
