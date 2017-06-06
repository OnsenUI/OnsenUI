import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

declare var alert: Function;

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Card Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <ons-card>
        <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
        <div class="title">
          Awesome framework
        </div>
        <div class="content">
          <div>
            <ons-button><ons-icon icon="ion-thumbsup"></ons-icon></ons-button>
            <ons-button><ons-icon icon="ion-share"></ons-icon></ons-button>
          </div>
          <ons-list>
            <ons-list-header>Bindings</ons-list-header>
            <ons-list-item>Vue</ons-list-item>
            <ons-list-item>Angular</ons-list-item>
            <ons-list-item>React</ons-list-item>
          </ons-list>
        </div>
      </ons-card>
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

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
