<template>
  <ons-page>
    <ons-splitter>
      <ons-splitter-side
        :side="side"
        :collapse="collapse"
        :swipeable="swipeable"
        :width="width"
        :open="open"
        @preopen="open = true"
        @postclose="open = false"
      >
        <ons-page>
          <ons-list>
            <ons-list-item
              v-for="item in [1, 2, 3, 4]"
              @click="open = false"
              tappable>
              Menu item {{ item }}
            </ons-list-item>
          </ons-list>
        </ons-page>
      </ons-splitter-side>
      <ons-splitter-content>
        <ons-page>
          <ons-toolbar>
            <div class="left">
              <ons-back-button @click="$pop()" label='Home'></ons-back-button>
            </div>
            <div class="center">Side menu</div>
          </ons-toolbar>
          <p style="text-align: center">
            Swipe right to open menu!
          </p>

          <ons-list>
            <ons-list-item>
              <div class="center">
                Side
              </div>
              <div class="right">
                <select v-model="side">
                  <option>left</option>
                  <option>right</option>
                </select>
              </div>
            </ons-list-item>
            <ons-list-item>
              <div class="center">
                Swipeable
              </div>
              <div class="right">
                <ons-switch
                  :checked="swipeable"
                  @change="swipeable = $event.target.checked"
                >
                </ons-switch>
              </div>
            </ons-list-item>
            <ons-list-item>
              <div class="center">
                Collapse
              </div>
              <div class="right">
                <ons-switch
                  :checked="collapse"
                  @change="collapse = $event.target.checked"
                >
                </ons-switch>
              </div>
            </ons-list-item>
            <ons-list-item>
              <div class="center">
                Open
              </div>
              <div class="right">
                <ons-switch
                  :checked="open"
                  @change="open = $event.target.checked"
                >
                </ons-switch>
              </div>
            </ons-list-item>
          </ons-list>
        </ons-page>
      </ons-splitter-content>
    </ons-splitter>
  </ons-page>
</template>

<script>
  import {
    OnsBackButton,
    OnsSplitterSide,
    OnsSwitch
  } from 'vue-onsenui';

	export default {
    data: () => (
      {
        side: 'left',
        width: '200px',
        collapse: true,
        swipeable: true,
        open: false
      }
    ),

    components: {
      OnsBackButton,
      OnsSplitterSide,
      OnsSwitch
    }
	};
</script>
