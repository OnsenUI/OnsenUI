import {
  Component,
  OnsSelect,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Select</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="margin: 10px">
        <p>Choose which select input you want to see:<p>
        <ons-select [(ngModel)]="selectedModifier" [attr.modifier]="selectedModifier">
          <option *ngFor="let modifier of modifiers" [value]="modifier.value">
            {{ modifier.label }}
          </option>
        </ons-select>
        <p>Modifier <strong>{{ selectedModifier }}</strong> looks great.</p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  selectedModifier: string = 'basic';
  modifiers = [
    {value: 'basic', label: 'Basic'},
    {value: 'material', label: 'Material'},
    {value: 'underbar', label: 'Underbar'}
  ];

  constructor() { }
}

@NgModule({
  imports: [OnsenModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
