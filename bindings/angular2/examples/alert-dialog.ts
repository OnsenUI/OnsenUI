import {
  bootstrap,
  Component,
  ComponentRef,
  AlertDialogFactory,
  OnsAlertDialog,
  ViewChild,
  AfterViewInit,
  ONS_DIRECTIVES,
  PageParams
} from '../src/angular2-onsenui';

@Component({
  selector: 'div',
  directives: [ONS_DIRECTIVES],
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

  constructor(params: PageParams) {
    this.message = <string>params.at('message');
  }
}

@Component({
  selector: 'app',
  providers: [AlertDialogFactory],
  directives: [ONS_DIRECTIVES],
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
export class AppComponent implements AfterViewInit {
  private _alert: any;

  constructor(private _adf: AlertDialogFactory) {
  }

  ngAfterViewInit() {
    this._adf.createAlertDialog(MyAlertDialogComponent, {message: 'This is just an example.'}).then(alertDialog => {
      this._alert = alertDialog;
    });
  }

  showAlertDialog() {
    if (this._alert) {
      this._alert.show();
    }
  }
}

bootstrap(AppComponent);

