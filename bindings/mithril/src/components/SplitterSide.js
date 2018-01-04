import m from 'mithril';
import BasicComponent from './BasicComponent.js';

class SplitterSide extends BasicComponent {
	oninit(vnode, ...args) {
		super.oninit(vnode, ...args)

		if(vnode.attrs.controller) {
			vnode.attrs.controller.splitter = this;
		}
	}

	view(vnode) {
		return m('ons-splitter-side', vnode.attrs, vnode.children);
	}

	open(...args) {
		this.vnode.dom.open(...args)
	}

	close(...args) {
		this.vnode.dom.close(...args)
	}

	toggle(...args) {
		this.vnode.dom.toggle(...args)
	}
}

export default SplitterSide;
