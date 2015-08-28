/**
 * @ngdoc directive
 * @id splitter-side
 * @name ons-splitter-side
 * @category control
 * @description
 *  [en][/en]
 *  [ja][/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

/**
 * @ngdoc event
 * @name modechange
 * @description
 *   [en]Fired just after the view's mode change.[/en]
 *   [ja]この要素のモードが変化した際に発火します。[/ja]
 */

/**
 * @ngdoc event
 * @name preopen
 * @description
 *   [en]Fired just before the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開く前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Function} event.cancel
 *   [en]Call to cancel opening sliding-menu.[/en]
 *   [ja]スライディングメニューが開くのをキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name postopen
 * @description
 *   [en]Fired just after the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開いた後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name preclose
 * @description
 *   [en]Fired just before the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Function} event.cancel
 *   [en]Call to cancel opening sliding-menu.[/en]
 *   [ja]スライディングメニューが閉じるのをキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name postclose
 * @description
 *   [en]Fired just after the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じた後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preopen
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preclose
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postopen
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postclose
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are "portrait", "landscape" or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     If the value is a media query, the view will collapse when the media query is true.
 *     If the value is not defined, the view be always on collapse mode.
 *   [/en]
 *   [ja]
 *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
 *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
 *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
 *     値に何も指定しない場合には、常にcollapseモードになります。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name swipe-target-width
 * @type {String}
 * @description
 *   [en]The width of swipeable area calculated from the left (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name width
 * @type {String}
 * @description
 *   [en]Can specify both in px and %. eg. 90%, 200px[/en]
 *   [ja]この要素の横幅を指定します。pxと%での指定が可能です。eg. 90%, 200px[/ja]
 */

/**
 * @ngdoc attribute
 * @name side
 * @type {String}
 * @description
 *   [en]Specify which side of the screen the ons-splitter-side element is located on. Possible values are "left" and "right".[/en]
 *   [ja]この要素が左か右かを指定します。指定できる値は"left"か"right"のみです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mode
 * @type {String}
 * @description
 *   [en]Current mode. Possible values are "collapse" or "split". This attribute is read only.[/en]
 *   [ja]現在のモードが設定されます。"collapse"もしくは"split"が指定されます。この属性は読み込み専用です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]ons-splitter-side要素に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @type {Boolean}
 * @description
 *   [en]Whether to enable swipe interaction on collapse mode.[/en]
 *   [ja]collapseモード時にスワイプ操作を有効にする場合に指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature load(page)
 * @param {String} page
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature open([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open ons-splitter-side menu on collapse mode.[/en]
 *   [ja]collapseモードになっているons-splitterside要素を開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature close([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close ons-splitter-side menu on collapse mode.[/en]
 *   [ja]collapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentMode()
 * @return {String}
 *   [en]Get current view's mode on the ons-splitter-side. Possible values are "collapse" or "split".[/en]
 *   [ja]このons-splitter-side要素の現在のモードを返します。"split"かもしくは"collapse"のどちらかです。[/ja]
 */
