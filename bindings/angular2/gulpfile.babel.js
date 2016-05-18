import gulp from 'gulp';
import shell from 'gulp-shell';
import WebpackDevServer from 'webpack-dev-server';
import childProcess from 'child_process';
import open from 'open';

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
  
gulp.task('test', ['test-e2e']);

gulp.task('test-e2e', done => {
  const server = createDevServer({quiet: true});

  server.listen(9090, '0.0.0.0', () => {
    setTimeout(() => {
      childProcess.spawn('./node_modules/.bin/protractor', ['protractor-conf.js'], {
        stdio: 'inherit'
      }).once('exit', code => {
        server.close();
        process.exit(code);
      });
    }, 8000);
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
