var gulp = require('gulp');

gulp.task('default', ['sass', 'lint', 'images', 'markup', 'watch']);

gulp.task('build', ['clean'], function() {
    gulp.start('zip');
});
