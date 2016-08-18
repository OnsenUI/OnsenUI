import {
  bootstrap,
  Component,
  ONS_DIRECTIVES,
  PopoverFactory,
  ViewChild,
  OnInit,
  OnDestroy,
  Params
} from '../src/angular2-onsenui';

@Component({
  selector: 'div',
  directives: [ONS_DIRECTIVES],
  template: `
    <ons-popover direction="up down" cancelable #popover (prehide)="onPreHide($event)">
      <div style="text-align: center; opacity: 0.7;">
        <p>{{message}}</p>
        <p><ons-button (click)="popover.hide()" modifier="light">Hide</ons-button></p>
      </div>
    </ons-popover>
  `
})
class MyPopoverComponent implements OnInit {

  @ViewChild('popover') _popover: any;

  message = '';

  constructor(params: Params) {
    this.message = <string>params.at('msg');
  }

  ngOnInit() {
    console.log('popover:', this._popover.nativeElement);
  }

  onPreHide(event) {
    // event.cancel(); // cancel hiding popover
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
        <ons-button (click)="show(button)" #button>show Popover</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private _popover: any;
  private _destroyPopover: Function;

  constructor(private _popoverFactory: PopoverFactory) { }

  show(button) {
    if (this._popover) {
      this._popover.show(button);
    }
  }

  ngOnInit() {
    this._popoverFactory
      .createPopover(MyPopoverComponent, {msg: 'This is popover.'})
      .then(({popover, destroy}) => {
        this._popover = popover;
        this._destroyPopover = destroy;
      });
  }

  ngOnDestroy() {
    this._destroyPopover();
  }
}

bootstrap(AppComponent);

