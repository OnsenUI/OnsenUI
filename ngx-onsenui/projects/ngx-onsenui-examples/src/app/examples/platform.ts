import {
  Component,
  onsPlatform,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';


@Component({
  selector: 'app-platform',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">onsPlatform Example</div>
    </ons-toolbar>

    <div class="background"></div>
    <div class="content">
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
export class PlatformComponent {
  public platform = onsPlatform;
  constructor() { 
  }
}

@NgModule({
  imports: [OnsenModule],
  exports: [PlatformComponent],
  declarations: [PlatformComponent],
  bootstrap: [PlatformComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformModule { }

