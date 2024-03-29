import {
  Component,
  PopoverFactory,
  ViewChild,
  OnInit,
  OnDestroy,
  Params,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  template: `
    <ons-popover direction="up down" cancelable #popover (prehide)="onPreHide($event)">
      <div style="text-align: center; opacity: 0.7;">
        <p>{{message}}</p>
        <p><ons-button id="hide" (click)="popover.hide()" modifier="light">Hide</ons-button></p>
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

  onPreHide(event: any) {
    // event.cancel(); // cancel hiding popover
  }
}

@Component({
  selector: 'app-popover',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Popover</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button id="show" (click)="show(button)" #button>show Popover</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class PopoverComponent implements OnInit, OnDestroy {
  private _popover: any;
  private _destroyPopover: Function;

  constructor(private _popoverFactory: PopoverFactory) { }

  show(button: HTMLElement) {
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

@NgModule({
  imports: [OnsenModule],
  exports: [PopoverComponent],
  declarations: [PopoverComponent, MyPopoverComponent],
  bootstrap: [PopoverComponent],
  entryComponents: [MyPopoverComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopoverModule { }

