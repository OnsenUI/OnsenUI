import {
  bootstrap,
  Component,
  PopoverFactory,
  OnsPopover,
  ViewChild
} from '../src/angular2-onsenui';

@Component({
  selector: 'div',
  directives: [OnsPopover],
  template: `
    <ons-popover direction="up down" cancelable>
      <div class="popover__container"><div class="popover__content">
        <div style="text-align: center; opacity: 0.5;">
          <p>This is a popover!</p>
          <p><small>Click the background to remove the popover.</small></p>
        </div>
      </div></div>
    </ons-popover>
  `
})
class MyPopoverComponent {

  // TODO: fix undefined
  @ViewChild(OnsPopover) private _popover: OnsPopover;

  constructor() {
  }
}

@Component({
  selector: 'app',
  providers: [PopoverFactory],
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Popover</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="createPopover()">create Popover</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  constructor(private _popoverFactory: PopoverFactory) { }

  createPopover() {
    this._popoverFactory.createPopover(MyPopoverComponent);
  }
}

bootstrap(AppComponent);

