'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss', function(){
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
});

gulp.task('watch', function(){
    gulp.watch('scss/*.scss', gulp.series('scss'));
});