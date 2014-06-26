var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    jsmin       = require('gulp-jsmin'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch');

gulp.task('minify', function () {
<<<<<<< HEAD
  gulp.src(['app/controllers/**/*.js','app/services/*.js','app/app.js'])
=======
  gulp.src(['front/controllers/**/*.js','front/services/*.js','front/app.js'])
      .pipe(watch())
>>>>>>> parent of c2772b2... corregido error al obtener datos de un modelo dentro de otro cuando había un desfasaje en la cantidad de filas con los id de cada una y que impedía que funcionara bien el obtener ciertos datos
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('app/minified'));
});

gulp.task('merge', function () {
  gulp.src(['./app/vendor/jquery/dist/jquery.min.js',
           './app/vendor/bootstrap/dist/js/bootstrap.min.js',
           './app/vendor/angular/angular.min.js',
           './app/vendor/angular-route/angular-route.min.js',
           './app/minified/app.min.js',
           './app/minified/ClientService.min.js',
           './app/minified/EncryptorService.js',
           './app/minified/ProjectService.min.js',
           './app/minified/TaskService.min.js',
           './app/minified/UserService.min.js',
           './app/minified/**/*.min.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('app/dist'));
});
