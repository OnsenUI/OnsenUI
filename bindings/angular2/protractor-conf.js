require('babel-register');

exports.config = {
  seleniumServerJar: require('selenium-server-standalone-jar').path,
  chromeDriver: 'node_modules/chromedriver/bin/chromedriver',
  specs: [__dirname + '/examples/*.spec.js'],
  directConnect: true,
  baseUrl: 'http://localhost:9090/',
  useAllAngular2AppRoots: true,
  capabilities: {
    'browserName': 'chrome'
  }
};
