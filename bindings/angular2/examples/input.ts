import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Input</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="padding: 10px">
        <p>
          <ons-input id="text" placeholder="Type here" [(value)]="target"></ons-input>
          <input id="native-text" placeholder="Type here" [(ngModel)]="target">
        </p>

        <p id="target">
          {{target}}
        </p>

        <!-- type="password" works just same as type="text". No test is needed. -->
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  target: string = '';
}

@NgModule({
  imports: [OnsenModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
