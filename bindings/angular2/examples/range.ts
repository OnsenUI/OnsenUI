import {
  bootstrap,
  Component,
  OnsRange
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  directives: [OnsRange],
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Range Example</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px">
        <ons-range [(value)]="value"></ons-range><br>
        <ons-range modifier="material" [(value)]="value"></ons-range><br>
        {{value}}
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  value: string = '10';
  constructor() { }
}

bootstrap(AppComponent);
