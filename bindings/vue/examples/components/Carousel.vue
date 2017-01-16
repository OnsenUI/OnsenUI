<template>
  <ons-page>
    <v-ons-carousel fullscreen swipeable auto-scroll overscrollable @postchange="log('postchange!!')" @refresh="log('refresh!!')" @overscroll="log('overscroll!!')">
      <v-ons-carousel-item v-for="(value, key) in items" :style="{backgroundColor: value}">
        <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">{{key}}</div>
      </v-ons-carousel-item>
    </v-ons-carousel>
  </ons-page>
</template>

<script>
	export default {
    data: function() {
      return {
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
