import m from 'mithril';
import {Navigator, Page, SplitterSide, SplitterSideController} from 'mithril-onsenui'
import FirstPageExample from './SecondPageExample'
import SecondPageExample from './SecondPageExample'

const splitterSideController = new SplitterSideController();

class Page1Example {
	oninit(vnode) {
		this.vnode = vnode;
	}
	view(vnode) {
		console.log(vnode.attrs.splitterSideController);
		return m(Page, [
			m('ons-toolbar', [
				m('div', {class: 'center'}, 'Title'),
				m('div', {class: 'right'},
					m('ons-toolbar-button', {onclick: vnode.attrs.splitterSideController.toggle.bind(vnode.attrs.splitterSideController)},
						m('ons-icon', {icon: 'ion-navicon, material:md-menu'})
					)
				)
			]),
			m('p', {style: 'text-align: center'},
				'Page 1'
			)
		]);
	}
}

class Page2Example {
	oninit(vnode) {
		this.vnode = vnode;
	}
	view(vnode) {
		return m(Page, [
			m('ons-toolbar', [
				m('div', {class: 'center'}, 'Title'),
				m('div', {class: 'right'},
					m('ons-toolbar-button', {onclick: vnode.attrs.splitterSideController.toggle.bind(vnode.attrs.splitterSideController)},
						m('ons-icon', {icon: 'ion-navicon, material:md-menu'})
					)
				)
			]),
			m('p', {style: 'text-align: center'},
				'Page 2'
			)
		]);
	}
}


let CurrentPage = Page1Example;


class SplitterExample {
	oninit(vnode) {
		this.vnode = vnode;
		this.setSplitterPage = this.setSplitterPage.bind(this);
	}
	setSplitterPage () {
		CurrentPage = FirstPageExample;
	}
	view(vnode) {
		return m(Page, [
			m('ons-splitter', [
				m(SplitterSide, {controller: splitterSideController, swipeable: true, side: 'right', collapse: ''},
					m(Page, [
						m('ons-list', {class: 'list'},
							m('ons-list-item', {onclick: this.setSplitterPage.bind(this, 0)}, [
								m('div', {class: 'left'},
									m('ons-icon', {'fixed-width': true, class: 'list-item__icon', icon: 'ion-edit, material:md-edit'})
								),
								m('div', {class: 'center'},
									'Forms'
								),
								m('div', {class: 'right'},
									m('ons-icon', {icon: 'fa-link'})
								)
							])
						)
					])
				),
				m('ons-splitter-content', m(CurrentPage, {splitterSideController: splitterSideController}))
			])
		]);
	}
}

export default SplitterExample;
