import {
  bootstrap,
  Component,
  DialogFactory,
  AfterViewInit,
  ONS_DIRECTIVES,
  PageParams
} from '../src/angular2-onsenui';

@Component({
  selector: 'div',
  directives: [ONS_DIRECTIVES],
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

  constructor(params: PageParams) {
    this.message = <string>params.at('message');
  }
}

@Component({
  selector: 'app',
  providers: [DialogFactory],
  directives: [ONS_DIRECTIVES],
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
export class AppComponent {
  private _dialog: any;

  constructor(private _dialogFactory: DialogFactory) {
    this._dialogFactory.createDialog(MyDialogComponent, {message: 'This is just an example.'}).then(dialog => {
      this._dialog = dialog;
    });
  }

  show() {
    if (this._dialog) {
      this._dialog.show();
    }
  }
}

bootstrap(AppComponent);
