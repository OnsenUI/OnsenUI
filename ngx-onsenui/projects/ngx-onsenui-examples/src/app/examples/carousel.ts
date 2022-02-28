import {
  Component,
  ViewChild,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-carousel',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="left"><ons-toolbar-button id="prev" (click)="myCarousel.prev()">Prev</ons-toolbar-button></div>
      <div class="center">Carousel Example</div>
      <div class="right"><ons-toolbar-button id="next" (click)="myCarousel.next()">Next</ons-toolbar-button></div>
    </ons-toolbar>

    <div class="background"></div>
    <div class="content">

      <ons-carousel #myCarousel swipeable overscrollable auto-scroll fullscreen auto-scroll-ratio="0.4" animation-options="{duration: 0.1}">
        <ons-carousel-item id="slide-1" style="background-color: #009">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">1</div>
        </ons-carousel-item>
        <ons-carousel-item id="slide-2" style="background-color: gray">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">2</div>
        </ons-carousel-item>
        <ons-carousel-item id="slide-3" style="background-color: red">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">3</div>
        </ons-carousel-item>
        <ons-carousel-item id="slide-4" style="background-color: green">
          <div style="text-align: center; font-size: 88px; color: white; margin-top: 100px;">4</div>
        </ons-carousel-item>
      </ons-carousel>

    </div>
  </ons-page>
  `
})
export class CarouselComponent {
  @ViewChild('myCarousel') _carousel: any;
  constructor() { }

  doSomething() {
    this._carousel.next();
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [CarouselComponent],
  declarations: [CarouselComponent],
  bootstrap: [CarouselComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselModule { }

