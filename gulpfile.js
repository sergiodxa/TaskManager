var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    jsmin       = require('gulp-jsmin'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch');

gulp.task('minify', function () {
  gulp.src(['front/controllers/**/*.js','front/services/*.js','front/app.js'])
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('front/minified'));
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
