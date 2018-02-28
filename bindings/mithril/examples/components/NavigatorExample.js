import m from 'mithril';
import {Navigator, Page, NavigatorController} from 'mithril-onsenui'
// import SplitterExample from './SplitterExample';
import PageExample from './PageExample';
// import SecondPageExample from './SecondPageExample';

var navigatorController = new NavigatorController();
var pageStack = [
	[PageExample, {navigator: navigatorController}, 'Page 1']
];

class NavigatorExample {
	constructor(vnode) {

	}
	oninit(vnode) {
		console.log(vnode);
	}
	view(vnode) {
		return m(Navigator, {swipeable: true, pageStack: pageStack, controller: navigatorController});
	}
}

export default NavigatorExample;
