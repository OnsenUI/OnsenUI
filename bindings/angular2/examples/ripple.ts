import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Ripple Effect</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">

      <ons-list>
        <ons-list-item ripple>In list item</ons-list-item>
      </ons-list>

      <div style="margin: 10px auto; width: 100px; height: 100px; background-color: gray; border: 1px solid #ccc;">
        <ons-ripple></ons-ripple>
        Click me!
      </div>

    </div>
  </ons-page>
  `
})
export class AppComponent{
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
