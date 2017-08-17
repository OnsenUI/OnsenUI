<template>
  <v-ons-carousel auto-refresh fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex">
    <v-ons-carousel-item v-for="(value, key) in items" :key="key" :style="{backgroundColor: value}">
      <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">{{key}}</div>
    </v-ons-carousel-item>
  </v-ons-carousel>
</template>

<script>
export default {
  data() {
    return {
      carouselIndex: 0,
      items: {
        BLUE: '#085078',
        DARK: '#373B44',
        ORANGE: '#D38312'
      }
    };
  }
};
</script>
