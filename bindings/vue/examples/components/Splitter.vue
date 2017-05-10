<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side
        :open.sync="splitterOpen"
        :swipeable="state.swipeable"
        :side="state.side"
        :collapse="state.collapse"
        :width="state.width"
        @preopen="log('preopen')"
        @postopen="log('postopen')"
        @preclose="log('preclose')"
        @postclose="log('postclose')"
        @modechange="log('modechange')"
      >
        <page-side :toggle-menu="toggleMenu"></page-side>
      </v-ons-splitter-side>
      <v-ons-splitter-content
        :is-open="splitterOpen"
        :side-state="state"
        :toggle-menu="toggleMenu"
      >
        <div :is="currentContent" :is-open="splitterOpen" :side-state="state" :toggle-menu="toggleMenu"></div>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
  const log = (...args) => console.log(...args);

  const pageSide = {
    template: `
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item
            v-for="item in [1, 2, 3, 4]"
            :key="item"
            @click="toggleMenu"
            tappable>
            Menu item {{ item }}
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-page>
    `,
    props: ['isOpen', 'toggleMenu'],
    methods: {
      log
    }
  };

  const pageContent = {
    template: `
     <v-ons-page>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-toolbar-button @click="toggleMenu()"><v-ons-icon icon="md-menu"></v-ons-icon></v-ons-toolbar-button>
        </div>
        <div class="center">Side menu</div>
      </v-ons-toolbar>
      <p style="text-align: center">
        Swipe right to open menu!
      </p>

      <v-ons-list>
        <v-ons-list-item>
          <div class="center">
            Side
          </div>
          <div class="right">
            <select v-model="sideState.side">
              <option>left</option>
              <option>right</option>
            </select>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
            Swipeable
          </div>
          <div class="right">
            <v-ons-switch
              :checked="sideState.swipeable"
              @change="sideState.swipeable = $event.target.checked"
            >
            </v-ons-switch>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
            Collapse
          </div>
          <div class="right">
            <select v-model="sideState.collapse">
              <option></option>
              <option>portrait</option>
              <option>landscape</option>
            </select>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
           State: {{sideState}} ; Is Open: {{isOpen}}
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
    `,
    methods: {
      log
    },
    props: ['isOpen', 'toggleMenu', 'sideState']
  };

  const pageContent2 = {
    template: `
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Another Page</div>
        </v-ons-toolbar>
        <p>After going back to the first page, the original VNode will be replaced with a normal VOnsPage due to the 'load' method. I.e. it cannot show this page anymore without refreshing.</p>
        <br>
        <v-ons-button @click="splitter.content.load(pageContent)">splitter.content.load(pageContent)</v-ons-button>
      </v-ons-page>
    `,
    methods: { log },
    props: ['pageContent']
  };


	export default {
    data: () => (
      {
        splitterOpen: false,
        currentContent: 'pageContent',
        pageContent,
        state: {
          side: 'left',
          width: '200px',
          collapse: '',
          swipeable: true
        }
      }
    ),

    components: {
      pageContent,
      pageContent2,
      pageSide
    },

    methods: {
      toggleMenu() {
        this.splitterOpen = !this.splitterOpen;
      },
      log
    }
	};
</script>
