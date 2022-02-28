import {
  Component,
  OnsRange,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-range',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Range Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-range id="range" [(value)]="value"></ons-range><br>
        <ons-range modifier="material" [(value)]="value"></ons-range><br>
        <span id="value">
          {{ value }}
        </span>

        <p><strong>Reactive</strong></p>
        <ons-range id="reactive-range" [formControl]="rangeForm"></ons-range><br />
        <p id="reactive-value">{{ rangeForm.value }}</p>
      </div>
    </div>
  </ons-page>
  `
})
export class RangeComponent {
  value: string = '10';
  rangeForm: FormControl;
  reactiveStartValue: 89;

  constructor() {
    this.rangeForm = new FormControl('');
  }
}

@NgModule({
  imports: [OnsenModule, FormsModule, ReactiveFormsModule],
  exports: [RangeComponent],
  declarations: [RangeComponent],
  bootstrap: [RangeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RangeModule { }

