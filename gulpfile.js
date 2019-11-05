'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('scss', function(){
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
});

gulp.task('javascript', function(){
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
    gulp.watch(['scss/*.scss', 'js/*.js'], gulp.series('scss', 'javascript'));
});