var gulp = require('gulp');
var zip = require('gulp-zip');
//build ditributable and sourcemaps after other tasks completed
gulp.task('zip', ['markup', 'browserify', 'sass', 'copy'], function() {
  var manifest = require('./../../src/manifest'),
    distFileName = manifest.name + ' v' + manifest.version + '.zip',
    mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';
  //collect all source maps
  gulp.src('build/scripts/**/*.map')
  .pipe(zip(mapFileName))
  .pipe(gulp.dest('dist'));
  //build distributable extension
  return gulp.src(['build/**', '!build/scripts/**/*.map'])
  .pipe(zip(distFileName))
  .pipe(gulp.dest('dist'));
});
