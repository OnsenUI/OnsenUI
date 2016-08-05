import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Ripple Effect</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">

      <ons-list>
        <ons-list-item ripple>In list item</ons-list-item>
      </ons-list>

      <div style="margin: 10px auto; width: 100px; height: 100px; background-color: gray; border: 1px solid #ccc;">
        <ons-ripple></ons-ripple>
        Click me!
      </div>

    </div>
  </ons-page>
  `
})
export class AppComponent{
}

bootstrap(AppComponent);
