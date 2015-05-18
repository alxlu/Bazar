var dest = './build';
var src = './src';

module.exports = {
  sass: {
    src: src + '/styles/*.{sass,scss}',
    dest: dest + '/styles',
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      imagePath: '/images' // Used by the image-url helper
    }
  },
  lint: {
    src: src + '/scripts/bazar.js'
  },
  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },
  markup: {
    src: [src + '/htdocs/**/*.html', '!**/templates/**'],
    watch: src + '/htdocs/**/*.html',
    dest: dest,
    swig: {
      defaults: {cache: false}
    }
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/scripts/bazar.js',
      dest: dest + '/scripts',
      outputName: 'bazar.js'
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  },
  clean: {
    src: dest
  }
};
