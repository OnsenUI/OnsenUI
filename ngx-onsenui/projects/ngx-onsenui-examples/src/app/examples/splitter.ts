import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Content Page</div> 
    </ons-toolbar>
    <div class="content">
      contents
    </div>
  `
})
export class ContentPageComponent {
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Left Page</div> 
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      Left
    </div>
  `
})
export class SidePageComponent {
}

@Component({
  selector: 'app-splitter',
  template: `
  <ons-splitter>
    <ons-splitter-side [page]="sidePage" side="left" width="200px" style="border-right: 1px solid #ccc">
    </ons-splitter-side>

    <ons-splitter-content [page]="contentPage">
    </ons-splitter-content>

    <ons-splitter-side [page]="sidePage" side="right" collapse swipeable width="200px" style="border-right: 1px solid #ccc">
    </ons-splitter-side>
  </ons-splitter>
  `
})
export class SplitterComponent {
  sidePage = SidePageComponent;
  contentPage = ContentPageComponent;
}

@NgModule({
  imports: [OnsenModule],
  exports: [SplitterComponent],
  declarations: [SplitterComponent, SidePageComponent, ContentPageComponent],
  bootstrap: [SplitterComponent],
  entryComponents: [SidePageComponent, ContentPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SplitterModule { }

