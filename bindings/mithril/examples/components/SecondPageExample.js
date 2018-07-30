import m from 'mithril';
import {Navigator, Page} from 'mithril-onsenui'
import MyNavigatorController from './MyNavigatorController';

class SecondPageExample {
	oninit(vnode) {
		this.vnode = vnode;
		this.PageExample = vnode.attrs.PageExample;
	}
	resetPageExample (){
		MyNavigatorController.resetPage([this.vnode.attrs.PageExample, {}, '']);
	}
	resetPagePopExample (){
		MyNavigatorController.resetPage([this.vnode.attrs.PageExample, {}, ''], {pop: true});
	}
	view(vnode) {
		return m(Page, [
			m('ons-toolbar', [
				m('ons-back-button', 'Back'),
				m('div', {class: 'center'}, 'Title'),
				m('div', {class: 'right'},
					m('ons-toolbar-button',
						m('ons-icon', {icon: 'ion-navicon, material:md-menu'})
					)
				)
			]),
			m('p', {style: 'text-align: center'},
				m('ons-button', {onclick: this.resetPageExample.bind(this)}, 'Reset page!')
			),
			m('p', {style: 'text-align: center'},
				m('ons-button', {onclick: this.resetPagePopExample.bind(this)}, 'Reset page pop!')
			)
		]);
	}
}

export default SecondPageExample;
