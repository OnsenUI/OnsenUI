exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },
  seleniumServerJar: './.selenium/selenium-server-standalone-2.45.0.jar',  
  chromeDriver: './.selenium/chromedriver',
  framework: 'jasmine',
  specs: ['test/e2e/**/*.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
