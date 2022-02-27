import {
  Component,
  OnsSwitch,
  OnsenModule,
  Directive,
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
      <div class="center">Switch Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px;">
        <p><strong>Template</strong></p>
        <label><input id="checkbox" type="checkbox" [(ngModel)]="target"> {{target ? 'On' : 'Off'}}</label>
        <br>
        <br>
        <ons-switch [(value)]="target"></ons-switch>

        <p><strong>Reactive</strong></p>
        <ons-switch id="reactive-switch" [formControl]="switchControl"></ons-switch>
        <p id="reactive-value">{{ switchControl.value ? 'On' : 'Off' }}</p>
      </div>
    </div>
  </ons-page>
    `
})
export class AppComponent {
  target: boolean = true;
  switchControl: FormControl;

  constructor() {
    this.switchControl = new FormControl('');
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
