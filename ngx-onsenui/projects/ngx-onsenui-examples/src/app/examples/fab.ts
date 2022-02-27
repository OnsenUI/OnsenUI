import {
  Component,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-fab',
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
export class FabComponent{

  onClick() {
    alert('Clicked!');
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [FabComponent],
  declarations: [FabComponent],
  bootstrap: [FabComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FabModule { }

