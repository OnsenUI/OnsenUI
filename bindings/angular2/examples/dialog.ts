import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-dialog animation="default" cancelable #dialog>
    <div class="dialog-mask"></div>
    <div class="dialog">
      <div class="dialog-container" style="height: 200px;">
        <ons-page>
          <ons-toolbar>
            <div class="center">Name</div>
          </ons-toolbar>
          <div class="page__background"></div>
          <div class="page__content">
            <div style="text-align: center">
              <br>
              <ons-button (click)="dialog.hide()">Close</ons-button>
            </div>
          </div>
        </ons-page>
      </div>
    </div>
  </ons-dialog>

  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Dialog</div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">
      <div style="text-align: center;">
        <br>
        <ons-button (click)="dialog.show()">Open</ons-button>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
}

bootstrap(AppComponent);
