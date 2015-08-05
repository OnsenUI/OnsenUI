/**
 * @ngdoc directive
 * @id splitter-site
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
 *   [ja]状態が変化した際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitter
 *   [en]Splitter view object.[/en]
 *   [ja]イベントが発火したSplitterオブジェクトです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are portrait, landscape, width #px or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     If the value is a media query, the view will collapse when the media query is true.
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
 * @name width
 * @type {String}
 * @description
 *   [en]
 *   [/en]
 *   [ja]
 *     この要素の横幅を指定します。pxと%での指定が可能です。eg. 100px 80%
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name side
 * @type {String}
 * @description
 *   [en]
 *   [/en]
 *   [ja]
 *     この要素が左か右かを指定します。指定できる値は"left"か"right"のみです。
 *   [/ja]
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
