import {
  bootstrap,
  Component,
  ONS_DIRECTIVES
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Speed Dial</div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">

      <ons-speed-dial position="right bottom" direction="up">
        <ons-fab><ons-icon icon="md-car"></ons-icon></ons-fab>
        <ons-speed-dial-item>A</ons-speed-dial-item>
        <ons-speed-dial-item>B</ons-speed-dial-item>
        <ons-speed-dial-item>C</ons-speed-dial-item>
      </ons-speed-dial>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  constructor() {
  }
}

bootstrap(AppComponent);
