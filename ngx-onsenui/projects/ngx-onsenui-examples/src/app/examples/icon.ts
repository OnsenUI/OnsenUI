import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-icon',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Icon Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px;">
        <ons-icon icon="md-home" size="24px"></ons-icon>
        <ons-icon icon="md-face" size="24px"></ons-icon>
        <ons-icon icon="md-zoom-in" size="24px"></ons-icon>
      </div>
    </div>
  </ons-page>
    `
})
export class IconComponent {
  constructor() {
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [IconComponent],
  declarations: [IconComponent],
  bootstrap: [IconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconModule { }

