import {
  Component,
  OnsSwitch,
  OnsenModule,
  Directive,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-switch',
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
export class SwitchComponent {
  target: boolean = true;
  switchControl: FormControl;

  constructor() {
    this.switchControl = new FormControl('');
  }
}

@NgModule({
  imports: [OnsenModule, FormsModule, ReactiveFormsModule],
  exports: [SwitchComponent],
  declarations: [SwitchComponent],
  bootstrap: [SwitchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwitchModule { }

