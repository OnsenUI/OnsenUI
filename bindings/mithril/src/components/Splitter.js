import m from 'mithril';
import BasicComponent from './BasicComponent.js';

class Splitter extends BasicComponent {
	oninit(...args) {
		super.oninit(...args)
	}

	view(vnode) {
		return m('ons-toolbar', vnode.attrs, vnode.children);
	}
}

export default Splitter;
