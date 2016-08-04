import {
  bootstrap,
  Component,
  ONS_DIRECTIVES
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
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
        <ons-list-item *ngFor="let item of items; let i = index">Item {{i}}</ons-list-item>
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

  onAction($event) {
    setTimeout(() => {
      $event.done();
      this.items.push(0);
    }, 1000);
  }

  onChangeState($event) {
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

bootstrap(AppComponent);
