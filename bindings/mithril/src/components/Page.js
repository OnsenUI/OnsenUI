import m from 'mithril';
import BasicComponent from './BasicComponent.js';

class Page extends BasicComponent {
	oninit(...args) {
		super.oninit(...args)
	}

	view(vnode) {
		return m('ons-page', vnode.attrs, vnode.children);
	}
}

export default Page;
