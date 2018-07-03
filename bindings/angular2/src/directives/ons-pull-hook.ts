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
 *   [en]Angular directive for `<ons-pull-hook>` component.[/en]
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
 *           (pull)="onPull($event)" (changestate)="onChangeState($event)" (action)="onAction($event)">
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
 * 
 *     onPull($event) {
 *       console.log($event.ratio);
 *     }
 * 
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
   *   [en]Triggers when the page is pulled down.[/en]
   *   [ja]`ons-pull-hook`要素のアクションが必要なときに呼び出されます。[/ja]
   */
  @Output() action = new EventEmitter();

  /**
   * @output changestate
   * @param {Object} $event
   * @param {String} $event.state
   * @desc
   *   [en]Triggers when the state is changed.[/en]
   *   [ja]`ons-pull-hook`要素の状態が変わった時に呼び出されます。[/ja]
   */


  /**
   * @output pull
   * @param {Object} $event
   * @param {Number} $event.ratio
   * @param {Object} $event.options
   * @desc
   *   [en]Triggers whenever the element is pulled.[/en]
   *   [ja]`ons-pull-hook`要素がプルされているときに呼び出されます。[/ja]
   */
  @Output() pull = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
    this._element = _elementRef.nativeElement;
    this._element.onAction = (done: Function) => this.action.emit({done});
    this._element.onPull = (ratio: number, options: any) => this.pull.emit({ratio, options});
  }

  ngOnDestroy() {
    this._element.onAction = null;
    this._element = null;
  }
}
