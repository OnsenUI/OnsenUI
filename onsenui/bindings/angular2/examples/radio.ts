import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Radio Button</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="padding: 10px">
        <div *ngFor="let fruit of fruits; let i = index">
          <ons-radio
            [attr.input-id]="'radio-' + i"
            [attr.value]="fruit"
            [(ngModel)]="selectedFruit"
          >
          </ons-radio>
          <label [attr.for]="'radio-' + i">
            {{ fruit }}
          </label>
        </div>

        <p id="selected-fruit">
          {{ selectedFruit }}
        </p>

        <div [formGroup]="exampleForm">
          <div *ngFor="let v of vegetables; let i = index">
            <ons-radio
              name="vegetable"
              [attr.input-id]="'vegetable-' + i"
              formControlName="vegetable"
              [attr.value]="v"
            >
            </ons-radio>
            <label [attr.for]="'vegetable-' + i">{{ v }}</label>
          </div>
        </div>

        <p id="selected-vegetable">{{ exampleForm.get('vegetable').value }}</p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  fruits: string[] = ['Apples', 'Bananas', 'Oranges'];
  selectedFruit: string = 'Bananas';
  vegetables: string[] = ['Potato', 'Turnip', 'Broccoli'];
  exampleForm: FormGroup;

  constructor() {
    this.exampleForm = new FormGroup({
      vegetable: new FormControl('')
    });
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
