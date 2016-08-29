import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Icon Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px;">
        <ons-icon icon="md-home" size="24px"></ons-icon>
        <ons-icon icon="md-face" size="24px"></ons-icon>
        <ons-icon icon="md-zoom-in" size="24px"></ons-icon>
      </div>
    </div>
  </ons-page>
    `
})
export class AppComponent {
  constructor() {
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
