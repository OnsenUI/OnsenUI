<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side
        :page="splitterSide"
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
      </v-ons-splitter-side>
      <v-ons-splitter-content
        :page="splitterContent"
        :side-state="state"
        :whatever="'testing'"
        :update="update"
        >
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
  const log = (...args) => console.log(...args);

  let splitterSide = {
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

  let splitterContent = {
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
            <v-ons-button @click="update">Update</v-ons-button>
          </div>
          <div class="center">
            Whatever
          </div>
          <div class="right">
            <v-ons-switch
              :checked="sideState.open"
              @change="sideState.open = $event.target.checked"
            >
            </v-ons-switch>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
            {{whatever}}; {{sideState}}
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
    `,
    methods: {
      log
    },
    props: ['whatever', 'sideState', 'update']
  };

	export default {
    data: () => (
      {
        splitterContent,
        splitterSide,
        state: {
          side: 'left',
          width: '200px',
          collapse: '',
          swipeable: true,
          open: false
        }
      }
    ),

    methods: {
      update: function() {
        this.state.open = true;
      },
      log
    }
	};
</script>
