import {
  bootstrap,
  ONS_DIRECTIVES,
  Component
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  directives: [ONS_DIRECTIVES],
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Input</div>
    </ons-toolbar>
    <div class="page__background"></div>
    <div class="page__content">
      <div style="padding: 10px">
        <div><ons-input placeholder="Type here" [(value)]="target"></ons-input></div>

        <p>Text: {{target}}</p>
      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent{
  target: string = '';
}

bootstrap(AppComponent);
