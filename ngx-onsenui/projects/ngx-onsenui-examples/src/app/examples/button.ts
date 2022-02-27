import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

declare var alert: Function;

@Component({
  selector: 'app-button',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Button Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px;">
        <ons-button (click)="onClick()">MyButton</ons-button>
      </div>
    </div>
  </ons-page>
    `
})
export class ButtonComponent {
  constructor() {
  }

  onClick() {
    alert('Clicked!');
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
  bootstrap: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule { }

