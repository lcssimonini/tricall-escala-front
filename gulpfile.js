var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function () {

    browserSync.init({
        server: "app"
    });

    gulp.watch('app/pages/*.html', function () {
        browserSync.reload();
    });

    gulp.watch('app/index.html', function () {
        browserSync.reload();
    });

});

gulp.task('build', ['serve']);