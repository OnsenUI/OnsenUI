import {
  Directive,
  ElementRef,
  Input,
  Output,
  OnDestroy,
  EventEmitter
} from '@angular/core';

/**
 * @element ons-pull-hook
 * @directive OnsPullHook
 * @selector ons-pull-hook
 * @description
 *   [en]Angular 2 directive for `<ons-pull-hook>` component.[/en]
 *   [ja]`<ons-pull-hook>`要素のためのAngular2ディレクティブです。[/ja]
 * @example
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-page>
 *       <ons-toolbar>
 *         <div class="center">Pull Hook</div>
 *       </ons-toolbar>
 *       <div class="content">
 *         <ons-pull-hook height="64px" threshold-height="128px" 
 *           (changestate)="onChangeState($event)" (action)="onAction($event)">
 *           {{message}}
 *         </ons-pull-hook>
 *       </div>
 *     </ons-page>
 *     `
 *   })
 *   export class AppComponent {
 *     message: string = 'Pull down to refresh';
 *
 *     onAction($event) {
 *       setTimeout(() => {
 *         $event.done();
 *       }, 1000);
 *     }
 *
 *     onChangeState($event) {
 *       switch ($event.state) {
 *         case 'initial':
 *           this.message = 'Pull down to refresh';
 *           break;
 *         case 'preaction':
 *           this.message = 'Release to refresh';
 *           break;
 *         case 'action':
 *           this.message = 'Loading data...';
 *           break;
 *       }
 *     }
 *   }
 */
@Directive({
  selector: 'ons-pull-hook'
})
export class OnsPullHook implements OnDestroy {
  private _element: any;

  /**
   * @output action
   * @param {Object} $event
   * @param {Function} $event.done
   * @desc
   *   [en]Action to trigger.[/en]
   *   [ja]`ons-pull-hook`要素のアクションが必要なときに呼び出されます。[/ja]
   */
  @Output('action') action = new EventEmitter();

  /**
   * @output changestate
   * @param {Object} $event
   * @param {String} $event.state
   * @desc
   *   [en][/en]
   *   [ja]`ons-pull-hook`要素の状態が変わった時に呼び出されます。[/ja]
   */
  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
    this._element.onAction = done => this.action.emit({done});
  }

  ngOnDestroy() {
    this._element.onAction = null;
    this._element = null;
  }
}
