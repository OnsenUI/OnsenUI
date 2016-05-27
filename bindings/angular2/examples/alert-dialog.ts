import {
  bootstrap,
  Component,
  ComponentRef,
  AlertDialogFactory,
  OnsAlertDialog,
  ViewChild,
  AfterViewInit
} from '../src/angular2-onsenui';

@Component({
  selector: 'div',
  directives: [OnsAlertDialog],
  template: `
    <ons-alert-dialog cancelable (cancel)="hide()">
      <div class="alert-dialog-title">Warning!</div>
      <div class="alert-dialog-content">
        This is just an example!
      </div>
      <div class="alert-dialog-footer">
        <button class="alert-dialog-button" (click)="hide()">OK</button>
      </div>
    </ons-alert-dialog>
  `
})
class MyAlertDialogComponent implements AfterViewInit {

  @ViewChild(OnsAlertDialog) private _alert: OnsAlertDialog;

  constructor() {
  }

  ngAfterViewInit() {
    this._alert.show();
  }

  hide() {
    this._alert.hide();
  }
}

@Component({
  selector: 'app',
  providers: [AlertDialogFactory],
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Alert Dialog</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="showAlertDialog()">create Alert Dialog</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent implements AfterViewInit {
  private _alert: ComponentRef<MyAlertDialogComponent>;

  constructor(private adf: AlertDialogFactory) {
  }

  ngAfterViewInit() {
  }

  showAlertDialog() {
    this.adf.createAlertDialog(MyAlertDialogComponent).then(componentRef => {
      this._alert = componentRef;
    });
  }
}

bootstrap(AppComponent);
