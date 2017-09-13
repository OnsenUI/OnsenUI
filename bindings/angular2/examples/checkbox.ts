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
      <div class="center">Checkbox</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="padding: 10px">
        <div *ngFor="let color of colors; let i = index">
          <ons-checkbox
            [attr.input-id]="'radio-' + i"
            [attr.value]="color"
            [(ngModel)]="checkedColors"
          >
          </ons-checkbox>
          <label [attr.for]="'radio-' + i">
            {{ color }}
          </label>
        </div>
        
        <p id="checked-colors">
          {{ checkedColors }}
        </p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  colors: string[] = ['Red', 'Green', 'Blue'];
  checkedColors: string[] = ['Green', 'Blue'];
}

@NgModule({
  imports: [OnsenModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
