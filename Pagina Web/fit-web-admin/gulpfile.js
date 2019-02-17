const gulp         = require("gulp");
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('default', () => {
  const cdn = '//admin-cdn.tsq.me/';
  const fs = require("fs");
  const htmlfilename = './dist/index.html';
  let htmlbuf = fs.readFileSync(htmlfilename, 'utf8');
  htmlbuf = htmlbuf.replace(/href="/ig, `href="${cdn}`).replace(/src="/ig, `src="${cdn}`);
  fs.writeFileSync(htmlfilename, htmlbuf);
  return gulp.src('./dist/*.css')
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./dist'));
});