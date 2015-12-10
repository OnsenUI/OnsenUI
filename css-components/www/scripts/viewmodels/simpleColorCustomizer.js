'use strict';

angular.module('app').factory('SimpleColorCustomizer', function(ColorCustomizer) {
  var groups = [
    {
      name: 'Global',
      items: [
        {
          name: 'background-color',
          displayName: 'Background Color'
        },

        {
          name: 'text-color',
          displayName: 'Text Color'
        },

        {
          name: 'sub-text-color',
          displayName: 'Subtext Color'
        },

        {
          name: 'highlight-color',
          displayName: 'Highlight Color'
        },

        {
          name: 'second-highlight-color',
          displayName: 'Second Highlight Color'
        },

        {
          name: 'border-color',
          displayName: 'Border Color'
        }
      ]
    },

    {
      name: 'Flat Toolbar',
      items: [
        {
          name: 'toolbar-background-color',
          displayName: 'Background Color'
        },

        {
          name: 'toolbar-text-color',
          displayName: 'Text Color'
        },

        {
          name: 'toolbar-button-color',
          displayName: 'Button Color'
        },

        {
          name: 'toolbar-border-color',
          displayName: 'Border Color'
        }
      ]
    },

    {
      name: 'Material Toolbar',
      items: [
        {
          name: 'material-toolbar-background-color',
          displayName: 'Background Color'
        },

        {
          name: 'material-toolbar-text-color',
          displayName: 'Text Color'
        },

        {
          name: 'material-toolbar-button-color',
          displayName: 'Button Color'
        },

        {
          name: 'material-toolbar-button-active-color',
          displayName: 'Active Button Background Color'
        }
      ]
    },

    {
      name: 'Material Button',
      items: [
        {
          name: 'material-button-background-color',
          displayName: 'Background Color'
        },

        {
          name: 'material-button-text-color',
          displayName: 'Text Color'
        }
      ]
    },

    {
      name: 'Material Checkbox',
      items: [
        {
          name: 'material-checkbox-active-color',
          displayName: 'Active Color'
        },

        {
          name: 'material-checkbox-inactive-color',
          displayName: 'Inactive Color'
        },

        {
          name: 'material-checkbox-checkmark-color',
          displayName: 'Checkmark Color'
        }
      ]
    },

    {
      name: 'Material Radio Button',
      items: [
        {
          name: 'material-radio-button-active-color',
          displayName: 'Active Color'
        },

        {
          name: 'material-radio-button-inactive-color',
          displayName: 'Inactive Color'
        }
      ]
    },

    {
      name: 'Material Input',
      items: [
        {
          name: 'material-text-input-text-color',
          displayName: 'Text Color'
        },
        {
          name: 'material-text-input-active-color',
          displayName: 'Active Color'
        },
        {
          name: 'material-text-input-inactive-color',
          displayName: 'Inactive Color'
        }
      ]
    },

    {
      name: 'Button Bar',
      items: [
        {
          name: 'buttonbar-color',
          displayName: 'Color'
        },
        {
          name: 'buttonbar-active-text-color',
          displayName: 'Active Text Color'
        }
      ]
    },

    {
      name: 'List',
      items: [
        {
          name: 'list-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'list-tap-active-background-color',
          displayName: 'Active Background Color'
        },
        {
          name: 'list-header-background-color',
          displayName: 'Header Background Color'
        }
      ]
    },

    {
      name: 'Tabbar',
      items: [
        {
          name: 'tabbar-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'tabbar-text-color',
          displayName: 'Text Color'
        },
        {
          name: 'tabbar-highlight-text-color',
          displayName: 'Highlight Text Color'
        },
        {
          name: 'tabbar-border-color',
          displayName: 'Border Color'
        }
      ]
    },

    {
      name: 'Modal',
      items: [
        {
          name: 'modal-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'modal-text-color',
          displayName: 'Text Color'
        }
      ]
    },

    {
      name: 'Flat Alert Dialog',
      items: [
        {
          name: 'alert-dialog-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'alert-dialog-text-color',
          displayName: 'Text Color'
        },
        {
          name: 'alert-dialog-button-color',
          displayName: 'Button Text Color'
        },
        {
          name: 'alert-dialog-separator-color',
          displayName: 'Separator Color'
        }
      ]
    },

    {
      name: 'Material Alert Dialog',
      items: [
        {
          name: 'material-alert-dialog-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'material-alert-dialog-title-color',
          displayName: 'Title Color'
        },
        {
          name: 'material-alert-dialog-content-color',
          displayName: 'Content Color'
        },
        {
          name: 'material-alert-dialog-button-color',
          displayName: 'Button Text Color'
        }
      ]
    },

    {
      name: 'Flat Dialog',
      items: [
        {
          name: 'dialog-background-color',
          displayName: 'Background Color'
        }
      ]
    },

    {
      name: 'Material Dialog',
      items: [
        {
          name: 'material-dialog-background-color',
          displayName: 'Background Color'
        }
      ]
    },

    {
      name: 'Popover',
      items: [
        {
          name: 'popover-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'popover-text-color',
          displayName: 'Text Color'
        }
      ]
    },

    {
      name: 'Flat Switch',
      items: [
        {
          name: 'switch-highlight-color',
          displayName: 'Highlight Color'
        }
      ]
    },
    {
      name: 'Material Switch',
      items: [
        {
          name: 'material-switch-active-thumb-color',
          displayName: 'Active Thumb Color'
        },
        {
          name: 'material-switch-inactive-thumb-color',
          displayName: 'Inactive Thumb Color'
        },
        {
          name: 'material-switch-active-background-color',
          displayName: 'Active Background Color'
        },
        {
          name: 'material-switch-inactive-background-color',
          displayName: 'Inactive Background Color'
        },
      ]
    },
    {
      name: 'Material Range',
      items: [
        {
          name: 'material-range-thumb-color',
          displayName: 'Thumb Color'
        },
        {
          name: 'material-range-track-color',
          displayName: 'Track Color'
        }
      ]
    },
    {
      name: 'Progress Bar',
      items: [
        {
          name: 'material-progress-bar-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'material-progress-bar-primary-color',
          displayName: 'Primary Color'
        },
        {
          name: 'material-progress-bar-secondary-color',
          displayName: 'Secondary Color'
        }
      ]
    },
    {
      name: 'Progress Circle',
      items: [
        {
          name: 'material-progress-circle-primary-color',
          displayName: 'Primary Color'
        },
        {
          name: 'material-progress-circle-secondary-color',
          displayName: 'Secondary Color'
        }
      ]
    },

    {
      name: 'Material Tabbar',
      items: [
        {
          name: 'material-tabbar-background-color',
          displayName: 'Background Color'
        },
        {
          name: 'material-tabbar-text-color',
          displayName: 'Text Color'
        },
        {
          name: 'material-tabbar-highlight-color',
          displayName: 'Highlight Color'
        },
        {
          name: 'material-tabbar-highlight-text-color',
          displayName: 'Highlight Text Color'
        }
      ]
    },

    {
      name: 'Floating Action Button',
      items: [
        {
          name: 'fab-text-color',
          displayName: 'Text Color'
        },
        {
          name: 'fab-background-color',
          displayName: 'Background Color'
        }

      ]
    },

    {
      name: 'Other',
      items: [
        {
          name: 'notification-background-color',
          displayName: 'Notification Background Color'
        },
      ]
    }
  ];

  var customizer = new ColorCustomizer({itemGroups: groups});

  return customizer;
});
