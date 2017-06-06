import {
  Component,
  ViewChild,
  Params,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="left"><ons-back-button>Back</ons-back-button></div>
      <div class="center">Page2</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="push()">push</ons-button>
        <ons-button id="pop" (click)="pop()">pop</ons-button>
        <p>page2</p>
      </div>
    </div>
  `
})
export class PageComponent {
  constructor(private _navigator: OnsNavigator, private _params: Params) {
    console.log('parameters:', _params.data);
  }

  push() {
    this._navigator.nativeElement.pushPage(PageComponent, {animation: 'slide', data: {aaa: 'bbb'}});
  }

  pop() {
    this._navigator.nativeElement.popPage();
  }
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="content">
      <div id="message">{{msg}}</div>
      <div style="text-align: center; margin: 10px">
        <ons-button id="push" (click)="push(navi)">push (no animation)</ons-button>
      </div>
    </div>
  `
})
export class DefaultPageComponent {
  msg = 'Click to push:'

  constructor(private _navigator: OnsNavigator) {
  }

  push() {
    this._navigator.nativeElement.pushPage(PageComponent, {data: {hoge: "fuga"}});
  }
}

@Component({
  selector: 'app',
  template: `
  <ons-navigator animation="none" [page]="page"></ons-navigator>
  `
})
export class AppComponent {
  page = DefaultPageComponent
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, DefaultPageComponent, PageComponent],
  entryComponents: [DefaultPageComponent, PageComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
