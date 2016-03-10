import {bootstrap} from 'angular2/platform/browser'
import {
  Component,
  AfterViewInit
} from 'angular2/core';

declare var alert: Function;

@Component({
  selector: 'my-app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Button Example</div>
    </ons-toolbar>

    <div style="text-align: center; margin: 10px;">
      <ons-button (click)="onClick()">MyButton</ons-button>
    </div>
  </ons-page>
    `
})
export class AppComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {
  }

  onClick() {
    alert('Clicked!');
  }
}

bootstrap(AppComponent);
