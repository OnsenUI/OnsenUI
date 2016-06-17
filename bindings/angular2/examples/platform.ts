import {
  bootstrap,
  Component,
  onsPlatform
} from '../src/angular2-onsenui';


@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">onsPlatform Example</div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">
      <div style="margin: 10px;">

        <ul>
          <li>
            isIOS() => {{platform.isIOS()}}
          </li>
          <li>
            isAndroid() => {{platform.isAndroid()}}
          </li>
          <li>
            isChrome() => {{platform.isChrome()}}
          </li>
          <li>
            getMobileOS() => {{platform.getMobileOS()}}
          </li>
        </ul>

      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  public platform: onsPlatform;
  constructor() { 
    this.platform = onsPlatform;
  }
}

bootstrap(AppComponent);
