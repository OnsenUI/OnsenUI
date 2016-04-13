import {bootstrap, Component} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Switch Example</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px;">
        <ons-switch></ons-switch>
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
