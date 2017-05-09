<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left"><v-ons-toolbar-button @click="carouselIndex--">Prev: Index--</v-ons-toolbar-button></div>
      <div class="center">Index: {{carouselIndex}}</div>
      <div class="right"><v-ons-toolbar-button @click="carouselIndex++">Next: Index++</v-ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-carousel fullscreen :index.sync="carouselIndex" swipeable auto-scroll overscrollable @postchange="log('postchange')" @refresh="log('refresh')" @overscroll="log('overscroll')">
      <v-ons-carousel-item v-for="(value, key) in items" :key="key" :style="{backgroundColor: value}">
        <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">{{key}}</div>
      </v-ons-carousel-item>
    </v-ons-carousel>

    <div :style="dots">
      <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
      </span>
    </div>
  </v-ons-page>
</template>

<script>
	export default {
    data() {
      return {
        carouselIndex: 1,
        items: {
          BLUE: '#085078',
          DARK: '#373B44',
          ORANGE: '#D38312'
        },
        dots: {
          textAlign: 'center',
          fontSize: '40px',
          color: '#fff',
          position: 'absolute',
          bottom: '40px',
          left: 0,
          right: 0
        }
      }
    },

    methods: {
      log(msg) {
        console.log(msg);
      }
    }
	};
</script>
