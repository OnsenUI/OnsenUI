import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="left"><ons-toolbar-button id="left">Left</ons-toolbar-button></div>
      <div class="center">Toolbar Buttons</div>
      <div class="right"><ons-toolbar-button id="right">Right</ons-toolbar-button></div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
    </div>
    <ons-bottom-toolbar>
    </ons-bottom-toolbar>
  </ons-page>
  `
})
export class AppComponent{
}

bootstrap(AppComponent);
