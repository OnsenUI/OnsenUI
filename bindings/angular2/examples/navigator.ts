import {
  bootstrap,
  Component,
  ViewChild,
  ONS_DIRECTIVES,
  PageParams,
  OnsNavigator
} from '../src/angular2-onsenui';

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
        <ons-button (click)="pop()">pop</ons-button>
        <p>page2</p>
      </div>
    </div>
  `
})
export class PageComponent {
  constructor(private _navigator: OnsNavigator, private _params: PageParams) {
    console.log('parameters:', _params.data);
  }

  push() {
    this._navigator.element.pushPage(PageComponent, {animation: 'slide', data: {aaa: 'bbb'}});
  }

  pop() {
    this._navigator.element.popPage();
  }
}

@Component({
  selector: 'ons-page',
  directives: [ONS_DIRECTIVES],
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="push(navi)">push</ons-button>
      </div>
    </div>
  `
})
class DefaultPageComponent {
  constructor(private _navigator: OnsNavigator) {
  }

  push() {
    this._navigator.element.pushPage(PageComponent, {data: {hoge: "fuga"}});
  }
}

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
  template: `
  <ons-navigator [page]="page"></ons-navigator>
  `
})
export class AppComponent {
  page = DefaultPageComponent
}

bootstrap(AppComponent);
