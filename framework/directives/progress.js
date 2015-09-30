/**
 * @ngdoc directive
 * @id progress
 * @name ons-progress
 * @category progress
 * @description
 *   [en]A material design progress component. Can be displayed both as a linear or circular progress indicator.[/en]
 *   [ja]マテリアルデザインのprgoressコンポーネントです。linearもしくはcircularなプログレスインジケータを表示できます。[/ja]
 * @example
 * <ons-progress
 *  type="circular"
 *  value="55"
 *  secondary-value="87">
 * </ons-progress>
 */

/**
 * @ngdoc attribute
 * @name type
 * @initonly
 * @type {String}
 * @description
 *   [en]The type of indicator. Can be one of either "bar" or "circular". Defaults to "bar".[/en]
 *   [ja]indicatorのタイプを指定します。"bar"もしくは"circular"を指定できます。デフォルトは"bar"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]Change the appearance of the progress indicator.[/en]
 *   [ja]プログレスインジケータの見た目を変更します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name value
 * @type {Number}
 * @description
 *   [en]Current progress. Should be a value between 0 and 100.[/en]
 *   [ja]現在の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
 */

/**
 * @ngdoc attribute
 * @name secondary-value
 * @type {Number}
 * @description
 *   [en]Current secondary progress. Should be a value between 0 and 100.[/en]
 *   [ja]現在の２番目の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
 */

/**
 * @ngdoc attribute
 * @name indeterminate 
 * @description
 *   [en]If this attribute is set, an infinite looping animation will be shown.[/en]
 *   [ja]この属性が設定された場合、ループするアニメーションが表示されます。[/ja]
 */
