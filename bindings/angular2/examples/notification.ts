import {
  bootstrap,
  Component,
  onsNotification
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">OnsNotification Example</div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">
      <div style="margin: 10px; text-align: center;">

        <ons-button (click)="alert()" id="alert-button">alert()</ons-button>
        <ons-button (click)="confirm()" id="confirm-button">confirm()</ons-button>
        <ons-button (click)="prompt()" id="prompt-button">prompt()</ons-button>

      </div>
    </div>
  </ons-page>
  `
})
export class AppComponent {
  constructor() { }

  alert() {
    onsNotification.alert({message: 'Hello, world!'});
  }

  confirm() {
    onsNotification.confirm({
      message: 'This dialog can be canceled by tapping the background or using the back button on your device.',
      cancelable: true,
      callback: i => {
        if (i == -1) {
          ons.notification.alert({message: 'You canceled it!'});
        }
      }
    });
  }

  prompt() {
    onsNotification.prompt({
      message: 'What is the meaning of Life, the Universe and Everything?',
      callback: answer => {
        if (answer === '42') {
          ons.notification.alert({message: 'That\'s the correct answer!'});
        } else {
          ons.notification.alert({message: 'Incorrect! Please try again!'});
        }
      }
    });
  }
}

bootstrap(AppComponent);
