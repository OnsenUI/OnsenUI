'use strict';

angular.module('app').factory('ColorSchemeFactory', function(ColorScheme) {
  var schemes = [];

  var transparent = 'rgba(0,0,0,.0)';

  var schemeData = [
    {
      text: 'blue',
      colors: {
        // Global
        'background-color': '#fff',
        'text-color': '#1f1f21',
        'sub-text-color': '#999',
        'highlight-color': '#1284ff',
        'second-highlight-color': '#4cda64',
        'border-color': '#ddd',

        // Toolbar
        'toolbar-background-color': '#f8f8f8',
        'toolbar-button-color': '#1284ff',
        'toolbar-text-color': '#1f1f21',
        'toolbar-border-color': '#ddd',

        // Button Bar
        'buttonbar-color': '#1284ff',
        'buttonbar-active-text-color': '#fff',

        // List
        'list-background-color': '#fff',
        'list-header-background-color': '#eee',
        'list-tap-active-background-color': '#d9d9d9',

        // Tabbar
        'tabbar-background-color': '#f8f8f8',
        'tabbar-text-color': '#666',
        'tabbar-highlight-text-color': '#1284ff',
        'tabbar-border-color': '#ddd',

        // Switch
        'switch-highlight-color': '#4cd964',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Notification
        'notification-background-color': '#dc5236'
      }
    },

    {
      text: 'dark',
      colors: {
        // Global
        'background-color': '#292a2e',
        'text-color': '#fff',
        'sub-text-color': '#87888f',
        'highlight-color': '#4073eb',
        'second-highlight-color': '#1a1b1f',
        'border-color': '#65676e',

        // Toolbar
        'toolbar-background-color': '#212226',
        'toolbar-button-color': '#4073eb',
        'toolbar-text-color': '#fff',
        'toolbar-border-color': transparent,

        // Button Bar
        'buttonbar-color': '#ddd',
        'buttonbar-active-text-color': '#2e2f33',

        // List
        'list-background-color': transparent,
        'list-header-background-color': '#222329',
        'list-tap-active-background-color': '#47484d',

        // Tabbar
        'tabbar-background-color': '#212226',
        'tabbar-text-color': '#87888f',
        'tabbar-highlight-text-color': '#fff',
        'tabbar-border-color': transparent,

        // Switch
        'switch-highlight-color': '#3385ff',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Notification
        'notification-background-color': '#3385ff'
      }
    },
    {
      text: 'sunshine',
      colors: {
        // Global
        'background-color': '#fff',
        'text-color': '#fa3737',
        'sub-text-color': '#c79090',
        'highlight-color': '#ff4255',
        'second-highlight-color': '#ff4c5e',
        'border-color': '#f0d3d3',

        // Toolbar
        'toolbar-background-color': '#fff',
        'toolbar-button-color': '#ff4255',
        'toolbar-text-color': '#fa3737',
        'toolbar-border-color': transparent,

        // Button Bar
        'buttonbar-color': '#ff1a33',
        'buttonbar-active-text-color': '#fff',

        // List
        'list-background-color': '#fff',
        'list-header-background-color': '#eee',
        'list-tap-active-background-color': '#d9d9d9',

        // Tabbar
        'tabbar-background-color': '#fff',
        'tabbar-text-color': '#c79090',
        'tabbar-highlight-text-color': '#ff4255',
        'tabbar-border-color': '#f0d3d3',

        // Switch
        'switch-highlight-color': '#4cd964',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Notification
        'notification-background-color': '#666'
      }
    },

    {
      text: 'purple',
      colors: {
        // Global
        'background-color': '#f3f3f3',
        'text-color': '#524b57',
        'sub-text-color': '#ccc',
        'highlight-color': '#8962ed',
        'second-highlight-color': '#574bdb',
        'border-color': '#ddd',

        // Toolbar
        'toolbar-background-color': '#fff',
        'toolbar-button-color': '#8962ed',
        'toolbar-text-color': '#5b2c7a',
        'toolbar-border-color': '#ddd',

        // Button Bar
        'buttonbar-color': '#ac62ed',
        'buttonbar-active-text-color': '#fff',

        // List
        'list-background-color': '#fff',
        'list-header-background-color': '#eee',
        'list-tap-active-background-color': '#d9d9d9',

        // Tabbar
        'tabbar-background-color': '#fff',
        'tabbar-text-color': '#aaa',
        'tabbar-highlight-text-color': '#8962ed',
        'tabbar-border-color': '#ddd',

        // Switch
        'switch-highlight-color': '#574bdb',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Notification
        'notification-background-color': '#dc5236'
      }
    }
  ];

  var scheme;
  for (var i = 0; i < schemeData.length; i++) {
    scheme = new ColorScheme(schemeData[i]);
    schemes.push(scheme);
  }

  return {
    getSchemes: function() {
      return schemes;
    }
  };
});

