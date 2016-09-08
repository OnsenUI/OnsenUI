import {
  Component,
  ViewChild,
  OnsTab,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content" id="initial-page">
      <div style="text-align: center; margin: 10px">
        <p>Home</p>

        <button (click)="inc()">click! {{i}}</button>
      </div>
    </div>
  `
})
export class HomeComponent {
  i: number = 0;

  constructor() {
  }

  inc() {
    this.i++;
  }
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content" class="normal-page">
      <div style="text-align: center; margin: 10px">
        <p>Page</p>
      </div>
    </div>
  `
})
export class PageComponent {
}

@Component({
  selector: 'app',
  template: `
  <ons-tabbar>
    <div class="tab-bar__content"></div>
    <div class="tab-bar">
      <ons-tab label="Page1" icon="ion-home" [page]="home" active></ons-tab>
      <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
      <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
    </div>
  </ons-tabbar>
  `
})
export class AppComponent {
  home = HomeComponent
  page = PageComponent

  constructor() { }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, HomeComponent, PageComponent],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent, PageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
