import {
  bootstrap,
  Component,
  AlertDialogFactory,
  OnsAlertDialog,
  ViewChild
} from '../src/angular2-onsenui';

@Component({
  selector: 'div',
  directives: [OnsAlertDialog],
  template: `
    <ons-alert-dialog animation="default" cancelable #alert>
      <div class="alert-dialog-title">Warning!</div>
      <div class="alert-dialog-content">
        An error has occurred!
      </div>
      <div class="alert-dialog-footer">
        <button class="alert-dialog-button" (click)="alert.destroy()">OK</button>
      </div>
    </ons-alert-dialog>
  `
})
class MyAlertDialogComponent {

  // TODO: fix undefined
  @ViewChild(OnsAlertDialog) private _alert: OnsAlertDialog;

  constructor() {
  }

  // TODO: add dipose component
}

@Component({
  selector: 'app',
  providers: [AlertDialogFactory],
  template: `
  <ons-page class="page" _compiled>
    <ons-toolbar>
      <div class="center">Alert Dialog</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="createAlertDialog()">create Alert Dialog</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  constructor(private adf: AlertDialogFactory) { }

  createAlertDialog() {
    this.adf.createAlertDialog(MyAlertDialogComponent);
  }
}

bootstrap(AppComponent);
