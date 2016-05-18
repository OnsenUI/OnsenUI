require('babel-register');

exports.config = {
  seleniumServerJar: require('selenium-server-standalone-jar').path,
  chromeDriver: __dirname + '/node_modules/chromedriver/bin/chromedriver',
  specs: ['examples/*.spec.js'],
  directConnect: true,
  baseUrl: 'http://localhost:9090/',
  useAllAngular2AppRoots: true,
  capabilities: {
    'browserName': 'chrome'
  }
};
