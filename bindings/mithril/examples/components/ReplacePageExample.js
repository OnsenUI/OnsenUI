import m from 'mithril';
import {Navigator, Page} from 'mithril-onsenui'

class ReplacePageExample {
	oninit(vnode) {
		this.vnode = vnode;
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
				m('div', 'Replaced page')
			)
		]);
	}
}

export default ReplacePageExample;
