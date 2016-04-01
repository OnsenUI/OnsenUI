(function(exports) {
  // This file is required by both of browser and node.js.

  var transparent = 'rgba(0,0,0,.0)';

  exports.schemes = [

    {
      text: 'blue-basic',
      colors: {
        // Global
        'background-color': '#f9f9f9',
        'material-background-color': '#ffffff',
        'text-color': '#1f1f21',
        'sub-text-color': '#999',
        'highlight-color': 'rgba(24,103,194,0.81)',
        'second-highlight-color': '#25a6d9',
        'border-color': '#ccc',

        // Toolbar
        'toolbar-background-color': '#fff',
        'toolbar-button-color': 'rgba(38,100,171,0.81)',
        'toolbar-text-color': '#1f1f21',
        'toolbar-border-color': '#bbb',

        // Button Bar
        'buttonbar-color': 'rgba(18,114,224,0.77)',
        'buttonbar-active-text-color': '#fff',

        // List
        'list-background-color': '#fff',
        'list-header-background-color': '#eee',
        'list-tap-active-background-color': '#d9d9d9',

        // Tabbar
        'tabbar-background-color': '#fff',
        'tabbar-text-color': '#999',
        'tabbar-highlight-text-color': 'rgba(24,103,194,0.81)',
        'tabbar-border-color': '#ccc',

        // Switch
        'switch-highlight-color': '#5198db',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Alert Dialog
        'alert-dialog-background-color': '#f4f4f4',
        'alert-dialog-text-color': '#1f1f21',
        'alert-dialog-button-color': 'rgba(24,103,194,0.81)',
        'alert-dialog-separator-color': '#ddd',

        // Dialog
        'dialog-background-color': '#f4f4f4',

        // Popover
        'popover-background-color': 'white',
        'popover-text-color': '#1f1f21',

        // Notification
        'notification-background-color': '#dc5236',

        // Material Switch
        'material-switch-active-thumb-color': '#009688',
        'material-switch-inactive-thumb-color': '#f1f1f1',
        'material-switch-active-background-color': '#77c2bb',
        'material-switch-inactive-background-color': '#b0afaf',

        // Material Range
        'material-range-track-color': '#e0e0e0',
        'material-range-thumb-color': '#009688',

        // Material Toolbar
        'material-toolbar-background-color': '#009688',
        'material-toolbar-text-color': '#ffffff',
        'material-toolbar-button-color': '#ffffff',
        'material-toolbar-button-active-color': '#26a69a',

        // Material Button
        'material-button-background-color': '#009688',
        'material-button-text-color': '#ffffff',

        // Material Checkbox
        'material-checkbox-active-color': '#009688',
        'material-checkbox-inactive-color': '#717171',
        'material-checkbox-checkmark-color': '#ffffff',

        // Material Radio Button
        'material-radio-button-active-color': '#009688',
        'material-radio-button-inactive-color': '#717171',

        // Material Text Input
        'material-text-input-text-color': '#212121',
        'material-text-input-active-color': '#009688',
        'material-text-input-inactive-color': '#afafaf',

        // Material Dialog
        'material-dialog-background-color': '#ffffff',

        // Material Alert Dialog
        'material-alert-dialog-background-color': '#ffffff',
        'material-alert-dialog-title-color': '#212121',
        'material-alert-dialog-content-color': '#727272',
        'material-alert-dialog-button-color': '#009688',

        // Material Progress
        'material-progress-bar-primary-color': '#009688',
        'material-progress-bar-secondary-color': '#80cbc4',
        'material-progress-bar-background-color': '#e0e0e0',
        'material-progress-circle-primary-color': '#009688',
        'material-progress-circle-secondary-color': '#80cbc4',

        // Material Tabbar
        'material-tabbar-background-color': '#009688',
        'material-tabbar-text-color': 'rgba(255, 255, 255, 0.6)',
        'material-tabbar-highlight-text-color': '#ffffff',
        'material-tabbar-highlight-color': '#26a69a',

        // Floating Action Button
        'fab-text-color': '#ffffff',
        'fab-background-color': '#009688'
      }
    },

    {
      text: 'blue',
      colors: {
        // Global
        'background-color': '#fff',
        'material-background-color': '#ffffff',
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

        // Alert Dialog
        'alert-dialog-background-color': '#f4f4f4',
        'alert-dialog-text-color': '#1f1f21',
        'alert-dialog-button-color': '#1284ff',
        'alert-dialog-separator-color': '#ddd',

        // Dialog
        'dialog-background-color': '#f4f4f4',

        // Popover
        'popover-background-color': 'white',
        'popover-text-color': '#1f1f21',

        // Notification
        'notification-background-color': '#dc5236',

        // Material Switch
        'material-switch-active-thumb-color': '#009688',
        'material-switch-inactive-thumb-color': '#f1f1f1',
        'material-switch-active-background-color': '#77c2bb',
        'material-switch-inactive-background-color': '#b0afaf',

        // Material Range
        'material-range-track-color': '#e0e0e0',
        'material-range-thumb-color': '#009688',

        // Material Toolbar
        'material-toolbar-background-color': '#009688',
        'material-toolbar-text-color': '#ffffff',
        'material-toolbar-button-color': '#ffffff',
        'material-toolbar-button-active-color': '#26a69a',

        // Material Button
        'material-button-background-color': '#009688',
        'material-button-text-color': '#ffffff',

        // Material Checkbox
        'material-checkbox-active-color': '#009688',
        'material-checkbox-inactive-color': '#717171',
        'material-checkbox-checkmark-color': '#ffffff',

        // Material Radio Button
        'material-radio-button-active-color': '#009688',
        'material-radio-button-inactive-color': '#717171',

        // Material Text Input
        'material-text-input-text-color': '#212121',
        'material-text-input-active-color': '#009688',
        'material-text-input-inactive-color': '#afafaf',

        // Material Dialog
        'material-dialog-background-color': '#ffffff',

        // Material Alert Dialog
        'material-alert-dialog-background-color': '#ffffff',
        'material-alert-dialog-title-color': '#212121',
        'material-alert-dialog-content-color': '#727272',
        'material-alert-dialog-button-color': '#009688',

        // Material Progress
        'material-progress-bar-primary-color': '#009688',
        'material-progress-bar-secondary-color': '#80cbc4',
        'material-progress-bar-background-color': '#e0e0e0',
        'material-progress-circle-primary-color': '#009688',
        'material-progress-circle-secondary-color': '#80cbc4',

        // Material Tabbar
        'material-tabbar-background-color': '#009688',
        'material-tabbar-text-color': 'rgba(255, 255, 255, 0.6)',
        'material-tabbar-highlight-text-color': '#ffffff',
        'material-tabbar-highlight-color': '#26a69a',

        // Floating Action Button
        'fab-text-color': '#ffffff',
        'fab-background-color': '#009688'
      }
    },

    {
      text: 'dark',
      colors: {
        // Global
        'background-color': '#242424',
        'material-background-color': '#333333',
        'text-color': '#fff',
        'sub-text-color': '#87888f',
        'highlight-color': '#3d74ff',
        'second-highlight-color': '#5494d1',
        'border-color': '#424242',

        // Toolbar
        'toolbar-background-color': '#1a1a1a',
        'toolbar-button-color': '#aaa',
        'toolbar-text-color': '#fff',
        'toolbar-border-color': transparent,

        // Button Bar
        'buttonbar-color': '#ddd',
        'buttonbar-active-text-color': '#2e2f33',

        // List
        'list-background-color': transparent,
        'list-header-background-color': '#3e3f42',
        'list-tap-active-background-color': '#47484d',

        // Tabbar
        'tabbar-background-color': '#1a1a1a',
        'tabbar-text-color': '#bdbdbd',
        'tabbar-highlight-text-color': '#549eff',
        'tabbar-border-color': transparent,

        // Switch
        'switch-highlight-color': '#3385ff',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Alert Dialog
        'alert-dialog-background-color': '#f4f4f4',
        'alert-dialog-text-color': '#1f1f21',
        'alert-dialog-button-color': '#3d74ff',
        'alert-dialog-separator-color': '#ddd',

        // Dialog
        'dialog-background-color': '#f4f4f4',

        // Popover
        'popover-background-color': 'black',
        'popover-text-color': 'white',

        // Notification
        'notification-background-color': '#3385ff',

        // Material Switch
        'material-switch-active-thumb-color': '#80cbc4',
        'material-switch-inactive-thumb-color': '#bdbdbd',
        'material-switch-active-background-color': '#5a7f7c',
        'material-switch-inactive-background-color': '#707070',

        // Material Range
        'material-range-track-color': '#707070',
        'material-range-thumb-color': '#80cbc4',

        // Material Toolbar
        'material-toolbar-background-color': '#009688',
        'material-toolbar-text-color': '#ffffff',
        'material-toolbar-button-color': '#ffffff',
        'material-toolbar-button-active-color': '#26a69a',

        // Material Button
        'material-button-background-color': '#80cbc4',
        'material-button-text-color': '#ffffff',

        // Material Checkbox
        'material-checkbox-active-color': '#009688',
        'material-checkbox-inactive-color': '#f5f5f5',
        'material-checkbox-checkmark-color': '#333333',

        // Material Radio Button
        'material-radio-button-active-color': '#009688',
        'material-radio-button-inactive-color': '#f5f5f5',

        // Material Text Input
        'material-text-input-text-color': '#ffffff',
        'material-text-input-active-color': '#009688',
        'material-text-input-inactive-color': '#4c4c4c',

        // Material Dialog
        'material-dialog-background-color': '#333333',

        // Material Alert Dialog
        'material-alert-dialog-background-color': '#333333',
        'material-alert-dialog-title-color': '#ffffff',
        'material-alert-dialog-content-color': '#afafaf',
        'material-alert-dialog-button-color': '#80cbc4',

        // Material Progress
        'material-progress-bar-primary-color': '#009688',
        'material-progress-bar-secondary-color': '#80cbc4',
        'material-progress-bar-background-color': '#333333',
        'material-progress-circle-primary-color': '#009688',
        'material-progress-circle-secondary-color': '#80cbc4',

        // Material Tabbar
        'material-tabbar-background-color': '#009688',
        'material-tabbar-text-color': 'rgba(255, 255, 255, 0.6)',
        'material-tabbar-highlight-text-color': '#ffffff',
        'material-tabbar-highlight-color': '#26a69a',

        // Floating Action Button
        'fab-text-color': '#ffffff',
        'fab-background-color': '#80cbc4'
      }
    },
    {
      text: 'sunshine',
      colors: {
        // Global
        'background-color': '#f9f9f9',
        'material-background-color': '#ffffff',
        'text-color': '#333',
        'sub-text-color': '#999',
        'highlight-color': '#eb482f',
        'second-highlight-color': '#f28227',
        'border-color': '#ddd',

        // Toolbar
        'toolbar-background-color': '#fff',
        'toolbar-button-color': '#eb5e2f',
        'toolbar-text-color': '#333',
        'toolbar-border-color': '#ddd',

        // Button Bar
        'buttonbar-color': 'rgba(235, 94, 47, 0.84)',
        'buttonbar-active-text-color': '#fff',

        // List
        'list-background-color': '#fff',
        'list-header-background-color': '#eee',
        'list-tap-active-background-color': '#d9d9d9',

        // Tabbar
        'tabbar-background-color': '#fff',
        'tabbar-text-color': '#ccc',
        'tabbar-highlight-text-color': '#eb5e2f',
        'tabbar-border-color': '#ddd',

        // Switch
        'switch-highlight-color': '#e69e33',

        // Modal
        'modal-background-color': 'rgba(0, 0, 0, 0.7)',
        'modal-text-color': '#fff',

        // Alert Dialog
        'alert-dialog-background-color': '#f4f4f4',
        'alert-dialog-text-color': '#1f1f21',
        'alert-dialog-button-color': '#eb482f',
        'alert-dialog-separator-color': '#ddd',

        // Dialog
        'dialog-background-color': '#f4f4f4',

        // Popover
        'popover-background-color': 'white',
        'popover-text-color': '#1f1f21',

        // Notification
        'notification-background-color': '#eb5e2f',

        // Material Switch
        'material-switch-active-thumb-color': '#009688',
        'material-switch-inactive-thumb-color': '#f1f1f1',
        'material-switch-active-background-color': '#77c2bb',
        'material-switch-inactive-background-color': '#b0afaf',

        // Material Range
        'material-range-track-color': '#e0e0e0',
        'material-range-thumb-color': '#009688',

        // Material Toolbar
        'material-toolbar-background-color': '#009688',
        'material-toolbar-text-color': '#ffffff',
        'material-toolbar-button-color': '#ffffff',
        'material-toolbar-button-active-color': '#26a69a',

        // Material Button
        'material-button-background-color': '#009688',
        'material-button-text-color': '#ffffff',

        // Material Checkbox
        'material-checkbox-active-color': '#009688',
        'material-checkbox-inactive-color': '#717171',
        'material-checkbox-checkmark-color': '#ffffff',

        // Material Radio Button
        'material-radio-button-active-color': '#009688',
        'material-radio-button-inactive-color': '#717171',

        // Material Text Input
        'material-text-input-text-color': '#212121',
        'material-text-input-active-color': '#009688',
        'material-text-input-inactive-color': '#afafaf',

        // Material Dialog
        'material-dialog-background-color': '#ffffff',

        // Material Alert Dialog
        'material-alert-dialog-background-color': '#ffffff',
        'material-alert-dialog-title-color': '#212121',
        'material-alert-dialog-content-color': '#727272',
        'material-alert-dialog-button-color': '#009688',

        // Material Progress
        'material-progress-bar-primary-color': '#009688',
        'material-progress-bar-secondary-color': '#80cbc4',
        'material-progress-bar-background-color': '#e0e0e0',
        'material-progress-circle-primary-color': '#009688',
        'material-progress-circle-secondary-color': '#80cbc4',

        // Material Tabbar
        'material-tabbar-background-color': '#009688',
        'material-tabbar-text-color': 'rgba(255, 255, 255, 0.6)',
        'material-tabbar-highlight-text-color': '#ffffff',
        'material-tabbar-highlight-color': '#26a69a',

        // Floating Action Button
        'fab-text-color': '#ffffff',
        'fab-background-color': '#009688'
      }
    },

    {
      text: 'purple',
      colors: {
        // Global
        'background-color': '#f3f3f3',
        'material-background-color': '#ffffff',
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

        // Alert Dialog
        'alert-dialog-background-color': '#f4f4f4',
        'alert-dialog-text-color': '#1f1f21',
        'alert-dialog-button-color': '#574bdb',
        'alert-dialog-separator-color': '#ddd',

        // Dialog
        'dialog-background-color': '#f4f4f4',

        // Popover
        'popover-background-color': 'white',
        'popover-text-color': '#1f1f21',

        // Notification
        'notification-background-color': '#dc5236',

        // Material Switch
        'material-switch-active-thumb-color': '#009688',
        'material-switch-inactive-thumb-color': '#f1f1f1',
        'material-switch-active-background-color': '#77c2bb',
        'material-switch-inactive-background-color': '#b0afaf',

        // Material Range
        'material-range-track-color': '#e0e0e0',
        'material-range-thumb-color': '#009688',

        // Material Toolbar
        'material-toolbar-background-color': '#009688',
        'material-toolbar-text-color': '#ffffff',
        'material-toolbar-button-color': '#ffffff',
        'material-toolbar-button-active-color': '#26a69a',

        // Material Button
        'material-button-background-color': '#009688',
        'material-button-text-color': '#ffffff',

        // Material Checkbox
        'material-checkbox-active-color': '#009688',
        'material-checkbox-inactive-color': '#717171',
        'material-checkbox-checkmark-color': '#ffffff',

        // Material Radio Button
        'material-radio-button-active-color': '#009688',
        'material-radio-button-inactive-color': '#717171',

        // Material Text Input
        'material-text-input-text-color': '#212121',
        'material-text-input-active-color': '#009688',
        'material-text-input-inactive-color': '#afafaf',

        // Material Dialog
        'material-dialog-background-color': '#ffffff',

        // Material Alert Dialog
        'material-alert-dialog-background-color': '#ffffff',
        'material-alert-dialog-title-color': '#212121',
        'material-alert-dialog-content-color': '#727272',
        'material-alert-dialog-button-color': '#009688',

        // Material Progress
        'material-progress-bar-primary-color': '#009688',
        'material-progress-bar-secondary-color': '#80cbc4',
        'material-progress-bar-background-color': '#e0e0e0',
        'material-progress-circle-primary-color': '#009688',
        'material-progress-circle-secondary-color': '#80cbc4',

        // Material Tabbar
        'material-tabbar-background-color': '#009688',
        'material-tabbar-text-color': 'rgba(255, 255, 255, 0.6)',
        'material-tabbar-highlight-text-color': '#ffffff',
        'material-tabbar-highlight-color': '#26a69a',

        // Floating Action Button
        'fab-text-color': '#ffffff',
        'fab-background-color': '#009688'
      }
    }
  ];

})(typeof exports === 'undefined' ? this['theme'] = {} : exports);
