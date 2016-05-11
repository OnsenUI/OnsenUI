import {
  bootstrap,
  Component,
  ONS_DIRECTIVES
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Pull Hook</div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">

      <div class="scroll">
        <ons-pull-hook height="64px" threshold-height="128px" (changestate)="onChangeState(pullHook)" [onAction]="onAction" #pullHook>
          {{message}}
        </ons-pull-hook>

        <ons-list>
          <ons-list-item>Item 1</ons-list-item>
          <ons-list-item>Item 2</ons-list-item>
          <ons-list-item>Item 3</ons-list-item>
          <ons-list-item>Item 4</ons-list-item>
          <ons-list-item>Item 5</ons-list-item>
          <ons-list-item>Item 6</ons-list-item>
        </ons-list>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {

  message: string = 'Pull down to refresh';

  constructor() {
  }

  onAction(done: Function) {
    setTimeout(() => { 
      done();
    }, 1000);
  }

  onChangeState(pullHook) {
    switch (pullHook.state) {
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
