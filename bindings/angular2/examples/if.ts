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
      <div class="center">ons-if</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">

      <ons-if class="box" orientation="portrait">ons-if orientation=portrait</ons-if>

      <ons-if class="box" orientation="landscape">ons-if orientation=landscape</ons-if>

      <ons-if class="box" platform="chrome">ons-if platform=chrome</ons-if>

      <ons-if class="box" platform="android">ons-if platform=android</ons-if>

      <ons-if class="box" platform="ios">ons-if platform=ios</ons-if>

    </div>
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
