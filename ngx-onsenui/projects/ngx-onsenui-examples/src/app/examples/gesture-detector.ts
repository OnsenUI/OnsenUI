import {
  Component,
  ElementRef,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-gesture-detector',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Gesture Detector</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">

      <ons-gesture-detector style="height: 300px; margin: 50px;">
        <div style="border: 1px solid #ccc; background-color: #f9f9f9; width: 100%; height: 300px; line-height: 300px; text-align: center; color: #999;">
          {{status}}
        </div>
      </ons-gesture-detector>

      <p style="margin: 0 50px; color: #999; font-size: 15px;">Supporting events: Drag, Hold, Release, Swipe, Tap, DoubleTap, Transform, Pinch, Rotate(drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate).</p>

    </div>
  </ons-page>
    `
})
export class GestureDetectorComponent {
  status: string = 'Touch me!';

  constructor(elementRef: ElementRef) {
    const events = 'drag dragleft dragright dragup dragdown hold release swipe swipeleft ' +
      'swiperight swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate';

    events.split(/\s+/).forEach(event => {
      elementRef.nativeElement.addEventListener(event, (event: any) => this.handleGesture(event));
    });
  }

  handleGesture(event: any) {
    if (event.type !== 'release') {
      this.status = event.type;
    }
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [GestureDetectorComponent],
  declarations: [GestureDetectorComponent],
  bootstrap: [GestureDetectorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestureDetectorModule { }

