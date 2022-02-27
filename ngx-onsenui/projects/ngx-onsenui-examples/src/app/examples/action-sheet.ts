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
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import * as ons from 'onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Action Sheet</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="actionSheet.show()">show (static action sheet)</ons-button><br>
        <ons-button (click)="showActionSheet()">show (dynamic action sheet)</ons-button><br>
        <span style="color: grey">Animations:</span><br>
        <ons-button modifier="outline" (click)="animation = 'default'">Default</ons-button>
        <ons-button modifier="outline" (click)="animation = 'none'">None</ons-button>
      </div>
    </div>
  </ons-page>

  <ons-action-sheet #actionSheet cancelable [attr.animation]="animation">
    <div class="action-sheet-mask"></div>
    <div class="action-sheet">
      <div class="action-sheet-title">Static action sheet</div>
      <ons-action-sheet-button icon="md-square-o" (click)="actionSheet.hide()">Label 0</ons-action-sheet-button>
      <ons-action-sheet-button icon="md-square-o" (click)="actionSheet.hide()">Label 1</ons-action-sheet-button>
      <ons-action-sheet-button icon="md-square-o" (click)="actionSheet.hide()" modifier="destructive">Label 2</ons-action-sheet-button>
      <ons-action-sheet-button icon="md-close" (click)="actionSheet.hide()">Cancel</ons-action-sheet-button>
    </div>
  </ons-action-sheet>
  `
})
export class AppComponent {
  animation: string = 'default';

  constructor() {
  }

  showActionSheet() {
    ons.openActionSheet({
      title: 'Dynamic action sheet',
      cancelable: true,
      buttons: [
        'Label 0',
        'Label 1',
        {
          label: 'Label 2',
          modifier: 'destructive'
        },
        {
          label: 'Cancel',
          icon: 'md-close'
        }
      ],
      animation: this.animation,
    });
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
