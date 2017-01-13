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
      routeStack: [...routes],
      processStack: []
    };
  },

  replace: ({routeConfig, route, options, key}) => {
    const config = {...routeConfig};
    const routeStack = [...config.routeStack];
    let processStack = [...config.processStack];

    if (key == null || processStack.filter((el) => el.key === key).length === 0) {
      const process = {
        type: 'replace',
        route,
        options,
        key
      };
      processStack = [
        ...processStack,
        process
      ];
    }

    return {
      routeStack,
      processStack
    };
  },

  reset: ({routeConfig, route, options, key}) => {
    const config = {...routeConfig};
    const routeStack = [...config.routeStack];
    let processStack = [...config.processStack];

    if (key == null || processStack.filter((el) => el.key === key).length === 0) {
      const process = {
        type: 'reset',
        route,
        options,
        key
      };

      processStack = [
        ...processStack,
        process
      ];
    }

    return {
      routeStack,
      processStack
    };
  },

  push: ({routeConfig, route, options, key}) => {
    const config = {...routeConfig};
    const routeStack = [...config.routeStack];
    let processStack = [...config.processStack];

    if (key == null || config.processStack.filter((el) => el.key === key).length === 0) {
      const process = {
        type: 'push',
        route,
        options,
        key
      };

      processStack = [
        ...processStack,
        process
      ];
    }

    return {
      routeStack,
      processStack
    };
  },

  pop: ({routeConfig, options, key}) => {
    const config = {...routeConfig};
    const routeStack = [...config.routeStack];
    let processStack = [...config.processStack];

    /**
     * Safegaurd to ensure that not
     * too many pages are popped from
     * the stack.
     */
    const pops = processStack
      .filter(x => x.type === 'pop')
      .length;

    if (pops + 1 >= routeStack.length) {
      console.warn('Page stack is already empty');
      return config;
    }

    const process = {
      type: 'pop',
      key,
      options
    };

    processStack = [
      ...processStack,
      process
    ];

    return {
      routeStack,
      processStack
    };
  },

  postPush: (routeConfig) => {
    const config = {...routeConfig};
    let routeStack = [...config.routeStack];
    const processStack = [...config.processStack];

    const next = processStack.shift();
    const type = next.type;
    let route = next.route;

    if (type === 'push') {
      if (route !== null) {
        routeStack = [
          ...routeStack,
          route
        ];
      }
    } else if (type === 'reset') {
      if (!Array.isArray(route)) route = [route];
      routeStack = route;
    } else if (type === 'replace') {
      routeStack.pop();
      routeStack.push(route);
    }

    return {
      routeStack,
      processStack
    };
  },

  postPop: (routeConfig) => {
    const config = {...routeConfig};
    let routeStack = [...config.routeStack];
    let processStack = [...config.processStack];
    routeStack = routeStack.slice(0, routeStack.length - 1);
    processStack = processStack.slice(1);

    return {
      routeStack,
      processStack
    };
  }
};
