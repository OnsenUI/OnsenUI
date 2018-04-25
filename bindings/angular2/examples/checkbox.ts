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
      <div class="center">Checkbox</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <ons-list>
        <ons-list-header>Template-driven form</ons-list-header>
        <ons-list-item *ngFor="let color of colors; let i = index">
          <ons-checkbox
            [attr.input-id]="'radio-' + i"
            [attr.value]="color"
            [(ngModel)]="checkedColors"
            class="left"
          >
          </ons-checkbox>
          <label [attr.for]="'radio-' + i" class="center">
            {{ color }}
          </label>
        </ons-list-item>

        <ons-list-item id="checked-colors">
          {{ checkedColors }}
        </ons-list-item>

        <ons-list-header>Reactive Form</ons-list-header>
        <ons-list-item>
          <ons-checkbox id="reactive-checkbox" class="form-control left" [formControl]="exampleControl"></ons-checkbox>
          <div class="center" id="reactive-checked">{{ exampleControl.value ? 'Checked' : 'Not checked' }}</div>
        </ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  colors: string[] = ['Red', 'Green', 'Blue'];
  checkedColors: string[] = ['Green', 'Blue'];
  exampleControl: FormControl = new FormControl('');
}

@NgModule({
  imports: [OnsenModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
