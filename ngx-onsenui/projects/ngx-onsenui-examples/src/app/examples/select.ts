import {
  Component,
  OnsSelect,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
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

        <ons-select id="animal-select" [formControl]="animalForm">
          <option *ngFor="let animal of animals; let i = index" [id]="'animal-' + i" [value]="animal">
            {{ animal }}
          </option>
        </ons-select>
        <p><strong><span id="selected-animal">{{ animalForm.value }}</span></strong> is selected.</p>
      </div>
    </div>
  </ons-page>
  `
})
export class SelectComponent {
  selectedModifier: string = 'basic';
  modifiers = [
    {value: 'basic', label: 'Basic'},
    {value: 'material', label: 'Material'},
    {value: 'underbar', label: 'Underbar'}
  ];
  animals: string[] = ['Lion', 'Leopard', 'Rhinoceros', 'Elephant', 'Cape buffalo'];
  animalForm: FormControl;

  constructor() {
    this.animalForm = new FormControl('Lion');
  }
}

@NgModule({
  imports: [OnsenModule, FormsModule, ReactiveFormsModule],
  exports: [SelectComponent],
  declarations: [SelectComponent],
  bootstrap: [SelectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectModule { }

