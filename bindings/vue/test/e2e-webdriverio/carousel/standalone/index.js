import ons from 'onsenui';

ons.ready(function(){
  // new Vue() should be called after ons.ready.
  // Otherwise something will be broken.
  new Vue({
    el: '#app',
    template: `
      <div>
        <span id="is-mounted"></span>

        <h2>No attributes</h2>
        <v-ons-carousel id="no-attributes"></v-ons-carousel><br>

        <h2>With children</h2>

        <h3>v-ons-carousel-item</h3>
        <v-ons-carousel swipeable auto-scroll overscrollable style="width: 360px; height: 360px;">
          <v-ons-carousel-item style="background-color: #085078;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              BLUE
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #373B44;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              DARK
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #D38312;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              ORANGE
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>

        <h2>Events</h2>

        <h3>postchange</h3>
        <v-ons-carousel swipeable auto-scroll overscrollable style="width: 360px; height: 360px;" @postchange="onPostChange()">
          <v-ons-carousel-item style="background-color: #085078;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              BLUE
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #373B44;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              DARK
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #D38312;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              ORANGE
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>

        <h3>refresh</h3>
        <v-ons-carousel ref="carouselToRefresh" swipeable auto-scroll overscrollable style="width: 360px; height: 360px;" @refresh="onRefresh()">
          <v-ons-carousel-item style="background-color: #085078;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              BLUE
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #373B44;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              DARK
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #D38312;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              ORANGE
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>
        <button @click="refresh()">refresh</button>

        <h3>overscroll</h3>
        <v-ons-carousel swipeable auto-scroll overscrollable style="width: 360px; height: 360px;" @overscroll="onOverScroll()">
          <v-ons-carousel-item style="background-color: #085078;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              BLUE
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #373B44;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              DARK
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item style="background-color: #D38312;">
            <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">
              ORANGE
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>
      </div>
    `,
    methods: {
      refresh() {
        this.$refs.carouselToRefresh.$el.refresh();
      },
      onPostChange() {
        alert('postchange');
      },
      onRefresh() {
        alert('refresh');
      },
      onOverScroll() {
        alert('overscroll');
      }
    }
  });
});
