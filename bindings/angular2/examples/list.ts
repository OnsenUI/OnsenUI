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
  <ons-page class="page" _compiled>
    <ons-toolbar>
      <div class="center">Popover</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <ons-list>
        <ons-list-header>
          Normal List Items
        </ons-list-header>

        <ons-list-item>
          One
        </ons-list-item>

        <ons-list-item>
          Two
        </ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent {
}

bootstrap(AppComponent);

