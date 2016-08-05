import {
  bootstrap,
  Component,
  ViewChild,
  PageParams,
  ONS_DIRECTIVES,
  OnsTabbar,
  OnsTab
} from '../src/angular2-onsenui';

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content" id="initial-page">
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
    <div class="page__background"></div>
    <div class="page__content" class="normal-page">
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
  directives: [ONS_DIRECTIVES],
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
  @ViewChild(OnsTabbar) _tabbar: OnsTabbar; 

  home = HomeComponent
  page = PageComponent

  constructor() { }
}

bootstrap(AppComponent);


