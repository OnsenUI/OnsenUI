import {
  Component,
  ViewChild,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ons-page[home]',
  template: `
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
  selector: 'ons-page[page]',
  template: `
    <div class="content normal-page">
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
    <ons-page>
      <ons-toolbar>
        <div class="center">Tabbar</div>
        <div class="right">
          Index: <span id="index">{{index}}</span>
        </div>
      </ons-toolbar>
      <ons-tabbar swipeable animation="none" position="auto" (swipe)="onSwipe($event)">
        <div class="tabbar__content"></div>
        <div class="tabbar">
          <ons-tab label="Page1" icon="ion-home" [page]="home" active></ons-tab>
          <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
          <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
        </div>
      </ons-tabbar>
    </ons-page>
  `
})
export class AppComponent {
  home = HomeComponent;
  page = PageComponent;
  index = 0.0;

  constructor() { }

  onSwipe(event: any) {
    this.index = event.index;
  }
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
