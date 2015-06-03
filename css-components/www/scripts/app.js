'use strict';

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'pascalprecht.translate', 'template']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      title : 'Theme Roller - Easily Customize CSS Components & Patterns',
      templateUrl: 'views/components.html'
    })
    .when('/patterns', {
      title : 'Customize Page Patterns',
      templateUrl: 'views/overview.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});

app.run(['$rootScope', '$route', function($rootScope, $route) {
  $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
    if (oldVal !== newVal) {
      document.title = $route.current.title + ' | Onsen';
    }
  });
}]);

// i18n settings

app.config(function($translateProvider) {
  $translateProvider.translations('en', {
    T_FIND_COMPONENT: 'Find Component',
    T_SHOW_HTML: 'Show Source',
    T_COMPONENT_SNIPPET: ' Component',
    T_COPY: 'Copy',
    T_PREVIEW: 'Preview',
    T_NEXT: 'Next',
    T_SHOW_IN_SEPARATE_WINDOW: 'Show in Separate Window',
    T_SUBSCRIBE_NEWSLETTER_TITLE: 'Be the first to get notified!',
    T_SUBSCRIBE_NEWSLETTER_DESC: 'Want to stay updated on Onsen UI? Sign up here to get the latest news and updates!',
    T_SEND: 'Send',
    T_SHARE_TITLE: 'Share Your Work!',
    T_SHARE_DESC: 'Share your creative ideas with the world!',
    T_DOWNLOAD_TITLE: 'Thank you for Download',
    T_DOWNLOAD_DESC: 'Get notified about new CSS components and other updates.',
    T_DOWNLOADING: 'Please wait while we are preparing your package. <br> If your download doesn\'t start automatically please <a id="download-link" target="_blank" class="click-to-download-btn" href="">click here</a>',
    T_WELCOME_TITLE: 'Welcome to Onsen CSS Components!',
    T_WELCOME_DESC: '<p>Hello! Onsen CSS Components for Mobile Apps provides many HTML/CSS patterns for building great mobile UIs.</p><p><strong>Would you like to take a Quick Tour?</strong></p>',
    T_NO_THANKS: 'No, thanks',

    T_GUIDE1_TITLE: '1. Choose Color Scheme',
    T_GUIDE1_DESC: 'Start by choosing your favorite color scheme.',
    T_GUIDE2_TITLE: '2. Make Your Own!',
    T_GUIDE2_DESC: 'Need more customization? Change individual colors here.',
    T_GUIDE3_TITLE: '3. Download Package!',
    T_GUIDE3_DESC: 'Download packages include templates with customized CSS definitions.',
    T_GUIDE4_TITLE: '4. Want to pick out a specific component?',
    T_GUIDE4_DESC: 'Use the Find Component tool to find out how the templates are structured.',
    T_GUIDE5_TITLE: '5. Components Overview',
    T_GUIDE5_DESC: 'You can see all available components from here.',
    T_TEASING_LINK: 'Use with <a href="/coming-soon/01/index.html?link=share" target="_blank">Onsen UI</a> for even better development!'
  });

  $translateProvider.translations('ja', {
    '<a href="https://github.com/OnsenUI/onsen-css-components/wiki/tform.twitter.com/widgets/tweet_button.html?text=Checkout Onsen CSS Component! Beautiful CSS for your App"Requesting-pattern-or-component" target="_blank">Request</a> new components': '新しいパターンやコンポーネントを<a href="https://github.com/OnsenUI/onsen-css-components/wiki/Requesting-pattern-or-component" target="_blank">リクエスト</a>',
    'Guide': 'ガイド',
    'Patterns': 'パターン',
    'CSS Components': 'CSSコンポーネント',
    'Keep Me Updated': 'Onsen UI ニュースレター',

    T_COMPONENT_SNIPPET: 'コンポーネント',
    T_COPY: 'コピー',
    T_TEASING_LINK: '<a target="_blank" href="/coming-soon/01/index.html?link=share" target="_blank">Onsen UI</a>で最高のHTML5アプリ開発を体験しませんか？</a>',
    T_PREVIEW: 'プレビュー',
    T_SHOW_IN_SEPARATE_WINDOW: '別のウィンドウで開く',
    T_SUBSCRIBE_NEWSLETTER_TITLE: 'Onsen UIニュースレター',
    T_SUBSCRIBE_NEWSLETTER_DESC: 'Onsen UIの最新の更新情報をお届けします。',
    T_SEND: '送信する',
    T_SHARE_TITLE: 'あなたのカラーを共有しよう！',
    T_SHARE_DESC: 'カスタマイズした定義を、世界中のユーザーに共有しよう。',
    T_DOWNLOAD_TITLE: 'ダウンロードありがとうございます。',
    T_DOWNLOADING: '数秒後ダウンロードが自動的に開始されます...<br>自動的に開始されない場合は、こちらを<a id="download-link" target="_blank" class="click-to-download-btn" href="">クリック</a>して下さい。',
    T_DOWNLOAD_DESC: '是非、あなたのメールアドレスを登録して下さい。',
    T_WELCOME_TITLE: 'Onsen CSS Componentsへようこそ！',
    T_WELCOME_DESC: '<p>こんにちは！本サイトはHTML5でモバイルアプリを開発するためのパターン集を提供しています。</p></p>クイックツアーを表示しますか？</p>',
    T_NO_THANKS: 'やめておく',

    T_NEXT: '次へ',
    T_GUIDE1_TITLE: '1. カラースキーマを選択する',
    T_GUIDE1_DESC: '好きなカラースキーマを見つけましょう。',
    T_GUIDE2_TITLE: '2. 個別のカラーを変更する',
    T_GUIDE2_DESC: 'もっとカスタマイズが必要ですか？その場合は、こちらから変更できます。',
    T_GUIDE3_TITLE: '3. ダウンロードする',
    T_GUIDE3_DESC: 'カスタマイズが終わったら、一式をダウンロードできます。',
    T_GUIDE4_TITLE: '4. 欲しいコンポーネントを見つける',
    T_GUIDE4_DESC: 'インスペクターを使って、欲しいコンポーネントを取り出せます。',
    T_GUIDE5_TITLE: '5. コンポーネントの一覧も',
    T_GUIDE5_DESC: '全コンポーネントのHTMLとCSSはこちらから。',

    'Global': 'グローバル',
    'Toolbar': 'ツールバー',
    'Button Bar': 'ボタンバー',
    'List': 'リスト',
    'Other': 'その他'
  });

  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage('en');
});

/*
// Manual locale setting for debug.
app.run(function($translate) {
  $translate.use('ja');
});
*/
