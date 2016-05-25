import {
  bootstrap,
  Component,
  ONS_DIRECTIVES,
  OnsLazyRepeat,
  ViewChild,
  OnInit
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="left"></div>
      <div class="center">Lazy Repeat</div>
      <div class="right"><ons-toolbar-button (click)="refresh()">Refresh</ons-toolbar-button></div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">

      <ons-list>
        <ons-lazy-repeat [delegate]="self">
          <ons-list-item>
            #{item}
          </ons-list-item>
        </ons-lazy-repeat>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  self = this;

  @ViewChild(OnsLazyRepeat) lazyRepeat;

  constructor() {
  }

  createItemContent(i, template) {
    const dom = template.cloneNode(true);
    dom.innerHTML = dom.innerHTML.replace('{item}', i);
    return dom;
  }

  countItems() {
    return 10000000;
  }

  destroyItem(index, item) {
    console.log('Destroyed item with index: ' + index);
  }

  refresh() {
    this.lazyRepeat.refresh();
  }
}

bootstrap(AppComponent);
