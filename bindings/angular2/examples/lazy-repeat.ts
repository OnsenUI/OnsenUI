import {
  bootstrap,
  Component,
  ONS_DIRECTIVES,
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
        <ons-lazy-repeat id="my-list">
          <ons-list-item>
            {item}
          </ons-list-item>
        </ons-lazy-repeat>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    (<any>document.querySelector('#my-list')).delegate = {
      createItemContent: function(i, template) {
        const dom = template.cloneNode(true);
        dom.innerHTML = dom.innerHTML.replace('{item}', i);
        return dom;
      },

      countItems: function() {
        return 10000000;
      }
    };
  }

  refresh() {
    (<any>document.querySelector('#my-list')).refresh();
  }
}

bootstrap(AppComponent);
