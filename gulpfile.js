var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    jasmine     = require('gulp-jasmine'),
    jsmin       = require('gulp-jsmin'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch');
    concat      = require('gulp-concat');

gulp.task('minify', function(callback) {
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
      .pipe(gulp.dest('front/minified'));
});

gulp.task('minify services', function () {
  gulp.src('front/services/*.js')
      .pipe(watch())
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('front/minified'));
});

gulp.task('minify app', function () {
  gulp.src('front/app.js')
      .pipe(watch())
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('front/minified'));
});

gulp.task('jasmine tests', function () {
    gulp.src('spec/*.spec.js')
        .pipe(watch())
        .pipe(jasmine());
});

gulp.task('merge', function () {
  gulp.src(['./front/vendor/jquery/dist/jquery.min.js',
           './front/vendor/bootstrap/dist/js/bootstrap.min.js',
           './front/vendor/angular/angular.min.js',
           './front/vendor/angular-route/angular-route.min.js',
           './front/minified/app.min.js',
           './front/minified/ClientService.min.js',
           './front/minified/ProjectService.min.js',
           './front/minified/TaskService.min.js',
           './front/minified/UserService.min.js',
           './front/minified/**/*.min.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('front/dist'));
});