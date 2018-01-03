import m from 'mithril';
import ons from 'onsenui';

class BasicComponent {
	oninit(vnode) {
		this.vnode = vnode;
		this.updateClasses = this.updateClasses.bind(this);
	}
	updateClasses() {
		if(typeof this.vnode.className !== 'undefined') {
			if(this.lastClass) {
				this.vnode.className = this.vnode.className.replace(this.lastClass, ' ');
			}

			this.lastClass = ' ' + this.props.className.trim();

			this.vnode.className = this.vnode.className.trim() + this.lastClass;
		}

		ons._autoStyle.prepare(this.vnode.dom);
	}
	oncreate(vnode) {
		this.updateClasses();
	}
	onupdate(vnode) {
		this.updateClasses();
	}
}

export default BasicComponent;
