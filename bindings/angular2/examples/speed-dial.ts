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
      <div class="center">Speed Dial</div>
    </ons-toolbar>

    <div class="background"></div>
    <div class="content">

      <ons-speed-dial position="right bottom" direction="up">
        <ons-fab><ons-icon icon="md-car"></ons-icon></ons-fab>
        <ons-speed-dial-item>A</ons-speed-dial-item>
        <ons-speed-dial-item>B</ons-speed-dial-item>
        <ons-speed-dial-item>C</ons-speed-dial-item>
      </ons-speed-dial>
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
