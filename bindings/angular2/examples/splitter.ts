import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-splitter>
    <ons-splitter-side side="left" width="200px" style="border-right: 1px solid #ccc">
      <ons-page>
        <ons-toolbar>
          <div class="center">Left Page</div> 
        </ons-toolbar>
        <div class="page__background"></div>
        <div class="page__content">
          Left
  
        </div>
      </ons-page>
    </ons-splitter-side>

    <ons-splitter-content>
      <ons-page>
        <ons-toolbar>
          <div class="center">Content Page</div> 
        </ons-toolbar>
        <div class="page__background"></div>
        <div class="page__content">
          contents
  
        </div>
      </ons-page>
    </ons-splitter-content>
  </ons-splitter>
  `
})
export class AppComponent {
}

bootstrap(AppComponent);
