import m from 'mithril';
// import ons from 'onsenui';
import {Navigator, Page} from 'mithril-onsenui'

import * as examples from './components';
import MyNavigatorController from './MyNavigatorController';


class Examples {
	constructor(vnode) {

	}
	oninit(vnode) {
		
	}
	openExample(exampleKey) {
		MyNavigatorController.pushPage([examples[exampleKey]]);
	}
	view(vnode) {
		return m(Page, [
			m('ons-toolbar', [
				m('div', {class: 'center'}, 'Title'),
				m('div', {class: 'right'},
					m('ons-toolbar-button', {onclick: this.toggleMenu},
						m('ons-icon', {icon: 'ion-navicon, material:md-menu'})
					)
				)
			]),
			m('ons-list', Object.keys(examples).sort().map((key) => {
				return m('ons-list-item', {modifier: 'chevron', tappable: true, onclick: this.openExample.bind(this, key)}, key)
			}))
		]);
	}
}
var pageStack = [
	[Examples, {navigator: MyNavigatorController}, 'Page 1']
];


class App {
	constructor(vnode) {

	}
	oninit(vnode) {
		console.log(vnode);
	}
	view(vnode) {
		return m(Navigator, {swipeable: true, pageStack: pageStack, controller: MyNavigatorController});
	}
}

m.mount(document.getElementById('app'), App);
