import {
  bootstrap,
  Component,
  PopoverFactory,
  OnsPopover,
  ViewChild
} from '../src/angular2-onsenui';


@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">List</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <ons-list>
        <ons-list-header>
          Normal List Items
        </ons-list-header>

        <ons-list-item>
          <div class="center">
            One
          </div>
          <div class="right">
            label
          </div>
        </ons-list-item>

        <ons-list-item>
          <div class="center">
            Two
          </div>
          <div class="right">
            label
          </div>
        </ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent {
}

bootstrap(AppComponent);

