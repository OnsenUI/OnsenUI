import m from 'mithril';
import {Navigator, Page, Splitter} from 'mithril-onsenui'
import SecondPageExample from './SecondPageExample'

class PageExample {
	oninit(vnode) {
		this.vnode = vnode;
		this.pushPageExample = this.pushPageExample.bind(this);
	}
	pushPageExample (){
		this.vnode.attrs.navigator.pushPage([SecondPageExample]);
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
				m('ons-button', {onclick: this.pushPageExample}, 'Click me!')
			)
		]);
	}
}

export default PageExample;
