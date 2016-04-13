import {bootstrap, Component, OnsSwitch} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  directives: [OnsSwitch],
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Switch Example</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px;">
        <label><input type="checkbox" [(ngModel)]="target"> {{target ? 'On' : 'Off'}}</label>
        <br>
        <br>
        <ons-switch [(value)]="target"></ons-switch>
      </div>
    </div>
  </ons-page>
    `
})
export class AppComponent {
  target: boolean = true;

  constructor() {
  }
}

bootstrap(AppComponent);
