var NwBuilder = require('node-webkit-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var swig = require('gulp-swig');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('nw', function () {
    var nw = new NwBuilder({
        version: '0.11.4',
        files: ['./package.json', './nwapp/**/**'],
        macIcns: './icons/icon.icns',
        macPlist: {mac_bundle_id: 'myPkg'},
        platforms: ['win32', 'win64', 'osx32', 'osx64']
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

var config = {
  sass: {
    src: './src/styles/*.{sass,scss}',
    dest: './nwapp/styles'
  },
  markup: {
    src: ['./src/**/*.html', '!**/templates/**'],
    watch: './src/**/*.html',
    dest: './nwapp',
    swig: {
      defaults: {cache: false}
    }
  },
  js: {
    src: './src/js/**/*.js',
    dest: './nwapp/js'
  },
  media: {
    src: './src/media/*',
    dest: './nwapp/media'
  }
};

gulp.task('media', function() {
  return gulp.src(config.media.src)
    .pipe(gulp.dest(config.media.dest));
});

gulp.task('js', ['lint'], function() {
  return gulp.src(config.js.src)
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('lint', function() {
  return gulp.src(config.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('markup', function() {
  return gulp.src(config.markup.src)
    .pipe(swig(config.markup.swig))
    .pipe(gulp.dest(config.markup.dest));
});

gulp.task('sass', function () {
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('watch', function(callback) {
  watch(config.sass.src, function() { gulp.start('sass'); });
  watch(config.js.src, function() { gulp.start('js'); });
  watch(config.markup.watch, function() { gulp.start('markup'); });
});

gulp.task('dev', ['js', 'sass', 'markup', 'media', 'watch']);
gulp.task('build', ['js', 'sass', 'markup', 'media']);

gulp.task('default', ['build'], function() {
  gulp.start('nw');
});
