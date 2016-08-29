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
  <ons-page class="page">
    <ons-toolbar>
      <div class="left"><ons-toolbar-button id="left">Left</ons-toolbar-button></div>
      <div class="center">Toolbar Buttons</div>
      <div class="right"><ons-toolbar-button id="right">Right</ons-toolbar-button></div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
    </div>
    <ons-bottom-toolbar>
    </ons-bottom-toolbar>
  </ons-page>
  `
})
export class AppComponent {
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
