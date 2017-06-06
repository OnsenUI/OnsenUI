import {
  ChangeDetectorRef,
  Component,
  OnsRange,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Range Example</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <!-- (input) is needed for immediate change detection on dragging range component.
        -->
        <ons-range id="range" [(value)]="value" (input)="refreshValue($event)"></ons-range><br>
        <ons-range modifier="material" [(value)]="value"></ons-range><br>
        <span id="value">
          {{ value }}
        </span>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  value: string = '10';
  constructor(private cd: ChangeDetectorRef) { }

  refreshValue($event: any) {
    this.value = $event.target.value;
    this.cd.detectChanges();
  }
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
