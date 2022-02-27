import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-toolbar-button',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="left"><ons-toolbar-button id="left">Left</ons-toolbar-button></div>
      <div class="center">Toolbar Buttons</div>
      <div class="right"><ons-toolbar-button id="right">Right</ons-toolbar-button></div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
    </div>
    <ons-bottom-toolbar>
    </ons-bottom-toolbar>
  </ons-page>
  `
})
export class ToolbarButtonComponent {
}

@NgModule({
  imports: [OnsenModule],
  exports: [ToolbarButtonComponent],
  declarations: [ToolbarButtonComponent],
  bootstrap: [ToolbarButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarButtonModule { }

