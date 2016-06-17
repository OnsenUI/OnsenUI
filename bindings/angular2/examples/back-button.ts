import {bootstrap, Component} from '../src/angular2-onsenui';

declare var alert: Function;

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="left">
        <ons-back-button (click)="onClick()">
          <span class="back-button__icon"></span><span class="back-button__label">Back</span>
        </ons-back-button>
      </div>
      <div class="center">Back Button Example</div>
      <div class="right"></div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
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
