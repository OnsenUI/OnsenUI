import {
  Component,
  DialogFactory,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Params,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  template: `
    <ons-dialog animation="default" cancelable #dialog>
      <div class="dialog-mask"></div>
      <div class="dialog">
        <div class="dialog-container" style="height: 200px;">
          <ons-page>
            <ons-toolbar>
              <div class="center">Name</div>
            </ons-toolbar>
            <div class="content">
              <div style="text-align: center">
                <p>{{message}}</p>
                <br>
                <ons-button (click)="dialog.hide()">Close</ons-button>
              </div>
            </div>
          </ons-page>
        </div>
      </div>
    </ons-dialog>
  `
})
class MyDialogComponent {
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
      <div class="center">Dialog</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center;">
        <br>
        <ons-button (click)="show()">Open</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private _dialog: any;
  private _destroyDialog: Function;

  constructor(private _dialogFactory: DialogFactory) {
  }

  ngOnInit() {
    this._dialogFactory
      .createDialog(MyDialogComponent, {message: 'This is just an example.'})
      .then(({dialog, destroy}) => {
        this._dialog = dialog;
        this._destroyDialog = destroy;
      });
  }

  show() {
    if (this._dialog) {
      this._dialog.show();
    }
  }

  ngOnDestroy() {
    this._destroyDialog();
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, MyDialogComponent],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
