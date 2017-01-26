<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side
        :isOpen="splitterOpen"
        :side="state.side"
        :collapse="state.collapse"
        :swipeable="state.swipeable"
        :width="state.width"
        @preopen="log('preopen!!')"
        @postopen="log('postopen!!')"
        @preclose="log('preclose!!')"
        @postclose="log('postclose!!')"
        @modechange="log('modechange!!')"
      >
        <page-side></page-side>
      </v-ons-splitter-side>
      <v-ons-splitter-content
        :side-state="state"
        :whatever="'testing'"
        :update="update"
        :goToPageContent2="goToPageContent2"
        >
        <div :is="currentContent" :side-state="state" :update="update" :whatever="'testing'" :goToPageContent2="goToPageContent2" :pageContent="pageContent"></div>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
  const log = (...args) => console.log(...args);

  let pageSide = {
    template: `
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item
            v-for="item in [1, 2, 3, 4]"
            @click="splitter.side.close()"
            tappable>
            Menu item {{ item }}
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-page>
    `,
    methods: {
      log
    }
  };

  let pageContent = {
    template: `
     <v-ons-page :jiooo="whatever">
      <v-ons-toolbar>
        <div class="left">
          <v-ons-toolbar-button @click="splitter.side.toggle()"><v-ons-icon icon="md-menu"></v-ons-icon></v-ons-toolbar-button>
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
          <div class="left">
            <v-ons-button @click="update(true)">Update</v-ons-button>
          </div>
          <div class="center">
            Whatever
          </div>
          <div class="right">
            <v-ons-switch
              :checked="sideState.open"
              @change="update($event.target.checked)"
            >
            </v-ons-switch>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
            {{whatever}}; {{sideState}}
          </div>
        </v-ons-list-item>
        <v-ons-list-item modifier="chevron" tappable @click="goToPageContent2">
          <div class="center">
            Go to pageContent2 by changing splitter children
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
    `,
    methods: {
      log
    },
    props: ['whatever', 'sideState', 'update', 'goToPageContent2']
  };

  let pageContent2 = {
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
    methods: {
      log: function() {
        console.log(...arguments);
      }
    },
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
          swipeable: true,
          open: false
        }
      }
    ),

    components: {
      pageContent,
      pageContent2,
      pageSide
    },

    methods: {
      update: function(value) {
        this.splitterOpen = '';
        setTimeout(() => this.splitterOpen = value, 100)
        this.state.open = value;
      },
      goToPageContent2: function() {
        this.currentContent = 'pageContent2';
      },
      log
    }
	};
</script>
