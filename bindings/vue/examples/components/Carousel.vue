<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left"><ons-toolbar-button @click="index--">Prev: Index--</ons-toolbar-button></div>
      <div class="center">Index: {{index}}</div>
      <div class="right"><ons-toolbar-button @click="index++">Next: Index++</ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-carousel v-model="index" fullscreen swipeable auto-scroll overscrollable @postchange="log('postchange!!')" @refresh="log('refresh!!')" @overscroll="log('overscroll!!')">
      <v-ons-carousel-item v-for="(value, key) in items" :style="{backgroundColor: value}">
        <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">{{key}}</div>
      </v-ons-carousel-item>
    </v-ons-carousel>
  </v-ons-page>
</template>

<script>
	export default {
    data: function() {
      return {
        index: 0,
        items: {
          BLUE: '#085078',
          DARK: '#373B44',
          ORANGE: '#D38312'
        }
      }
    },

    methods: {
      log: function(msg) {
        console.log(msg);
      }
    }
	};
</script>
