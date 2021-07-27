<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        <v-ons-segment tabbar-id="tabbar" :index.sync="segmentIndex" style="width: 280px">
          <button>Page 1</button>
          <button>Page 2</button>
          <button>Page 3</button>
        </v-ons-segment>
      </div>
    </v-ons-toolbar>

    <!-- Comment <v-ons-tabbar> out to test this one -->
    <!-- <v-ons-segment :index.sync="segment2Index" style="width: 280px; margin: 10px 20px;">
      <button>Label 1</button>
      <button>Label 2</button>
      <button>Label 3</button>
    </v-ons-segment> -->

    <v-ons-tabbar swipeable id="tabbar" :tabs="tabs" :index.sync="tabbarIndex"></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  const homePage = {
    template: `
      <v-ons-page>
        <h2>Page1</h2>
        <v-ons-button @click="changeTab">Change tab via tabbar</v-ons-button>
        <v-ons-button @click="changeButton">Change tab via segment</v-ons-button>
        <v-ons-button @click="logIndexes">Log current button index</v-ons-button>
      </v-ons-page>
    `,
    props: ['changeTab', 'changeButton', 'logIndexes']
  };

  const tabPage = {
    template: `
      <v-ons-page>
        <h2>{{title}}</h2>
        <v-ons-button @click="logIndexes">Log current button index</v-ons-button>
      </v-ons-page>
    `,
    props: ['title', 'logIndexes']
  };

	export default {
    data() {
      return {
        segmentIndex: 0,
        segment2Index: 1,
        tabbarIndex: 0,
        tabs: [
          {
            page: homePage,
            props: {
              changeTab: this.changeTab,
              changeButton: this.changeButton,
              logIndexes: this.logIndexes
            }
          },
          {
            page: tabPage,
            props: {
              title: 'Page2',
              logIndexes: this.logIndexes
            }
          },
          {
            page: tabPage,
            props: {
              title: 'Page3',
              logIndexes: this.logIndexes
            }
          }
        ]
      };
    },
    methods: {
      log(...args) {
        console.log(...args)
      },
      changeTab() {
        this.tabbarIndex = 1
      },
      changeButton() {
        this.segmentIndex = 1
      },
      logIndexes() {
        console.log('active button index', this.segmentIndex);
        console.log('active tab index', this.tabbarIndex);
      }
    }
	};
</script>
