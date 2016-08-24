import {
  Component,
  ComponentRef,
  AlertDialogFactory,
  ViewChild,
  Params,
  AfterViewInit,
  OnDestroy,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  template: `
    <ons-alert-dialog cancelable #alert>
      <div class="alert-dialog-title">Warning!</div>
      <div class="alert-dialog-content">
        {{message}}
      </div>
      <div class="alert-dialog-footer">
        <button class="alert-dialog-button" (click)="alert.hide()">OK</button>
      </div>
    </ons-alert-dialog>
  `
})
class MyAlertDialogComponent {
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
      <div class="center">Alert Dialog</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="showAlertDialog()">show</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private _alert: any;
  private _destroyAlert: Function;

  constructor(private _adf: AlertDialogFactory) {
  }

  ngAfterViewInit() {
    this._adf
      .createAlertDialog(MyAlertDialogComponent, {message: 'This is just an example.'})
      .then(({alertDialog, destroy}) => {
        this._alert = alertDialog;
        this._destroyAlert = destroy;
      });
  }

  showAlertDialog() {
    if (this._alert) {
      this._alert.show();
    }
  }

  ngOnDestroy() {
    this._destroyAlert();
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, MyAlertDialogComponent],
  bootstrap: [AppComponent],
  entryComponents: [MyAlertDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
