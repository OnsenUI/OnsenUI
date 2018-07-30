import m from 'mithril';
import {Navigator, Page} from 'mithril-onsenui'
import MyNavigatorController from './MyNavigatorController';
import SecondPageExample from './SecondPageExample'

class PageExample {
	oninit(vnode) {
		this.vnode = vnode;
		this.pushPageExample = this.pushPageExample.bind(this);
	}
	pushPageExample (){
		console.log(MyNavigatorController);
		MyNavigatorController.pushPage([SecondPageExample, {PageExample}]);
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
			m('p', {style: 'text-align: center'},
				m('ons-button', {onclick: this.pushPageExample.bind(this)}, 'Push page!')
			)
		]);
	}
}

export default PageExample;
