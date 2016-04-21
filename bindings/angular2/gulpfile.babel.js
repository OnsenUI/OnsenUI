import gulp from 'gulp';
import shell from 'gulp-shell';

const flags = `--inline --colors --progress --display-error-details --display-cached`;

gulp.task('build', shell.task(`
  webpack ${flags}
`));

gulp.task('watch', shell.task(`
  webpack ${flags} --watch
`));

gulp.task('serve', shell.task(`
  webpack-dev-server ${flags} --port 3030
`));

