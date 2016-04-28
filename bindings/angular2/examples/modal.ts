import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-modal #modal>
    ...
  </ons-modal>
  <ons-page>
    <ons-toolbar>
      <div class="center">Modal</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">

      <div style="text-align: center; margin: 10px;">
        <ons-button modifier="light" (click)="modal.show()">Open Modal</ons-button>
      </div>

    </div>
  </ons-page>
  `
})
export class AppComponent {
}

bootstrap(AppComponent);
