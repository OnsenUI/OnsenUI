import 'onsenui';
import {bootstrap} from 'angular2/platform/browser';
import {
  Component,
  AfterViewInit,
  ElementRef,
  Type,
  ViewChild,
  Directive,
  DynamicComponentLoader,
  Query,
  QueryList
} from 'angular2/core';

@Directive({
  selector: 'ons-page',
  providers: []
})
export class OnsPage {
  constructor(public elementRef: ElementRef) {

  }
}


@Directive({
  selector: 'ons-navigator',
  providers: []
})
export class OnsNavigator {
  constructor(private elementRef: ElementRef) {
    //pageQueryList.changes.subscribe(() => console.log(pageQueryList.length));
  }

  pushComponent(type: Type) {
    console.log('pushComponent');
  }
}

@Component({
  selector: 'child-component',
  template: 'This is child component'
})
class ChildComponent {
  constructor(navi: OnsNavigator) {
    console.log('this is child', navi);
  }
}

@Component({
  selector: 'my-app',
  directives: [OnsNavigator, OnsPage, ChildComponent],
  template: `
  <ons-navigator #myNavigator>
    <ons-page _compiled class="page hoge" style="display: block">
      <ons-toolbar>
        <div class="center">Page</div>
      </ons-toolbar>
      <div class="page__background"></div>
      <div class="page__content" no-status-bar-fill>
        <div style="text-align: center; margin: 10px">
          <ons-button (click)="push()">push</ons-button>
          <child-component></child-component>
        </div>
      </div>
    </ons-page>
  </ons-navigator>
  `
})
export class AppComponent {
  @ViewChild(OnsNavigator) myNavi: OnsNavigator

  constructor() {

  }

  push() {
    this.myNavi.pushComponent(null);
  }
}

bootstrap(AppComponent);
