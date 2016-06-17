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
      <div class="right"><ons-toolbar-button (click)="add()">Add</ons-toolbar-button></div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">
      <ons-list>
        <ons-list-item *onsLazyRepeat="let item of items; let i = index">
          <div class="center">
            #{{i}} msg: {{item.msg}}
          </div>
        </ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  public items: any[];

  @ViewChild(OnsLazyRepeat) lazyRepeat;

  constructor() {
    this.items = [];
    for (let i = 0; i < 1000; i++) {
      this.items.push({
        msg: 'Hello!'
      });
    }
  }

  add() {
    this.items.unshift({
      msg: 'Bonjour!'
    });
    this.lazyRepeat.refresh();
  }
}

bootstrap(AppComponent);
