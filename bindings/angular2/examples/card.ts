import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
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
        <div class="title right">Awesome card title</div>
        <div class="content">
          <ons-list>
            <ons-list-header>Awesome card 1 info</ons-list-header>
            <ons-list-item>Awesome card 1 info 1</ons-list-item>
            <ons-list-item>Awesome card 1 info 2</ons-list-item>
            <ons-list-header>Awesome card 2 info</ons-list-header>
            <ons-list-item>Awesome card 2 info 1</ons-list-item>
            <ons-list-item>Awesome card 2 info 2</ons-list-item>
          </ons-list>
          <div class="button-bar" style="margin-top: 1%;">
            <ons-button>Action 1</ons-button>
            <ons-button>Action 2</ons-button>
            <ons-button>Action 3</ons-button>
          </div>
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
