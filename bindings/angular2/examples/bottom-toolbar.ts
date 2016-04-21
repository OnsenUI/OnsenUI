import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Bottom Toolbar</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
    </div>
    <ons-bottom-toolbar>
      <div style="float: right; padding-top: 12px;"><ons-toolbar-button>Right Button</ons-toolbar-button></div>
      <div style="padding-top: 12px;"><ons-toolbar-button>Left Button</ons-toolbar-button></div>
    </ons-bottom-toolbar>
  </ons-page>
  `
})
export class AppComponent{
}

bootstrap(AppComponent);
