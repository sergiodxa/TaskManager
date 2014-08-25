var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    jsmin       = require('gulp-jsmin'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch');

gulp.task('minify', function () {
  gulp.src(['public/controllers/**/*.js','public/services/*.js','public/directives/*.js','public/app.js'])
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('public/minified'));
});

gulp.task('merge', function () {
  gulp.src(['./public/vendor/jquery/dist/jquery.min.js',
           './public/vendor/bootstrap/dist/js/bootstrap.min.js',
           './public/vendor/angular/angular.min.js',
           './public/vendor/angular-route/angular-route.min.js',
           './public/minified/app.min.js',
           './public/minified/ClientService.min.js',
           './public/minified/EncryptorService.js',
           './public/minified/GitHubService.js',
           './public/minified/ProjectService.min.js',
           './public/minified/SocketService.min.js',
           './public/minified/TaskService.min.js',
           './public/minified/UserService.min.js',
           './public/minified/**/*.min.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('public/dist'));
});
