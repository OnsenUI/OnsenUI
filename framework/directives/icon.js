/**
 * @ngdoc directive
 * @id icon
 * @name ons-icon
 * @category icon
 * @description
 *   [en]Displays an icon. Font Awesome(https://fortawesome.github.io/Font-Awesome/) and Ionicon icons(http://ionicons.com) and Material Design Iconic Font(http://zavoloklom.github.io/material-design-iconic-font/) are supported.[/en]
 *   [ja]アイコンを表示するコンポーネントです。Font Awesome(https://fortawesome.github.io/Font-Awesome/)もしくはIonicons(http://ionicons.com)もしくはMaterial Design Iconic Font(http://zavoloklom.github.io/material-design-iconic-font/)から選択できます。[/ja]
 * @codepen xAhvg
 * @guide UsingIcons [en]Using icons[/en][ja]アイコンを使う[/ja]
 * @example
 * <ons-icon
 *   icon="md-car"
 *   size="20px"
 *   fixed-width="false"
 *   style="color: red">
 * </ons-icon>
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]The icon name. "md-" prefix for Material Icons, "fa-" for Font Awesome and "ion-" prefix for Ionicons icons. See all icons at http://zavoloklom.github.io/material-design-iconic-font/icons.html, http://fontawesome.io/icons/ and http://ionicons.com.[/en]
 *   [ja]アイコン名を指定します。<code>md-</code>で始まるものはMaterial Iconsとして、<code>fa-</code>で始まるものはFont Awesomeとして、<code>ion-</code>で始まるものはIoniconsとして扱われます。使用できるアイコンはこちら: http://zavoloklom.github.io/material-design-iconic-font/icons.html http://fontawesome.io/icons/ http://ionicons.com[/ja]
 */

/**
 * @ngdoc attribute
 * @name size
 * @type {String}
 * @description
 *   [en]The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in pixels.[/en]
 *   [ja]アイコンのサイズを指定します。値は、lg, 2x, 3x, 4x, 5xもしくはピクセル単位で指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name rotate
 * @type {Number}
 * @description
 *   [en]Number of degrees to rotate the icon. Valid values are 90, 180, or 270.[/en]
 *   [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name flip
 * @type {String}
 * @description
 *   [en]Flip the icon. Valid values are "horizontal" and "vertical".[/en]
 *   [ja]アイコンを反転します。horizontalもしくはverticalを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-width
 * @type {Boolean}
 * @default false
 * @description
 *  [en]When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are true, false. Default is false.[/en]
 *  [ja]等幅にするかどうかを指定します。trueもしくはfalseを指定できます。デフォルトはfalseです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name spin
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Specify whether the icon should be spinning. Valid values are true and false.[/en]
 *   [ja]アイコンを回転するかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 */

