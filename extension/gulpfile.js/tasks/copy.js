var gulp = require('gulp');
gulp.task('copy', function() {
        gulp.src('src/fonts/**')
                .pipe(gulp.dest('build/fonts'));
        gulp.src('src/icons/**')
                .pipe(gulp.dest('build/icons'));
        gulp.src('src/_locales/**')
                .pipe(gulp.dest('build/_locales'));
        return gulp.src('src/manifest.json')
                .pipe(gulp.dest('build'));
});
