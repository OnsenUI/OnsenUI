/// <reference path="onsenui.d.ts" />

function onsStatic(): void {
  ons.ready(function(): void {
    alert('Ready!');
  });
  var onsOptions: onsOptions = {
    parentScope: 'ons-page'
  };

  ons.createAlertDialog('myPage.html', onsOptions);
  ons.createDialog('myPage.html');
  ons.createPopover('myPage.html');
  ons.disableAnimations();
  ons.disableAutoStatusBarFill();
  ons.enableDeviceBackButtonHandler();
  ons.forcePlatformStyling('platform');
  ons.isReady();
  ons.isWebView();

  var options: alertOptions = {
    message: 'text message'
  };

  ons.notification.alert(options);
  ons.notification.confirm(options);
  ons.notification.prompt(options);

  var portrait: boolean = ons.orientation.isPortrait();
  var isLandscape: boolean = ons.orientation.isLandscape();
  ons.orientation.on('eventName', null);
  ons.orientation.once('eventName', null);
  ons.orientation.off('eventName', null);

  var web: boolean = ons.platform.isWebView();
  var ios: boolean = ons.platform.isIOS();
  var iPhone: boolean = ons.platform.isIPhone();
  var iPad: boolean = ons.platform.isIPad();
  var blackBerry: boolean = ons.platform.isBlackBerry();
  var opera: boolean = ons.platform.isOpera();
  var firefox: boolean = ons.platform.isFirefox();
  var safari: boolean = ons.platform.isSafari();
  var chrome: boolean = ons.platform.isChrome();
  var ie: boolean = ons.platform.isIE();
  var ios7above: boolean = ons.platform.isIOS7above();

}

function onsPage(page: OnsPageElement): void {
  page.backButtonHandler;
  page.onInfiniteScroll;
  page.data;
}

function onsCarousel(carousel: OnsCarouselElement, options?: CarouselOptions): void {
  var options: CarouselOptions = {
    animation: 'default',
    callback: Function,
    animationOptions: {}
  };

  carousel.autoScroll;
  carousel.autoScrollRatio;
  carousel.centered;
  carousel.disabled;
  carousel.first();
  carousel.getActiveIndex;
  carousel.itemCount;
  carousel.last();
  carousel.next();
  carousel.overscrollable;
  carousel.prev();
  carousel.refresh();
  carousel.setActiveIndex(6, options.animationOptions);
  carousel.swipeable;
}

function onsPullHook(pullHook: OnsPullHookElement): void {
  pullHook.disabled;
  pullHook.height;
  pullHook.pullDistance;
  pullHook.onAction();
  pullHook.state;
  pullHook.thresholdHeight;
}

function onsAlertDialog(alertDialog: OnsAlertDialogElement): void {
  var options: dialogOptions = {
    animation: 'default',
    callback: function myFunction(){}
  };
  alertDialog.cancelable;
  alertDialog.disabled;
  alertDialog.hide(options.animation);
  alertDialog.show();
}

function onsDialog(dialog: OnsDialogElement): void {
  var options: dialogOptions = {
    animation: 'default',
    callback: Function
  };

  dialog.cancelable;
  dialog.disabled;
  dialog.destroy();
  dialog.hide(options);
  dialog.show(options.animation);
}

function onsSwitch(switchVar: OnsSwitchElement): void {
  switchVar.checkbox;
  switchVar.checked;
  switchVar.disabled;
}

function onsModal(modal: OnsModalElement): void {
  var options: ModalOptions = {
    animation: 'fade',
    animationOptions: 'none'
  };

  modal.toggle();
  modal.show();
  modal.hide(options.animation);
  modal.onDeviceBackButton;
  modal.visible;
}

function onsNavigator(navigator: OnsNavigatorElement): void {
  var options: navigatorOptions = {
    animation: 'slide',
    animationOptions: "{duration: 0.2, delay: 0.4, timing: 'ease-in'}",
    refresh: true,
    callback: function myFunction() {}
  };

  var pushOptions: PushPageOptions;
  pushOptions.options.animation = 'left';

  navigator.pushPage('myPage.html', pushOptions);
  navigator.pushPage({}, pushOptions);
  navigator.pushPage(null, pushOptions);
  navigator.insertPage(2, 'myPage2.html');
  navigator.insertPage(2, {});
  navigator.popPage();
  navigator.resetToPage('myPage.html');
  navigator.resetToPage({});
  navigator.replacePage('myPage.html');
  navigator.replacePage(null);
  navigator.bringPageTop('myPage.html');
  navigator.bringPageTop('myPage.html', {});

  navigator.options.animationOptions = 'lift';
  navigator.pushPage('', pushOptions.options.animationOptions);
  navigator.pushPage('', pushOptions.options.callback);

  var replaceOptions: ReplacePageOptions;
  navigator.replacePage('', replaceOptions.options.callback);

  navigator.pushPage('', 'string');
}

function onsTabbar(tabBar: OnsTabbarElement): void {
  var options: tabbarOptions = {
    keepPage: true
  };
  tabBar.setActiveTab(2, options);
  var activeTab: number = tabBar.getActiveTabIndex();
  tabBar.loadPage('myPage.html');
  tabBar.setTabbarVisibility(true);
}

function onsPopover(popover: OnsPopoverElement): void {
  var options: popoverOptions = {
    animation: 'fade'
  }
  popover.show('#element5', options);
  popover.hide(options);

  popover.onDeviceBackButton;
  popover.cancelable;
  popover.visible;
}

function OnsSpeedDial(speedDial: OnsSpeedDialElement): void {
  speedDial.disabled;
  speedDial.hide();
  speedDial.hideItems();
  speedDial.inline;
  speedDial.show();
  speedDial.showItems();
  speedDial.toggle();
  speedDial.toggleItems();
  speedDial.visible;
}

function LazyRepeat(lazyRepeat: OnsLazyRepeatElement): void {
  lazyRepeat.refresh();
  lazyRepeat.delegate.calculateItemHeight;
  lazyRepeat.delegate.configureItemScope;
  lazyRepeat.delegate.countItems;
  lazyRepeat.delegate.createItemContent;
  lazyRepeat.delegate.destroyItem;
}

function SplitterContent(splitterContent: OnsSplitterContentElement): void {
  var options: SplitterContentOptions = {
    callback: Function
  }
  splitterContent.load('myPage.html', options);
  splitterContent.load({}, options);
  splitterContent.page;
}

function onsSplitterSide(splitterSide: OnsSplitterSideElement): void {
  splitterSide.page;
  splitterSide.mode;
  splitterSide.isOpen;

  var options: SplitterSideOptions = {
    callback: function myFunction() {}
  };

  splitterSide.open(options);
  splitterSide.close(options);
  splitterSide.toggle(options);
  splitterSide.load('string', options);

}

function onsLazyRepeat(lazyRepeat: OnsLazyRepeatElement): void {
  lazyRepeat.refresh();
  var content: HTMLElement = document.getElementById('#my-content');
  var delegate: LazyRepeatOptions = {
    createItemContent: content,
    countItems: 0,
    calculateItemHeight: 0,
    destroyItem: 'string',
    configureItemScope: 0
  };

  lazyRepeat.delegate.calculateItemHeight;
  lazyRepeat.delegate.configureItemScope;
  lazyRepeat.delegate.countItems;
  lazyRepeat.delegate.createItemContent;
  lazyRepeat.delegate.destroyItem;
}

function OnsButton(button: OnsButtonElement): void {
  button.disabled;
}

function FabElement(fab: OnsFabElement): void {
  fab.hide();
  fab.show();
  fab.toggle();
  fab.disabled;
  fab.visible;
}

function onsInput(input: OnsInputElement): void {
  input.value;
  input.checked;
  input.disabled;
}

function onsRange(range: OnsRangeElement): void {
  range.disabled;
  range.value;
}

function onsRipple(ripple: OnsRippleElement): void {
  ripple.disabled;
}

function onsSplitterContent(splitterContent: OnsSplitterContentElement): void {
  var options: SplitterContentOptions = {
    callback: function myFunction() {}
  };
  splitterContent.load('myPage.html', options);
  splitterContent.load({}, options);
}

function onsSplitter(splitter: OnsSplitterElement): void {
  splitter.left;
  splitter.right;
  splitter.content;
  splitter.onDeviceBackButton;
}

function onsBackButton(backButton: OnsBackButtonElement): void {
  var options: BackButtonOptions = {
    animation: 'string',
    animationOptions: 'string',
    callback: function myFunction() {},
    refresh: true
  };
}

function onsProgressBar(progressBar: OnsProgressBarElement): void {
  progressBar.value;
  progressBar.secondaryValue;
  progressBar.indeterminate;
}

function onsProgressCircular(progressCircular: OnsProgressCircularElement): void {
  progressCircular.value;
  progressCircular.secondaryValue;
  progressCircular.indeterminate;
}

function onsPageLoader(): void {
  const loader: ons.PageLoader = new ons.PageLoader();

  loader.load({page: 'foobar.html', parent: document.createElement('div')}, function({unload, element}) {});
  loader.internalLoader = function() {};
}
