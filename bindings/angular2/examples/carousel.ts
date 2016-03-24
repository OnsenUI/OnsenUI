import {
  bootstrap,
  Component,
  ViewChild,
  OnsCarousel
} from '../src/angular2-onsenui';

@Component({
  selector: 'ons-page',
  directives: [OnsCarousel],
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content" no-status-bar-fill>
      <div style="text-align: center; margin: 10px">
      </div>
    </div>
  `
})
export class PageComponent {
  constructor() {
  }
}

@Component({
  selector: 'my-app',
  directives: [],
  template: `
  <ons-page _compiled>
    <ons-toolbar>
      <div class="left"><ons-toolbar-button>Prev</ons-toolbar-button></div>
      <div class="center">Carousel Example</div>
      <div class="right"><ons-toolbar-button>Next</ons-toolbar-button></div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">
      <ons-carousel swipeable overscrollable auto-scroll fullscreen auto-scroll-ratio="0.2" animation-options="{duration: 0.1}">
        <ons-carousel-item style="background-color: #009">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">1</div>
        </ons-carousel-item>
        <ons-carousel-item style="background-color: gray">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">2</div>
        </ons-carousel-item>
        <ons-carousel-item style="background-color: red">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">3</div>
        </ons-carousel-item>
        <ons-carousel-item style="background-color: green">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">4</div>
        </ons-carousel-item>
      </ons-carousel>

    </div>
  </ons-page>
  `
})
export class AppComponent {
  @ViewChild(OnsCarousel) _carousel: any;

  constructor() { }

  next() {
    this._carousel.element.next();
  }

  prev() {
    this._carousel.element.prev();
  }
}

bootstrap(AppComponent);
