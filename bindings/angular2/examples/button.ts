import {bootstrap, Component} from '../src/angular2-onsenui';

declare var alert: Function;

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Button Example</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px;">
        <ons-button (click)="onClick()">MyButton</ons-button>
      </div>
    </div>
  </ons-page>
    `
})
export class AppComponent {
  constructor() {
  }

  onClick() {
    alert('Clicked!');
  }
}

bootstrap(AppComponent);
