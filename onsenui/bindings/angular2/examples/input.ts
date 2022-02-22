import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule} from '@angular/forms';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Input</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <ons-list>
        <ons-list-header>Template-driven form</ons-list-header>
        <ons-list-item>
          <ons-input id="text" placeholder="Type here" [(value)]="target"></ons-input>
        </ons-list-item>
        <ons-list-item>
          <input id="native-text" placeholder="Type here" [(ngModel)]="target">
        </ons-list-item>

        <ons-list-item id="target">
          {{target}}
        </ons-list-item>

        <!-- type="password" works just same as type="text". No test is needed. -->
      </ons-list>

      <ons-list>
        <ons-list-header>Reactive Form</ons-list-header>
        <form [formGroup]="exampleForm" style="margin: 0">
          <ons-list-item>
          <ons-input id="reactive-name" placeholder="Enter your name" formControlName="name"></ons-input>
          </ons-list-item>

          <ons-list-item>
          <ons-input id="reactive-job" placeholder="Enter your job" formControlName="job"></ons-input>
          </ons-list-item>
        </form>
        <ons-list-item>Form value: <span id="form-value">{{exampleForm.value | json}}</span></ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  exampleForm: FormGroup;
  target: string = '';

  constructor() {
    this.exampleForm = new FormGroup({
      name: new FormControl(''),
      job: new FormControl('')
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
