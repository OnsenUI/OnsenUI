import {RouterUtil} from 'react-onsenui';

import MainPage from './main-page';
import SecondaryPage from './secondary-page';

const initialState = RouterUtil.init([{
	component: MainPage,
	props: {
		key: 'main'
	}
}]);

const reducer = (state = initialState, action) => {
  let routeConfig;

	switch(action.type) {
		case 'PUSH_PAGE':
      const {route} = action;
      routeConfig = state;
      return RouterUtil.push({routeConfig, route});
		case 'POST_PUSH':
      return RouterUtil.postPush(state);
		case 'POP_PAGE':
      routeConfig = state;
      return RouterUtil.pop({routeConfig});
		case 'POST_POP':
      return RouterUtil.postPop(state);
		default:
			return state;
	}
};

export default reducer;
