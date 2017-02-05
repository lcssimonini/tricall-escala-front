var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();

gulp.task('minify-js', function () {
    return gulp.src('app/src/js/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('serve', function () {

    browserSync.init({
        server: "app"
    });

    gulp.watch('app/src/js/*.js', ['minify-js', function () {
        browserSync.reload();
    }]);

    gulp.watch([
        'app/pages/*.html',
        'app/index.html'
    ], function () {
        browserSync.reload();
    });

});

gulp.task('build', ['serve']);