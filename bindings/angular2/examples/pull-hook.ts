import {
  Component,
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
      <div class="center">Pull Hook</div>
    </ons-toolbar>

    <div class="content">
      <ons-pull-hook height="64px" threshold-height="128px" (changestate)="onChangeState($event)" (action)="onAction($event)">
        {{message}}
      </ons-pull-hook>

      <ons-list>
        <ons-list-item id="item-{{ i }}" *ngFor="let item of items; let i = index">Item {{i}}</ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class AppComponent {

  message: string = 'Pull down to refresh';

  items: number[] = [1, 2, 3, 4, 5];

  constructor() {
  }

  onAction($event: any) {
    setTimeout(() => {
      this.items.push(0);
      $event.done(); // Run change detector
    }, 1000);
  }

  onChangeState($event: any) {
    switch ($event.state) {
      case 'initial':
        this.message = 'Pull down to refresh';
        break;
      case 'preaction':
        this.message = 'Release to refresh';
        break;
      case 'action':
        this.message = 'Loading data...';
        break;
    }
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
