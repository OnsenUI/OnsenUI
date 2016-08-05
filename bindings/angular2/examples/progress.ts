import {
  bootstrap,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page class="page">
    <ons-toolbar>
      <div class="center">Progress</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <ons-progress-bar value="10"></ons-progress-bar>

      <div style="margin: 20px auto; width: 320px;">
        <p>Loading stuff...</p>
        <ons-progress-bar value="20" secondary-value="50"></ons-progress-bar>
      </div>

      <div>
        <ons-progress-bar indeterminate></ons-progress-bar>
      </div>

      <div style="margin: 20px; text-align: center;">
        <ons-progress-circular value="10"></ons-progress-circular>
        <ons-progress-circular value="20" secondary-value="50"></ons-progress-circular>
        <ons-progress-circular indeterminate></ons-progress-circular>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
}

bootstrap(AppComponent);
