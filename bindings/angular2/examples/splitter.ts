import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

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
class ContentPageComponent {
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Left Page</div> 
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      {{msg}}
    </div>
  `
})
class LeftPageComponent {
  msg = 'Left'
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Right Page</div> 
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      {{msg}}
    </div>
  `
})
class RightPageComponent {
  msg = 'Right'
}

@Component({
  selector: 'app',
  template: `
  <ons-splitter>
    <ons-splitter-side [page]="leftPage" side="left" width="200px" style="border-right: 1px solid #ccc">
    </ons-splitter-side>

    <ons-splitter-content [page]="contentPage">
    </ons-splitter-content>

    <ons-splitter-side [page]="rightPage" side="right" collapse swipeable width="200px" style="border-left: 1px solid #ccc">
    </ons-splitter-side>
  </ons-splitter>
  `
})
export class AppComponent {
  leftPage = LeftPageComponent;
  rightPage = RightPageComponent;
  contentPage = ContentPageComponent;
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, LeftPageComponent, RightPageComponent, ContentPageComponent],
  bootstrap: [AppComponent],
  entryComponents: [LeftPageComponent, RightPageComponent, ContentPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
