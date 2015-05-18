var gulp = require('gulp');
var config = require('../config').markup
var swig = require('gulp-swig');
var cleanhtml = require('gulp-cleanhtml');

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(swig(config.swig))
    .pipe(cleanhtml())
    .pipe(gulp.dest(config.dest));
});
