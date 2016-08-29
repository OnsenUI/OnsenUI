import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '../src/angular2-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Floating Action Button</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <div style="text-align: center">
        <br>
        <ons-fab (click)="onClick()">
          <ons-icon icon="md-car"></ons-icon>
        </ons-fab>

        <ons-fab disabled>
          <ons-icon icon="md-car"></ons-icon>
        </ons-fab>

        <ons-fab ripple (click)="onClick()">-</ons-fab>

        <ons-fab modifier="mini" (click)="onClick()">
          <ons-icon icon="md-car"></ons-icon>
        </ons-fab>
      </div>

      <ons-fab position="center bottom" (click)="onClick()">
        <ons-icon icon="md-car"></ons-icon>
      </ons-fab>

      <ons-fab position="right bottom" (click)="onClick()">
        <ons-icon icon="md-car"></ons-icon>
      </ons-fab>

      <ons-fab position="left bottom" (click)="onClick()">
        <ons-icon icon="md-car"></ons-icon>
      </ons-fab>
    </div>
  </ons-page>
  `
})
export class AppComponent{

  onClick() {
    alert('Clicked!');
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
