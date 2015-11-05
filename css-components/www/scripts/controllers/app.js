'use strict';

angular.module('app').controller('AppController',
  function($scope, $location, $http, $rootScope, ColorSchemeFactory,
    GeneratedCss, ComponentCollection, Colors2URL,
    ClipboardClients, Dialog, ComponentDialog, SimpleColorCustomizer) {

  $scope.colorCustomizer = SimpleColorCustomizer;

  $scope.componentDialog = ComponentDialog;
  ComponentDialog.onShow = initEditors;

  $scope.createDialog = function () {
    return new Dialog();
  };

  $scope.$on('ComponentCollection:changed', function() {
    if (!$scope.components || $scope.components.length <= 0) {
      $scope.components = ComponentCollection.all();
    } else {
      $scope.components.forEach(function(component, i) {
        component.css = ComponentCollection.all()[i].css;
      });
    }

    if (GeneratedCss.css) {
      var body = $(window.document.body);

      body.addClass('no-transition');
      $('#generated-css-placeholder')[0].href = GeneratedCss.getObjectURL();
      setTimeout(function() {
        body.removeClass('no-transition');
      }, 300);
    }
  });
  $scope.$emit('ComponentCollection:changed');

  $scope.colorPicker = {
    target : null,
    isShown : false,
    show : function($event) {
      this.target = $event.currentTarget;
      this.isShown = true;
      ga('send', 'event', 'color', 'openColorPicker');
    }
  };

  // color changed from color picker
  $scope.colorChanged = function(color) {
    var variableName = $($scope.colorPicker.target).attr('data-variable-name');
    schemeSwitcher.current.setColor(variableName, color);
  }.bind(this);

  var schemeSwitcher = {
    current: ColorSchemeFactory.getSchemes()[0],
    schemes: ColorSchemeFactory.getSchemes()
  };

  function setColors(colors) {
    GeneratedCss.setColors(colors);
    $scope.colorCustomizer.setColors(colors);
  }

  $scope.setColorScheme = function(colorScheme) {
    setColors(colorScheme.getColors());
    ga('send', 'event', 'color', 'setColorScheme', colorScheme.text);
  };

  $scope.colorSchemeSwitcher = schemeSwitcher;

  $scope.guide = {
    index: 0,
    start: function() {
      ga('send', 'event', 'guide', 'start');
      this.index = 1;
    },
    next: function() {
      this.index++;
      ga('send', 'event', 'guide', 'next', 'index', this.index);
    },
    hide: function() {
      ga('send', 'event', 'guide', 'close', 'index', this.index);
      this.index = 0;
    }
  };

  $scope.location = $location;
  $scope.inspector = {
    isShown: false,
    show: function() {
      this.isShown = true;
    },
    hide: function() {
      this.isShown = false;
    },
    showComponentDialog: function(component) {
      if (this.isShown) {
        initEditors();
        $scope.componentDialog.show(component);
      }
    }
  };

  $scope.htmlDialog = (function(dialog) {
    dialog.popup = function() {
      var self = this;
      var x = screen.width/2 - 320/2;
      var y = screen.height/2 - 540/2;
      window.open(self.url, 'htmlView', 'width=320,height=540,top=' + x + ',left=' + y);
      ga('send', 'event', 'dialog', 'htmlPopup', self.url);
    };

    dialog.show = function(url) {
      var self = this;
      this.url = url;

      var cssURL = url.replace('.html', '.css');
      $http.get(cssURL).then(function(response){
        window.cssDialogEditor.setValue(response.data);
        window.cssEditor.refresh();
      }, function() {
        window.cssDialogEditor.setValue('');
        window.cssEditor.refresh();
      });

      $http.get(url).then(function(response) {
        window.htmlDialogEditor.setValue(response.data);
        window.htmlEditor.refresh();

        setTimeout(function() {
          window.htmlDialogEditor.refresh();
          window.cssDialogEditor.refresh();
        }, 400);

        Dialog.prototype.show.apply(self, []);
        ga('send', 'event', 'dialog', 'htmlDialog', url);
      });
    };

    return dialog;
  })(new Dialog());

  $scope.thankyouDialog = (function(dialog) {
    var show = dialog.show;

    dialog.show = function() {
      var colors = $scope.colorSchemeSwitcher.current.getColors();
      var downloadURL = Colors2URL.toDownloadURL(colors);
      dialog.downloadURL = downloadURL;

      $('#download-link').attr('href', downloadURL);
      setTimeout(function(){
        $('#download-iframe').attr('src', downloadURL);
      }, 5000);
      show.apply(this, []);
      ga('send', 'event', 'dialog', 'thankyouDialog');
    };

    dialog.email = '';
    dialog.emailSent = false;

    dialog.sendEmail = function() {
      var email = dialog.email;

      $.post('https://monaca.mobi/ja/api/email/e458bcbcc4', {email: email})
        .done(function(data) {
          var ret = JSON.parse(data);
          if (ret.status !== undefined && ret.status === 'success') {
            dialog.emailSent = true;
            $scope.$apply();
            ga('send', 'event', 'newsletter', 'send');
          } else {
            alert('Something wrong with the request. Sorry.');
          }
        });
      return false;
    };

    return dialog;
  })($scope.createDialog());

  $scope.newsletterPopup = (function(popup) {

    popup.emailSent = false;
    popup.email = '';

    popup.sendEmail = function() {
      window.localStorage.setItem('isEntered', 1);
      var email = $scope.newsletterPopup.email;

      $.post('https://monaca.mobi/ja/api/email/e458bcbcc4', {email: email})
        .done(function(data) {
          var ret = JSON.parse(data);
          if (ret.status !== undefined && ret.status === 'success') {
            $scope.newsletterPopup.emailSent = true;
            $scope.$apply();
            ga('send', 'event', 'newsletter', 'send');
          } else {
            alert('Something wrong with the request. Sorry.');
          }
        });
    };

    return popup;
  })(new Dialog());


  $scope.patterns = [
    {name: 'md_inbox', displayName: 'Material Inbox'},
    {name: 'md_contact', displayName: 'Material Contact Details'},
    {name: 'md_contact_list', displayName: 'Material Contact List'},
    {name: 'details', displayName: 'Shop Details'},
    {name: 'profile', displayName: 'Profile'},
    {name: 'timeline', displayName: 'Timeline'},
    {name: 'schedule', displayName: 'Schedule'},
    {name: 'people', displayName: 'People'},
    {name: 'settings', displayName: 'Settings'},
    {name: 'sliding_menu', displayName: 'Sliding Menu'},
    {name: 'compose', displayName: 'New Message'},
    {name: 'login', displayName: 'Login'},
    {name: 'signup', displayName: 'Signup' },
    {name: 'list_avatars', displayName: 'List with Mini Pictures'},
    {name: 'list_thumbnails', displayName: 'List with Pictures'},
    {name: 'list_with_header', displayName: 'List With Header'},
    {name: 'list_icons' , displayName: 'List Icons'},
    {name: 'range', displayName: 'Ranges'},
    {name: 'checkbox_list', displayName: 'Checkboxes'},
    {name: 'radiobutton_list', displayName: 'Radio Buttons'}
  ];

  setTimeout(function() {
    var isAccessed = window.localStorage.getItem('isAccessed');
    if (!isAccessed) {
      window.localStorage.setItem('isAccessed', 1);
    } else {
      if (!window.IS_DEV) {
        $scope.showNewsletterPopup();
      }
    }
  }, 1000);

  $scope.showNewsletterPopup = function() {
    var isEntered = window.localStorage.getItem('isEntered');
    if (!isEntered && !window.IS_DEV) {
      setTimeout(function() {
        $scope.newsletterPopup.show();
        $scope.$apply();
      }, 30000);
    }
  };

  var initialized = false;
  function initEditors() {
    if (!initialized) {
      initialized = true;

      window.htmlEditor.on('change', function() {
        ComponentDialog.html = window.htmlEditor.getValue();
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

      window.cssEditor.on('change', function() {
        ComponentDialog.css = window.cssEditor.getValue();
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });
    }
  }

  var urlSearch = $location.search();
  if (schemeSwitcher.current.isAcceptableColors(urlSearch)) {
    setColors(urlSearch);
    schemeSwitcher.current.setColors(urlSearch);
  } else {
    setColors(schemeSwitcher.current.colors);
  }
});
