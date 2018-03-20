import m from 'mithril';
import BasicComponent from './BasicComponent.js';

const NOOP = () => null;

class Navigator extends BasicComponent {
	constructor(){
		super();
		//Pages array used for intermittent data keeping
		this.currentPages = [];
		this.pagesBeforePop = [];
	}

	oninit(vnode) {
		super.oninit(vnode);

		if(vnode.attrs.controller) {
			vnode.attrs.controller.nav = this;
		}

		//Bind the this param on functions
		this._prePush = this._prePush.bind(this);
		this._postPush  = this._postPush .bind(this);
		this._prePop = this._prePop.bind(this);
		this._postPop = this._postPop.bind(this);
		this.popPage = this.popPage.bind(this);

		// console.log('oniniit');
		this.pageStack = vnode.attrs.pageStack;
		this.onDeviceBackButton = vnode.attrs.onDeviceBackButton || this._onDeviceBackButton.bind(this);
	}

	update(vnode) {
		if(vnode.attrs.onDeviceBackButton !== undefined) {
			vnode.dom.onDeviceBackButton = vnode.attrs.onDeviceBackButton;
		}
	}

	oncreate(vnode) {
		this.vnode = vnode;


		vnode.dom.addEventListener('prepush', this._prePush);
		vnode.dom.addEventListener('postpush', this._postPush);
		vnode.dom.addEventListener('prepop', this._prePop);
		vnode.dom.addEventListener('postpop', this._postPop);

		vnode.dom.swipeMax = vnode.attrs.swipePop;
		vnode.dom.popPage = this.popPage.bind(this);
		vnode.dom.onDeviceBackButton = this.onDeviceBackButton;
	}

	onremove(vnode) {
		vnode.dom.removeEventListener('prepush', this.vnode.attrs.onPrePush || NOOP);
		vnode.dom.removeEventListener('postpush', this.vnode.attrs.onPostPush || NOOP);
		vnode.dom.removeEventListener('prepop', this.vnode.attrs.onPrePop || NOOP);
		vnode.dom.removeEventListener('postpop', this.vnode.attrs.onPostPop || NOOP);
	}

	view(vnode) {
		return m('ons-navigator', Object.assign({}, vnode.attrs, {_onDeviceBackButton: this.onDeviceBackButton}), this.pageStack.map((page) => {
			return m(...page)
		}));
	}

	resetPage(page, options = {}) {
		this.resetPageStack([page], options);
	}

	resetPageStack(stack, options = {}) {
		if (this.vnode.dom._isRunning) {
			return Promise.reject('Navigator is already running animation.');
		}

		const hidePages = () => {
			for(let i = this.pageStack.length-2; i>=0; --i) {
				this.pageStack[1].style = this.pageStack[1].style || {};
				this.pageStack[1].style.display = 'none';
			}
		};

		if(options.pop) {
			const update = () => {
				this.pageStack.pop();
				m.redraw();
				return new Promise((resolve) => {
					m.redraw();
					resolve();
				});
			};

			return this.update(this.pageStack)
				.then(() => this.vnode.dom._popPage(options, update))
				.then(() => hidePages());
		}

		const update = () => {
			this.pageStack = stack;
			return new Promise((resolve) => {
				m.redraw();
				resolve();
			});
		}

		return this.vnode.dom._pushPage(options, update)
			.then(() => {
				m.redraw();
				hidePages();
			});

	}

	/* Onsen functions */

	_onDeviceBackButton(event) {
		if(this.pageStack.length > 1) {
			this.popPage();
		} else {
			event.callParentHandler();
		}
	}


	_prePop(event) {
		if (event.target !== this.vnode.dom) {
			return;
		}

		event.routes = {
			poppingRoute: this.pagesBeforePop[this.pagesBeforePop.length - 1],
			routes: this.pagesBeforePop
		};

		if(this.vnode.attrs.onPrePop) {
			this.vnode.attrs.onPrePop(event);
		}
	}

	_postPop(event) {
		if (event.target !== this._navi) {
			return;
		}

		event.routes = {
			poppedRoute: this.pagesBeforePop[this.pagesBeforePop.length - 1],
			routes: this.pagesBeforePop.slice(0, this.pagesBeforePop.length - 1)
		};

		if(this.vnode.attrs.onPostPop) {
			this.vnode.attrs.onPostPop(event);
		}
	}

	_prePush(event) {
		if (event.target !== this._navi) {
			return;
		}

		event.routes = {
			pushingRoute: this.routes[this.routes.length - 1],
			routes: this.routes.slice(0, this.routes.length - 1)
		};

		if(this.vnode.attrs.onPrePush){
			this.vnode.attrs.onPrePush(event);
		}
	}

	_postPush(event) {
		if (event.target !== this._navi) {
			return;
		}

		event.routes = {
			pushedRoute: this.routes[this.routes.length - 1],
			routes: this.routes
		};

		if(this.vnode.attrs.onPostPush){
			this.vnode.attrs.onPostPush(event);
		}
	}


	popPage(options = {}) {
		if (this.vnode.dom._isRunning) {
			return Promise.reject('Navigator is already running animation.');
		}

		this.pagesBeforePop = this.pageStack.slice();

		const update = () => {
			return new Promise((resolve) => {
				this.pageStack.pop();
				m.redraw();
				resolve();
			});
		};

		return this.vnode.dom._popPage(options, update);
	}


	pushPage(page, options = {}) {
		if (this.vnode.dom._isRunning) {
			return Promise.reject('Navigator is already running animation.');
		}

		return new Promise((resolve) => {
			const update = () => {
				return new Promise((resolve) => {
					this.pageStack.push(page);
					m.redraw();
					resolve();
				});
			};

			this.vnode.dom
			._pushPage(
				options,
				update
			)
			.then(resolve)
			.catch((error) => {
				this.pageStack.pop();
				throw error;
			});
		});
	}

	onDeviceBackButton(event) {
		if (this.pageStack.length > 1) {
			this.popPage();
		} else {
			event.callParentHandler();
		}
	}
}

export default Navigator;
