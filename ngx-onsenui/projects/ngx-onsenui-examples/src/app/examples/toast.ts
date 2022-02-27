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
} from 'ngx-onsenui';

import * as ons from 'onsenui';

@Component({
  selector: 'app-toast',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Toast</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="toast.show()">show (static toast)</ons-button><br>
        <ons-button (click)="showToast()">show (dynamic toast)</ons-button><br>
        <span style="color: grey">Animations:</span><br>
        <ons-button modifier="outline" (click)="animation = 'none'">None</ons-button>
        <ons-button modifier="outline" (click)="animation = 'ascend'">Ascend</ons-button>
        <ons-button modifier="outline" (click)="animation = 'lift'">Lift</ons-button>
        <ons-button modifier="outline" (click)="animation = 'fall'">Fall</ons-button>
        <ons-button modifier="outline" (click)="animation = 'fade'">Fade</ons-button>
      </div>
    </div>
  </ons-page>

  <ons-toast #toast [attr.animation]="animation">
    <div class="toast">
      <div class="toast__message">
        This is a static Onsen Toast!
      </div>
      <button class="toast__button" (click)="toast.hide()">Hoge</button>
    </div>
  </ons-toast>
  `
})
export class ToastComponent {
  animation: string = 'default';

  constructor() {
  }

  showToast() {
    ons.notification.toast(
      'This is a dynamic Onsen Toast!',
      {
        buttonLabel: 'Hoge',
        animation: this.animation,
      }
    );
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  bootstrap: [ToastComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastModule { }

