/*
 * routeStack : [userRoute, userRoute2, ...]
 * processStack: [
 * { type: push | pop | reset, route: userRoute },
 * { type: push | pop | reset, route: userRoute2 },
 * ...
 * ]
 */

export default {
  init: (routes) => {
    return {
      routeStack: routes,
      processStack: []
    };
  },

  replace: ({routeConfig, route, options, key}) => {
    const config = {...routeConfig};

    // do not push keys twice
    if (key == null ||
      config.processStack.filter((el) => el.key === key).length === 0) {
      config.processStack.push({
        type: 'replace',
        route,
        options,
        key
      });
    }

    return config;
  },

  reset: ({routeConfig, route, options, key}) => {
    const config = {...routeConfig};

    // do not push keys twice
    if (key == null ||
      config.processStack.filter((el) => el.key === key).length === 0) {
      config.processStack.push({
        type: 'reset',
        route,
        options,
        key
      });
    }

    return config;
  },

  push: ({routeConfig, route, options, key}) => {
    const config = {...routeConfig};

    // do not push keys twice
    if (key == null ||
      config.processStack.filter((el) => el.key === key).length === 0) {
      config.processStack.push({
        type: 'push',
        route,
        options,
        key
      });
    }

    return config;
  },

  pop: ({routeConfig, options, key}) => {
    const config = {...routeConfig};

    /**
     * Safegaurd to ensure that not
     * too many pages are popped from
     * the stack.
     */
    const pops = config.processStack
      .filter(x => x.type === 'pop')
      .length;

    if (pops + 1 >= config.routeStack.length) {
      console.warn('Page stack is already empty');
      return config;
    }

    config.processStack.push({
      type: 'pop',
      key,
      options
    });

    return config;
  },

  postPush: (routeConfig) => {
    const config = {...routeConfig};
    const next = routeConfig.processStack.shift();
    const type = next.type;
    let route = next.route;

    if (type === 'push') {
      if (route !== null) {
        config.routeStack.push(route);
      }
    } else if (type === 'reset') {
      if (!Array.isArray(route)) route = [route];
      config.routeStack = route;
    } else if (type === 'replace') {
      config.routeStack.pop();
      config.routeStack.push(route);
    }

    return config;
  },

  postPop: (routeConfig) => {
    const config = {...routeConfig};
    config.processStack.shift();
    config.routeStack.pop();

    return config;
  }
};
