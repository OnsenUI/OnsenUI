import gulp from 'gulp';
import shell from 'gulp-shell';
import WebpackDevServer from 'webpack-dev-server';
import childProcess from 'child_process';
import open from 'open';
import yargs from 'yargs';

const FLAGS = `--inline --colors --progress --display-error-details --display-cached`;

gulp.task('build', shell.task(`
  webpack ${FLAGS}
`));

gulp.task('serve', done => {
  createDevServer().listen('3030', '0.0.0.0', () => {
    open('http://0.0.0.0:3030/bindings/angular2/examples/button.html');
    done();
  });
});
  
gulp.task('test', ['e2e-test']);

gulp.task('e2e-test', done => {
  const server = createDevServer({quiet: true});

  server.listen(9090, '0.0.0.0', () => {
    runProtractor().then(code => {
      server.close();
      server.listeningApp.close();
      if (code !== 0) {
        process.exit(code);
      }
      done();
    });
  });
});

function createDevServer(options = {}) {
  const config = require('./webpack.config.js');
  const serverConfig = Object.assign(options, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
  }, config.devServer);
  const server = new WebpackDevServer(require('webpack')(config), serverConfig);

  return server;
}

function runProtractor() {
  const args = ['protractor-conf.js'];

  if (yargs.argv.specs) {
    args.push('--specs');
    args.push(yargs.argv.specs);
  }

  return new Promise(resolve => {
      childProcess.spawn('./node_modules/.bin/protractor', args, {
        stdio: 'inherit'
      }).once('exit', code => {
        resolve(code);
      });
  });
}
