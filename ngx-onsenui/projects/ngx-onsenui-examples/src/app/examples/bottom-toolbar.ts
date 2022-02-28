import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-bottom-toolbar',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Bottom Toolbar</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
    </div>
    <ons-bottom-toolbar>
      <div style="float: right; padding-top: 12px;"><ons-toolbar-button>Right Button</ons-toolbar-button></div>
      <div style="padding-top: 12px;"><ons-toolbar-button>Left Button</ons-toolbar-button></div>
    </ons-bottom-toolbar>
  </ons-page>
  `
})
export class BottomToolbarComponent{
}

@NgModule({
  imports: [OnsenModule],
  exports: [BottomToolbarComponent],
  declarations: [BottomToolbarComponent],
  bootstrap: [BottomToolbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BottomToolbarModule { }

