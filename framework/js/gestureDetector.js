/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.GestureDetector
 * @category util
 * @description 
 *   [en][/en]
 *   [ja]ジェスチャを検知するためのユーティリティクラスです。[/ja]
 */

/**
 * @ngdoc method
 * @signature constructor(element[, options])
 * @description
 *  [en][/en]
 *  [ja]GestureDetectorのインスタンスを生成します。[/ja]
 * @param {Element} element
 *   [en]Name of the event.[/en]
 *   [ja]ジェスチャを検知するDOM要素を指定します。[/ja]
 * @param {Object} [options]
 *   [en][/en]
 *   [ja]オプションを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(gestures, handler)
 * @description
 *  [en][/en]
 *  [ja]ジェスチャに対するイベントハンドラを追加します。指定できるジェスチャ名は、drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate です。[/ja]
 * @param {String} gestures
 *   [en][/en]
 *   [ja]検知するジェスチャ名を指定します。スペースで複数指定することができます。[/ja]
 * @param {Function} handler
 *   [en][/en]
 *   [ja]イベントハンドラとなる関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(gestures, handler)
 * @description
 *  [en][/en]
 *  [ja]イベントリスナーを削除します。[/ja]
 * @param {String} gestures
 *   [en][/en]
 *   [ja]ジェスチャ名を指定します。スペースで複数指定することができます。[/ja]
 * @param {Function} handler
 *   [en][/en]
 *   [ja]イベントハンドラとなる関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature enable(state)
 * @description
 *  [en][/en]
 *  [ja]ジェスチャ検知を有効化/無効化します。[/ja]
 * @param {Boolean} state
 *   [en][/en]
 *   [ja]有効にするかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature dispose()
 * @description
 *  [en][/en]
 *  [ja]このインスタンスでのジェスチャの検知や、イベントハンドラを全て解除して廃棄します。[/ja]
 */

