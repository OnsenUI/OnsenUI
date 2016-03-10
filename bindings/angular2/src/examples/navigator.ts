import {bootstrap} from 'angular2/platform/browser'
import {
  Component,
  AfterViewInit
} from 'angular2/core';

@Component({
  selector: 'my-app',
  template: `
  <ons-navigator #myNavigator>
    <ons-page>
      <ons-toolbar>
        <div class="center">Navigator Example</div>
      </ons-toolbar>

      <div style="text-align: center; margin: 10px;">
        <ons-button (click)="alert('hoge');">alert</ons-button>
        <ons-button (click)="console.log('hoge');myNavigator.pushPage('page.html').catch(console.log.bind(console))">push</ons-button>
      </div>
    </ons-page>
  </ons-navigator>
    `
})
export class AppComponent {
  constructor() {
  }
}

bootstrap(AppComponent);
