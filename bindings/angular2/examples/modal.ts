import {
  Component,
  ModalFactory,
  AfterViewInit,
  Params,
  OnInit,
  OnDestroy,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  template: `
    <ons-modal #modal>
      <p>{{message}}</p>
      <p><span (click)="modal.hide()" style="text-decoration: underline; cursor: pointer;">Click</span> to hide this modal.</p>
    </ons-modal>
  `
})
class MyModalComponent {
  message = '';

  constructor(params: Params) {
    this.message = <string>params.at('message');
  }
}

@Component({
  selector: 'app',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Modal</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center;">
        <br>
        <ons-button (click)="show()">show</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private _modal: any;
  private _destroyModal: Function;

  constructor(private _modalFactory: ModalFactory) {
  }

  ngOnInit() {
    this._modalFactory
      .createModal(MyModalComponent, {message: 'This is just an example.'})
      .then(({modal, destroy}) => {
        this._modal = modal;
        this._destroyModal = destroy;
      });
  }

  show() {
    if (this._modal) {
      this._modal.show();
    }
  }

  ngOnDestroy() {
    this._destroyModal();
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, MyModalComponent],
  bootstrap: [AppComponent],
  entryComponents: [MyModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
