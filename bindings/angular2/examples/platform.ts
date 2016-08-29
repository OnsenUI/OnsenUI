import {
  Component,
  onsPlatform,
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
      <div class="center">onsPlatform Example</div>
    </ons-toolbar>

    <div class="background"></div>
    <div class="content">
      <div style="margin: 10px;">

        <ul>
          <li>
            isIOS() => {{platform.isIOS()}}
          </li>
          <li>
            isAndroid() => {{platform.isAndroid()}}
          </li>
          <li>
            isChrome() => {{platform.isChrome()}}
          </li>
          <li>
            getMobileOS() => {{platform.getMobileOS()}}
          </li>
        </ul>

      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  public platform = onsPlatform;
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
