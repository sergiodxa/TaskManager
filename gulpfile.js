var gulp   = require('gulp'),
    runSequence = require('run-sequence'),
    jasmine = require('gulp-jasmine'),
    jsmin  = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    watch  = require('gulp-watch');

gulp.task('build', function(callback) {
  runSequence('minify controllers',
              'minify services',
              'minify app',
              callback);
});

gulp.task('minify controllers', function () {
  gulp.src('front/controllers/**/*.js')
      .pipe(watch())
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('front/dist'));
});

gulp.task('minify services', function () {
  gulp.src('front/services/*.js')
      .pipe(watch())
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('front/dist'));
});

gulp.task('minify app', function () {
  gulp.src('front/app.js')
      .pipe(watch())
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('front/dist'));
});

gulp.task('jasmine tests', function () {
    gulp.src('spec/*.spec.js')
        .pipe(watch())
        .pipe(jasmine());
});
