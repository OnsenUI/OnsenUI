import m from 'mithril';
import {Navigator, Page} from 'mithril-onsenui'
import MyNavigatorController from './MyNavigatorController';
// import SplitterExample from './SplitterExample';
import PageExample from './PageExample';
// import SecondPageExample from './SecondPageExample';

var pageStack = [
	[PageExample, 'Page 1']
];

class NavigatorExample {
	constructor(vnode) {

	}
	oninit(vnode) {
		console.log(vnode);
	}
	view(vnode) {
		console.log(MyNavigatorController);
		return m(Navigator, {swipeable: true, pageStack: pageStack, controller: MyNavigatorController});
	}
}

export default NavigatorExample;
