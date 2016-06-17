import {bootstrap, Component} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Icon Example</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px;">
        <ons-icon icon="md-home" size="24px"></ons-icon>
        <ons-icon icon="md-face" size="24px"></ons-icon>
        <ons-icon icon="md-zoom-in" size="24px"></ons-icon>
      </div>
    </div>
  </ons-page>
    `
})
export class AppComponent {
  constructor() {
  }
}

bootstrap(AppComponent);
