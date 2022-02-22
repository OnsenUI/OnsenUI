import {
  Component,
  ViewChild,
  Injector,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ons-page[page]',
  template: `
    <div class="background"></div>
    <div class="content" class="normal-page">
      <h2>Page3</h2>
      <ons-button (click)="logIndexes()">Log current button index</ons-button>
    </div>
  `
})
export class Page3Component {
  constructor(private inj: Injector) { }

  logIndexes() {
    console.log('active button index', this.inj.get(AppComponent)._segment.nativeElement.getActiveButtonIndex());
    console.log('active tab index', this.inj.get(AppComponent)._tabbar.nativeElement.getActiveTabIndex());
  }
}

@Component({
  selector: 'ons-page[page]',
  template: `
    <div class="background"></div>
    <div class="content" class="normal-page">
      <h2>Page2</h2>
      <ons-button (click)="logIndexes()">Log current button index</ons-button>
    </div>
  `
})
export class Page2Component {
  constructor(private inj: Injector) { }

  logIndexes() {
    console.log('active button index', this.inj.get(AppComponent)._segment.nativeElement.getActiveButtonIndex());
    console.log('active tab index', this.inj.get(AppComponent)._tabbar.nativeElement.getActiveTabIndex());
  }
}

@Component({
  selector: 'ons-page[home]',
  template: `
    <div class="background"></div>
    <div class="content">
      <h2>Page1</h2>
      <ons-button (click)="changeTab()">Change tab via tabbar</ons-button>
      <ons-button (click)="changeButton()">Change tab via segment</ons-button>
      <ons-button (click)="logIndexes()">Log current button index</ons-button>
    </div>
  `
})
export class Page1Component {
  constructor(private inj: Injector) { }

  changeTab() {
    this.inj.get(AppComponent)._tabbar.nativeElement.setActiveTab(1);
  }

  changeButton() {
    this.inj.get(AppComponent)._segment.nativeElement.setActiveButton(1);
  }

  logIndexes() {
    console.log('active button index', this.inj.get(AppComponent)._segment.nativeElement.getActiveButtonIndex());
    console.log('active tab index', this.inj.get(AppComponent)._tabbar.nativeElement.getActiveTabIndex());
  }
}

@Component({
  selector: 'app',
  template: `
    <ons-page>
      <ons-toolbar>
        <div class="center">
          <ons-segment #segment style="width: 280px; margin-top: 8px;" [tabbar]="tabbar" (postchange)="onPostChange($event)">
            <button>Page 1</button>
            <button>Page 2</button>
            <button>Page 3</button>
          </ons-segment>
        </div>
      </ons-toolbar>

      <ons-tabbar #tabbar>
        <ons-tab [page]="page1" active></ons-tab>
        <ons-tab [page]="page2"></ons-tab>
        <ons-tab [page]="page3"></ons-tab>
      </ons-tabbar>
    </ons-page>
  `
})
export class AppComponent {
  @ViewChild('segment', {static: true}) _segment: any;
  @ViewChild('tabbar', {static: true}) _tabbar: any;
  page1 = Page1Component;
  page2 = Page2Component;
  page3 = Page3Component;

  constructor() {}

  onPostChange(event: any) {
    console.log('postchange event', event);
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, Page1Component, Page2Component, Page3Component],
  bootstrap: [AppComponent],
  entryComponents: [Page1Component, Page2Component, Page3Component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
