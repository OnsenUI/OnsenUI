import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule} from '@angular/forms';

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
        <div *ngFor="let vegetable of vegetables; let i = index">
          <ons-radio
            [attr.input-id]="'radio-' + i"
            [attr.value]="vegetable"
            [(ngModel)]="selectedVegetable"
          >
          </ons-radio>
          <label [attr.for]="'radio-' + i">
            {{ vegetable }}
          </label>
        </div>
        
        <p id="selected-vegetable">
          {{ selectedVegetable }}
        </p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  vegetables: string[] = ['Apples', 'Bananas', 'Oranges'];
  selectedVegetable: string = 'Bananas';
}

@NgModule({
  imports: [OnsenModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
