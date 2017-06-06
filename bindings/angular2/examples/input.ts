import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

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
          <ons-input id="text" placeholder="Type here" [(value)]="target" (input)="target = $event.target.value"></ons-input>
          <input id="native-text" placeholder="Type here" [(value)]="target" (input)="target = $event.target.value">
        </p>

        <p id="target">
          {{target}}
        </p>

        <p>
          <ons-checkbox
            id="checkbox"
            [(checked)]="checked"
            (change)="checked = $event.target.checked"
          ></ons-checkbox>
          <input
            id="native-checkbox"
            type="checkbox"
            [(checked)]="checked"
            (change)="checked = $event.target.checked"
          >
        </p>

        <p id="checked">
          {{ checked }}
        </p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  target: string = '';
  checked: boolean = false;
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
