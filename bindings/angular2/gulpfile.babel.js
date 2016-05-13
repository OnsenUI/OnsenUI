import gulp from 'gulp';
import shell from 'gulp-shell';
import WebpackDevServer from 'webpack-dev-server';
import childProcess from 'child_process';

const FLAGS = `--inline --colors --progress --display-error-details --display-cached`;
let e2eDevServer;

gulp.task('build', shell.task(`
  webpack ${FLAGS}
`));

gulp.task('watch', shell.task(`
  webpack ${FLAGS} --watch
`));

gulp.task('serve', shell.task(`
  webpack-dev-server ${FLAGS} --port 3030
`));

gulp.task('test-e2e', done => {
  const config = require('./webpack.config.js');
  const serverConfig = Object.assign({
    publicPath: config.output.publicPath,
    stats: {colors: true}
  }, config.devServer);
  const server = new WebpackDevServer(require('webpack')(config), serverConfig);

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

