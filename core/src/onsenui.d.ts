// Type definitions for Onsen UI 2
// Project: https://onsen.io/
// Definitions by: Fran Dios <https://github.com/frankdiox/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// module declaration
declare module 'onsenui' { 
  export = ons;
}

interface onsOptions {
  parentScope?: Object;
}

interface alertOptions {
  message?: string;
  messageHTML?: string;
  buttonLabel?: string;
  buttonLabels?: [string];
  primaryButtonIndex?: number;
  cancelable?: boolean;
  animation?: string;
  title?: string;
  modifier?: string;
  callback?: any;
  id?: string;
}

interface onsPlatform {
  /**
   * @param  {string} platform Name of the platform. Possible values are: "opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios" or "wp".
   * @description Sets the platform used to render the elements. Useful for testing.
   */
  select(platform: string): void;
  /**
   * @description Returns whether app is running in Cordova
   * @return {Boolean}
   */
  isWebView(): boolean;

  /**
   * @description Returns whether the OS is iOS
   * @return {Boolean}
   */
  isIOS(): boolean;

  /**
   * @description Returns whether the OS is Android
   * @return {Boolean}
   */
  isAndroid(): boolean;

  /**
   * @description Returns whether the device is iPhone
   * @return {Boolean}
   */
  isIPhone(): boolean;

  /**
   * @description Returns whether the device is iPad
   * @return {Boolean}
   */
  isIPad(): boolean;

  /**
   * @description Returns whether the device is BlackBerry
   * @return {Boolean}
   */
  isBlackBerry(): boolean;

  /**
   * @description Returns whether the browser is Opera
   * @return {Boolean}
   */
  isOpera(): boolean;

  /**
   * @description Returns whether the browser is Firefox
   * @return {Boolean}
   */
  isFirefox(): boolean;

  /**
   * @description Returns whether the browser is Safari
   * @return {Boolean}
   */
  isSafari(): boolean;

  /**
   * @description Returns whether the browser is Chrome
   * @return {Boolean}
   */
  isChrome(): boolean;

  /**
   * @description Returns whether the browser is Internet Explorer
   * @return {Boolean}
   */
  isIE(): boolean;

  /**
   * @description Returns whether the iOS version is 7 or above
   * @return {Boolean}
   */
  isIOS7above(): boolean;
  /**
   *
   */
  isEdge(): boolean;
}

interface onsOrientation {
  /**
   * @description Add an event listener.
   */
  on(eventName: string, listener: Function): void;
  /**
   * @description Add an event listener that's only triggered once.
   */
  once(eventName: string, listener: Function): void;
  /**
   * @description Remove an event listener. If the listener is not specified all listeners for the event type will be removed.
   */
  off(eventName: string, listener?: Function): void;
  /**
   * @return {Boolean} Will be true if the current orientation is portrait mode
   * @description Returns whether the current screen orientation is portrait or not
   */
  isPortrait(): boolean;
  /**
   * @return {Boolean} Will be true if the current orientation is landscape mode
   * @description Returns whether the current screen orientation is landscape or not
   */
  isLandscape(): boolean;
}

interface onsNotification {
  /**
   * @param {Object} options Parameter object
   * @param {String} [options.message] Alert message
   * @param {String} [options.messageHTML] Alert message in HTML
   * @param {String} [options.buttonLabel] Label for confirmation button. Default is "OK"
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {String} [options.title] Dialog title. Default is "Alert"
   * @param {String} [options.modifier] Modifier for the dialog
   * @param {String} [options.id] The `<ons-alert-dialog>` element's ID.
   * @param {Function} [options.callback] Function that executes after dialog has been closed
   * @description
   *   Display an alert dialog to show the user a message
   *   The content of the message can be either simple text or HTML
   *   Must specify either message or messageHTML
   */
  alert(message: string | alertOptions, options?: alertOptions): Promise<HTMLElement>;
  /**
   * @param {Object} options Parameter object
   * @param {String} [options.message] Confirmation question
   * @param {String} [options.messageHTML] Dialog content in HTML
   * @param {Array} [options.buttonLabels] Labels for the buttons. Default is ["Cancel", "OK"]
   * @param {Number} [options.primaryButtonIndex] Index of primary button. Default is 1
   * @param {Boolean} [options.cancelable] Whether the dialog is cancelable or not. Default is false
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {String} [options.title] Dialog title. Default is "Confirm"
   * @param {String} [options.modifier] Modifier for the dialog
   * @param {String} [options.id] The `<ons-alert-dialog>` element's ID.
   * @param {Function} [options.callback]
   *   Function that executes after the dialog has been closed
   *   Argument for the function is the index of the button that was pressed or -1 if the dialog was canceled
   * @description
   *   Display a dialog to ask the user for confirmation
   *   The default button labels are "Cancel" and "OK" but they can be customized
   *   Must specify either message or messageHTML
   */
  confirm(message: string | alertOptions, options?: alertOptions): Promise<HTMLElement>;
  /**
   * @param {Object} options Parameter object
   * @param {String} [options.message] Prompt question
   * @param {String} [options.messageHTML] Dialog content in HTML
   * @param {String} [options.buttonLabel] Label for confirmation button. Default is "OK"
   * @param {Number} [options.primaryButtonIndex] Index of primary button. Default is 1
   * @param {Boolean} [options.cancelable] Whether the dialog is cancelable or not. Default is false
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {String} [options.title] Dialog title. Default is "Alert"
   * @param {String} [options.modifier] Modifier for the dialog
   * @param {String} [options.id] The `<ons-alert-dialog>` element's ID.
   * @param {Function} [options.callback]
   *   Function that executes after the dialog has been closed
   *   Argument for the function is the value of the input field or null if the dialog was canceled
   * @description
   *   Display a dialog with a prompt to ask the user a question
   *   Must specify either message or messageHTML
   */
  prompt(message: string | alertOptions, options?: alertOptions): Promise<HTMLElement>;
}


/**
 * @description A global object that's used in Onsen UI. This object can be reached from the AngularJS scope
 */
declare namespace ons {

  /**
   * @return {Boolean} Will be true if Onsen UI is initialized
   * @description Returns true if Onsen UI is initialized
   */
  function isReady(): boolean;
  /**
   * @return {Boolean} Will be true if the app is running in Cordova
   * @description Returns true if running inside Cordova
   */
  function isWebView(): boolean;
  /**
   * @description Method used to wait for app initialization. The callback will not be executed until Onsen UI has been completely initialized
   * @param {Function} callback Function that executes after Onsen UI has been initialized
   */
  function ready(callback: any): void;
  /**
   * @param {Function} listener Function that executes when device back button is pressed
   * @description Set default handler for device back button
   */
  function setDefaultDeviceBackButtonListener(listener: (eventObject: any) => any): void;
  /**
   * @description Disable device back button event handler
   */
  function disableDeviceBackButtonHandler(): void;
  /**
   * @description Enable device back button event handler
   */
  function enableDeviceBackButtonHandler(): void;
  /**
   * @description Enable status bar fill feature on iOS7 and above
   */
  function enableAutoStatusBarFill(): void;
  /**
   * @description Disable status bar fill feature on iOS7 and above
   */
  function disableAutoStatusBarFill(): void;
  /**
   * @description Disable all animations. Could be handy for testing and older devices.
   */
  function disableAnimations(): void;
  /**
   * @description Enable animations (default).
   */
  function enableAnimations(): void;
  /**
   * @description Refresh styling for the given platform.
   */
  function forcePlatformStyling(platform: string): void;
  /**
   * @description Create a popover instance from a template.
   * @return Promise object that resolves to the popover component object.
   */
  function createPopover(page: string, options?: onsOptions): Promise<HTMLElement>;
  /**
   * @description Create a dialog instance from a template.
   * @return Promise object that resolves to the dialog component object.
   */
  function createDialog(page: string, options?: onsOptions): Promise<HTMLElement>;
  /**
   * @description Create a alert dialog instance from a template.
   * @return Promise object that resolves to the alert dialog component object.
   */
  function createAlertDialog(page: string, options?: onsOptions): Promise<HTMLElement>;
  /**
   * @description If no page is defined for the `ons-loading-placeholder` attribute it will wait for this method being called before loading the page.
   */
  function resolveLoadingPlaceholder(page: string): void;
  /**
   * @description Utility methods to create different kinds of alert dialogs. There are three methods available: alert, confirm and prompt
   */
  var notification: onsNotification;
  /**
   * @description Utility methods for orientation detection
   */
  var orientation: onsOrientation;
  /**
   * @description Utility methods to detect current platform
   */
  var platform: onsPlatform;

  /**
   * @description Default page loader that load page template
   */
  var defaultPageLoader: PageLoader;

  /**
   * @description PageLoader class constructor
   */
  class PageLoader {
    internalLoader: Function;
    load(options: {page: any, parent: Element, params?: Object}, done: Function);
  }
}

/**
 * @description Should be used as root component of each page. The content inside page component is scrollable
 */
interface OnsPageElement {
  /**
   * @description Function to be executed when scrolling to the bottom of the page. The function receives a done callback as an argument that must be called when it's finished.
   */
  onInfiniteScroll: Function;
  /**
   * @description Back-button handler.
   */
  backButtonHandler: any;
  /**
   * @description User's custom data passed to `pushPage()`-like methods.
   */
  data: any;
}

interface CarouselOptions{
  callback?: Function;
  animation?: String;
  animationOptions?: Object;
}
/**
 * @description Carousel component
 */
interface OnsCarouselElement {
  /**
  * @description Specify the index of the `<ons-carousel-item>` to show.
  * @return Resolves to the carousel element.
  */
  setActiveIndex(index: number, options?: CarouselOptions): Promise<HTMLElement>;
  /**
  * @description Returns the index of the currently visible `<ons-carousel-item>`.
  * @return The current carousel item index.
  */
  getActiveIndex(): void;
   /**
   * @description Show next ons-carousel item
   * @return Resolves to the carousel element
   */
  next(options?: CarouselOptions): Promise<HTMLElement>;
   /**
   * @description Show previous ons-carousel item
   * @return Resolves to the carousel element
   */
  prev(options?: CarouselOptions): Promise<HTMLElement>;
   /**
   * @description Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.
   */
  refresh(): void;
   /**
   * @description Show first ons-carousel item
   * @Resolves to the carousel element
   */
  first(): Promise<HTMLElement>;
  /**
   * @description Show last ons-carousel item
   * @return Resolves to the carousel element
   */
  last(): Promise<HTMLElement>;
  /**
   * @description The number of carousel items.
   **/
  itemCount: number;
  /**
   * @description The current auto scroll ratio.
   **/
  autoScrollRatio: number;
  /**
   * @description true if the carousel is swipeable.
   **/
  swipeable: boolean;
  /**
   * @description true if auto scroll is enabled.
   **/
  autoScroll: boolean;
  /**
   * @description Whether the carousel is disabled or not.
   **/
  disabled: boolean;
  /**
   * @description Whether the carousel is overscrollable or not.
   **/
  overscrollable: boolean;
  /**
   * @description Whether the carousel is centered or not.
   **/
  centered: boolean;
}

/**
 * @description Component that adds "pull-to-refresh" to an <ons-page> element
 */
 //later should be updated
interface OnsPullHookElement {
  /**
  * @description The height of the pull hook in pixels. The default value is `64px`.
  */
  height: string;
  /**
   * @param {Number} thresholdHeight Desired threshold height
   * @description The thresholdHeight of the pull hook in pixels. The default value is `96px`.
   */
  thresholdHeight: string;
  /**
  * @description The current number of pixels the pull hook has moved.
  */
  state: string;
  /**
  * @description The current number of pixels the pull hook has moved.
  */
  pullDistance: number;
  /**
   * @description A boolean value that specifies whether the element is disabled or not.
   */
  disabled: boolean;
  /**
   * @description Define the function that will be called in the `"action"` state.
   */
  onAction?: Function;
}



interface dialogOptions {
  animation?: string;
  callback?: Function;
}


/**
 * @modifier android Display an Android style alert dialog
 * @description Alert dialog that is displayed on top of the current screen
 */
interface OnsAlertDialogElement {
  /**
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "fade", "slide" and "none"
   * @param {Function} [options.callback] Function to execute after the dialog has been revealed
   * @description Show the alert dialog
   */
  show(options?: dialogOptions): Promise<HTMLElement>;
  /**
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "fade", "slide" and "none"
   * @param {Function} [options.callback] Function to execute after the dialog has been hidden
   * @description Hide the alert dialog
   */
  hide(options?: dialogOptions): Promise<HTMLElement>;
   /**
    * @description A boolean value that specifies whether the dialog is disabled or not.
    */
  disabled: boolean;
   /**
    * @description A boolean value that specifies whether the dialog is cancelable or not. When the dialog is cancelable it can be closed by tapping the background or by pressing the back button on Android devices.
    */
  cancelable: boolean;
}

/**
 * @description Dialog that is displayed on top of current screen
 */
interface OnsDialogElement {
  /**
   * @return {Object} Device back button handler
   * @description Retrieve the back button handler for overriding the default behavior
   */
  onDeviceBackButton(): any;
  /**
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {Function} [options.callback] This function is called after the dialog has been revealed
   * @description Show the dialog
   */
  show(options?: dialogOptions): Promise<HTMLElement>;
  /**
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {Function} [options.callback] This functions is called after the dialog has been hidden
   * @description Hide the dialog
   */
  hide(options?: dialogOptions): Promise<HTMLElement>;
  /**
   * @description Destroy the dialog and remove it from the DOM tree
   */
  destroy(): void;
   /**
    * @description A boolean value that specifies whether the dialog is disabled or not.
    */
  disabled: boolean;
   /**
    * @description A boolean value that specifies whether the dialog is cancelable or not. When the dialog is cancelable it can be closed by tapping the background or by pressing the back button on Android devices.
    */
  cancelable: boolean;
}

/**
 * @description Switch component
 */
interface OnsSwitchElement {
  /**
   * @description If true the switch will be set to on.
   */
  checked: boolean;
  /**
   * @description Whether the element is disabled or not.
   */
  disabled: boolean;
  /**
   * @description The underlying checkbox element.
   */
  checkbox: HTMLElement;
}


interface ModalOptions {
   /**
    * @description Animation name. Available animations are `"none"` and `"fade"`.
    */
  animation?: string;
   /**
    * @description Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
    */
  animationOptions?: string;
}

/**
 * @description
 *   Modal component that masks current screen
 *   Underlying components are not subject to any events while the modal component is shown
 */
interface OnsModalElement{
  /**
   * @return Device back button handler
   * @param {String} [options.animation] Animation name. Available animations are `"none"` and `"fade"`.
   * @param {String} [options.animationOptions] Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
   * @description Toggle modal visibility
   */
  toggle(options?: ModalOptions): Promise<HTMLElement>;
  /**
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are `"none"` and `"fade"`.
   * @param {String} [options.animationOptions] Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
   * @description Show modal
   */
  show(options?: ModalOptions): Promise<HTMLElement>;
  /**
   * @return Resolves to the hidden element
   * @param {String} [options.animation] Animation name. Available animations are `"none"` and `"fade"`.
   * @param {String} [options.animationOptions] Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
   * @description Hide modal
   */
  hide(options?: ModalOptions): Promise<HTMLElement>;
   /**
    * @description Back-button handler.
    */
  onDeviceBackButton: any;
   /**
    * @description Whether the dialog is visible or not.
    */
  visible: boolean;
}

interface navigatorOptions {
   /**
   * @description Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`. These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   */
  animation?: string;
   /**
   * @description Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
   */
  animationOptions?: string;
   /**
   * @description If this parameter is `true`, the previous page will be refreshed (destroyed and created again) before `popPage()` action.
   */
  refresh?: boolean;
  /**
   * @description Function that is called when the transition has ended.
   */
  callback?: Function;
}

interface PushPageOptions {
  page?: any;
  options?: {
    page: any,
    pageHTML: any,
    animation: any,
    animationOptions: any,
    callback: any,
    data: any
  }
}

interface ReplacePageOptions {
  page?: any;
  options?: {
    animation: any,
    animationOptions: any,
    callback: any,
    data: any
  }
}

/**
 * @description A component that provides page stack management and navigation. This component does not have a visible content
 */
interface OnsNavigatorElement {
  /**
   * @param {Object} [options] Parameter object
   * @param {Function} [options.onTransitionEnd] Function that is called when the transition has ended
   * @description Pops the current page from the page stack. The previous page will be displayed
   */
  popPage(options?: navigatorOptions): Promise<HTMLElement>;
  /**
   * @param {*} page Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none"
   * @param {Function} [options.onTransitionEnd] Function that is called when the transition has ended
   * @return Promise which resolves to the pushed page.
   * @description Pushes the specified pageUrl into the page stack.
   */
  pushPage(page: any, options?: PushPageOptions): Promise<HTMLElement>;
  /**
   * @return Promise which resolves to the inserted page
   * @description Replaces the current page with the specified one. Extends pushPage parameters.
   */
  replacePage(page: any, options?: ReplacePageOptions): Promise<HTMLElement>;
  /**
   * @param {Number} index The index where it should be inserted
   * @param {*} page Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none"
   * @description Insert the specified page into the page stack with specified index
   */
  insertPage(index: number, page: any, options?: navigatorOptions): Promise<HTMLElement>;
  /**
   * @param {*} page Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none"
   * @param {Function} [options.onTransitionEnd] Function that is called when the transition has ended
   * @description Clears page stack and adds the specified pageUrl to the page stack
   */
  resetToPage(page: any, options?: navigatorOptions): Promise<HTMLElement>;
  /**
   * @param {any} item
   * @param {Object} [options]
   * @description Page URL or index of an existing page in navigator's stack.
   */
  bringPageTop(item: any, options?: Object): Promise<HTMLElement>;

  /**
   * @return {HTMLElement}
   * @description Current top page element. Use this method to access options passed by `pushPage()`-like methods.
   */
  topPage: HTMLElement; //attribute length in future?
  /**
   * @description Navigator's page stack.
   */
  pages: any;
  /**
   * @description Default options object. Attributes have priority over this property.
   */
  options: navigatorOptions;

}

interface tabbarOptions {
  /**
   * @description If true the page will not be changed.
   */
  keepPage?: boolean;
  /**
   * @description Animation name. Available animations are `"fade"`, `"slide"` and `"none"`.
   */
  animation?: string;
  /**
   * @description Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
   */
  animationOptions?: string;
  /**
   *
   */
  callback?: Function;
}

/**
 * @description A component to display a tab bar on the bottom of a page. Used with ons-tab to manage pages using tabs
 */
interface OnsTabbarElement {
  /**
   * @param {*} url Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>
   * @return Resolves to the new page element.
   * @description Displays a new page without changing the active index
   */
  loadPage(page: any, options?: tabbarOptions): Promise<HTMLElement>;
  /**
   * @param {Number} index Tab index
   * @param {Object} [options] Parameter object
   * @param {Boolean} [options.keepPage] If true the page will not be changed
   * @param {String} [options.animation] Animation name. Available animations are `"fade"`, `"slide"` and `"none"`.
   * @return Resolves to the new page element.
   * @description Show specified tab page. Animations and other options can be specified by the second parameter
   */
  setActiveTab(index: number, options?: tabbarOptions): Promise<HTMLElement>;
  /**
   * @description Used to hide or show the tab bar.
   */
  setTabbarVisibility(visible: boolean): void;
  /**
   * @return {Number} The index of the currently active tab
   * @description Returns tab index on current active tab. If active tab is not found, returns -1
   */
  getActiveTabIndex(): number;
}

interface popoverOptions {
  animation?: string;
}

/**
 * @modifier android Display an Android style popover
 * @description A component that displays a popover next to an element
 */
interface OnsPopoverElement {
  /**
   * @param {String|Event|HTMLElement} target Target element. Can be either a CSS selector, an event object or a DOM element
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "fade" and "none"
   * @return Resolves to the displayed element
   * @description Open the popover and point it at a target. The target can be either an event, a css selector or a DOM element
   */
  show(target: any, options?: popoverOptions): Promise<HTMLElement>;
  /**
   * @param {Object} [options] Parameter object
   * @param {String} [options.animation] Animation name. Available animations are "fade" and "none"
   * @return Resolves to the hidden element
   * @description Close the popover
   */
  hide(options?: popoverOptions): Promise<HTMLElement>;
  /**
   * @description Whether the dialog is visible or not.
   */
  visible: boolean;
  /**
   * @description A boolean value that specifies whether the popover is cancelable or not. When the popover is cancelable it can be closed by tapping the background or by pressing the back button on Android devices.
   */
  cancelable: boolean;
  /**
   * @description Retrieve the back- button handler.
   */
  onDeviceBackButton: any;
}

interface SplitterSideOptions {
  /**
   * @description This function will be called after the menu has been opened.
   * @return {Function}
   */
  callback?: Function;
}

interface OnsSplitterSideElement {
  /**
   * @description Page element loaded in the splitter side.
   */
  page: string;
  /**
   * @description Current mode. Possible values are "split", "collapse", "closed", "open" or "changing".
   */
  mode: string;
  /**
   * @description Returns whether the popover is visible or not.
   * @return {Boolean} This value is `true` when the menu is open.
   */
  isOpen: boolean;
  /**
   * @description Open menu in collapse mode.
   * @return Resolves to the splitter side element or false if not in collapse mode
   */
  open(options?: SplitterSideOptions): Promise<HTMLElement | boolean>;
  /**
   * @description Close menu in collapse mode.
   * @param {Object} [option]
   * @return Resolves to the splitter side element or false if not in collapse mode
   */
  close(options?: SplitterSideOptions): Promise<HTMLElement | boolean>;
  /**
   * @description Opens if it's closed. Closes if it's open.
   * @param {Object} [options]
   * @return Resolves to the splitter side element or false if not in collapse mode
   */
  toggle(options?: SplitterSideOptions): Promise<HTMLElement | boolean>;
  /**
   * @description Show the page specified in pageUrl in the right section
   * @param {*} page Page URL. Can be either an HTML document or an <ons-template>.
   * @param {Object} [option]
   * @return Resolves to the new page element
   */
  load(page: any, options?: SplitterSideOptions): Promise<HTMLElement>;
}

interface LazyRepeatOptions {
  /**
   * @description This function should return a `HTMLElement`. To help rendering the element, the current index and a template is supplied as arguments. The template is the initial content of the `<ons-lazy-repeat>` element.
   */
  createItemContent?: HTMLElement;
  /**
   * @description Should return the number of items in the list.
   */
  countItems?: number;
  /**
   * @description Should return the height of an item. The index is provided as an argument. This is important when rendering lists where the items have different height. The function is optional and if it isn't present the height of the first item will be automatically calculated and used for all other items.
   */
  calculateItemHeight?: number;
  /**
   * @description This function is used called when an item is removed from the DOM. The index and DOM element is provided as arguments. The function is optional but may be important in order to avoid memory leaks.
   */
  destroyItem?: string;
  /**
   * @description Function which recieves an index and the scope for the item. Can be used to configure values in the item scope.
   */
  configureItemScope?: number;
}

interface OnsLazyRepeatElement {
  /**
   * @description Refresh the list. Use this method when the data has changed.
   */
  refresh(): void;
  /**
   * @Specify a delegate object to load and unload item elements.
   */
  delegate: LazyRepeatOptions;
}


interface OnsButtonElement {
  /**
   * @description A boolean value that specifies if the button is disabled or not.
   */
  disabled: boolean;
}

interface OnsFabElement {
  /**
   * @description Show the floating action button.
   */
  show(): void;
  /**
   * @description Hide the floating action button.
   */
  hide(): void;
  /**
   * @description Toggle the visibility of the button.
   */
  toggle(): void;
  /**
   * @description A boolean value that specifies if the button is disabled or not.
   */
  disabled: boolean;
  /**
   * @description Weher the dialog is visible or not.
   */
  visible: boolean;
}

interface OnsInputElement {
  /**
   * @description The current value of the input.
   */
  value: string;
  /**
   * @description This boolean specifies whether the input is checked or not. Only works for `radio` and `checkbox` type inputs.
   */
  checked: boolean;
  /**
   * @description A boolean value that specifies whether the input is disabled or not.
   */
  disabled: boolean;
}

interface OnsRangeElement {
  /**
   * @description A boolean value that specifies whether the input is disabled or not.
   */
  disabled: boolean;
  /**
   * @description The current value of the input.
   */
  value: string;
}

interface OnsRippleElement {
  /**
   * @description A boolean value that specifies whether the input is disabled or not.
   */
  disabled: boolean;
}

interface SplitterContentOptions {
  /**
   * @description This function will be called after the menu has been opened.
   * @return {Function}
   */
  callback?: Function;
}

interface OnsSplitterContentElement {
  /**
   * @description Page element loaded in the splitter content.
   */
  page: string;

  /**
   * @description Show the page specified in pageUrl in the right section. Returns: Resolves to the new page element
   * @param {*} page
   * @param {Object} [options]
   * @return {Promise}
   */
  load(page: any, options?: SplitterContentOptions): Promise<HTMLElement>;
}

interface OnsSplitterElement {
  /**
   * @description Left `<ons-splitter-side>` element.
   */
  left: HTMLElement;
  /**
   * @description Right `<ons-splitter-side>` element.
   */
  right: HTMLElement;
  /**
   * @description The `<ons-splitter-content>` element.
   */
  content: HTMLElement;
  /**
   * @description Retrieve the back button handler.
   */
  onDeviceBackButton: Function;
}

interface BackButtonOptions {
  /**
   * @description Animation name. Available animations are "slide", "lift", "fade" and "none". These are platform based animations. For fixed animations, add "-ios" or "-md" suffix to the animation name. E.g. "lift-ios", "lift-md". Defaults values are "slide-ios" and "fade-md".
   */
  animation?: string;
  /**
   * @description Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.
   */
  animationOptions?: string;
  /**
   * @description Function that is called when the transition has ended.
   */
  callback?: Function;
  /**
   * @description The previous page will be refreshed (destroyed and created again) before popPage action.
   */
  refresh?: boolean;
}

interface OnsBackButtonElement {
  /**
   * @Options Options object.
   */
  options?: BackButtonOptions;
}

interface OnsProgressBarElement {
  /**
   * @description Current progress. Should be a value between 0 and 100.
   */
  value: number;
  /**
   * @description Current secondary progress. Should be a value between 0 and 100.
   */
  secondaryValue: number;
  /**
   * @description If this property is `true`, an infinite looping animation will be shown.
   */
  indeterminate: boolean;
}

interface OnsProgressCircularElement {
  /**
   * @description Current progress. Should be a value between 0 and 100.
   */
  value: number;
  /**
   * @description Current secondary progress. Should be a value between 0 and 100.
   */
  secondaryValue: number;
  /**
   * @description If this property is `true`, an infinite looping animation will be shown.
   */
  indeterminate: boolean;
}

interface PageLoader {
  load(page: any, parent: Element, done: Function): void;
  internalLoader: Function;
}

interface OnsSpeedDialElement {
  /**
   * @description Show the speed dial.
   */
  show(): void;
  /**
   * @description Hide the speed dial.
   */
  hide(): void;
  /**
   * @description Show the speed dial items.
   */
  showItems(): void;
  /**
   * @description Hide the speed dial items.
   */
  hideItems(): void;
  /**
   * @description Toggle visibility.
   */
  toggle(): void;
  /**
   * @description Toggle item visibility.
   */
  toggleItems(): void;
  /**
   * @description Whether the element is disabled or not.
   */
  disabled: boolean;
  /**
   * @description Whether the element is inline or not.
   */
  inline: boolean;
  /**
   * @description Whether the element is visible or not.
   */
  visible: boolean;
}

