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
    <div class="page__content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="push()">push</ons-button>
        <ons-button (click)="pop()">pop</ons-button>
        <p>page2</p>
      </div>
    </div>
  `
})
export class PageComponent {
  constructor() {
  }
}

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
  template: `
  <ons-tabbar>
    <div class="tab-bar__content"></div>
    <div class="tab-bar">
      <ons-tab label="Page1" icon="ion-home" (page)="home"></ons-tab>
      <ons-tab label="Page2" icon="ion-help"></ons-tab>
      <ons-tab label="Page3" icon="ion-stop"></ons-tab>
    </div>
  </ons-tabbar>
  `
})
export class AppComponent {
  @ViewChild(OnsTabbar) _tabbar: OnsTabbar; 

  home = PageComponent

  constructor() { }
}

bootstrap(AppComponent);


