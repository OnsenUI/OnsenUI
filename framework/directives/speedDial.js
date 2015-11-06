/**
 * @ngdoc directive
 * @id speed-dial
 * @name ons-speed-dial
 * @category speeddial
 * @description
 *   [en][/en]
 *   [ja]Material DesignのSpeed dialコンポーネントを表現する要素です。[/ja]
 * @seealso ons-speed-dial-item
 *   [en]ons-speed-dial-item component[/en]
 *   [ja]ons-speed-dial-itemコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-icon
 *     icon="fa-twitter"
 *     size="26px"
 *     fixed-width="false"
 *     style="vertical-align:middle;">
 *   </ons-icon>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>C</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>B</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>A</ons-speed-dial-item>
 * </ons-speed-dial>
 */

/**
 * @ngdoc attribute
 * @name position
 * @type {String}
 * @description
 *   [en][/en]
 *   [ja]
 *     この要素を表示する左右と上下の位置を指定します。
 *     例えば、右上に表示する場合には"right top"を指定します。
 *     左右と上下の位置の指定には、rightとleft、topとbottomがそれぞれ指定できます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en][/en]
 *   [ja]
 *     要素が表示する方向を指定します。up, down, left, rightが指定できます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]無効化する場合に指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature show()
 * @description
 *   [en][/en]
 *   [ja]Speed dialを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide()
 * @description
 *   [en][/en]
 *   [ja]Speed dialを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature showItems()
 * @description
 *   [en][/en]
 *   [ja]Speed dialの子要素を表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hideItems()
 * @description
 *   [en][/en]
 *   [ja]Speed dialの子要素を非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggle()
 * @description
 *   [en][/en]
 *   [ja]Speed dialの表示非表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggleItems()
 * @description
 *   [en][/en]
 *   [ja]Speed dialの子要素の表示非表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the element.[/en]
 *   [ja]disabled状態にするかどうかを設定します。[/ja]
 * @description
 *   [en][/en]
 *   [ja]この要素を無効化するかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the element is disabled.[/en]
 *   [ja]disabled状態になっているかどうかを返します。[/ja]
 * @description
 *   [en][/en]
 *   [ja]この要素を無効化するかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isInline()
 * @description
 *   [en][/en]
 *   [ja]この要素がインライン要素かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @return {Boolean}
 *   [en][/en]
 *   [ja]表示されているかどうかを返します。[/ja]
 * @description
 *   [en][/en]
 *   [ja]表示されているかどうかを返します。[/ja]
 */
