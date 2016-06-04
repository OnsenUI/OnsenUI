import {
  bootstrap,
  ONS_DIRECTIVES,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'ons-page',
  directives: [ONS_DIRECTIVES],
  template: `
    <ons-toolbar>
      <div class="center">Content Page</div> 
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      contents
    </div>
  `
})
class ContentPageComponent {
}

@Component({
  selector: 'ons-page',
  directives: [ONS_DIRECTIVES],
  template: `
    <ons-toolbar>
      <div class="center">Left Page</div> 
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      Left
    </div>
  `
})
class SidePageComponent {
}

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
  template: `
  <ons-splitter>
    <ons-splitter-side [page]="sidePage" side="left" width="200px" style="border-right: 1px solid #ccc">
    </ons-splitter-side>

    <ons-splitter-content [page]="contentPage">
    </ons-splitter-content>
  </ons-splitter>
  `
})
export class AppComponent {
  sidePage = SidePageComponent;
  contentPage = ContentPageComponent;
}

bootstrap(AppComponent);
