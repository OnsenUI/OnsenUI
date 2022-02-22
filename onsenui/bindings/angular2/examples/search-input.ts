import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Search Input</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="padding: 10px">
        <p><strong>Template</strong></p>
        <p>
          <ons-search-input id="text" placeholder="Type here" [(value)]="target"></ons-search-input>
        </p>
        <p id="target">
          {{target}}
        </p>

        <p><strong>Reactive</strong></p>
        <p>
          <ons-search-input id="reactive-search" placeholder="Type here" [formControl]="searchControl"></ons-search-input>
        </p>
        <p id="reactive-query">{{ searchControl.value }}</p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  target: string = '';
  searchControl: FormControl;

  constructor() {
    this.searchControl = new FormControl('');
  }
}

@NgModule({
  imports: [OnsenModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
