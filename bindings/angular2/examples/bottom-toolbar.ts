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
      <div class="center">Bottom Toolbar</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
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

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
