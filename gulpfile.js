var gulp  = require('gulp');
var path  = require('path');
var glob  = require('glob');

// LESS Compile, Media Queries combine, delete unused CSS and CSS minification
var less      = require('gulp-less');
var gcmq      = require('gulp-group-css-media-queries');
var uncss     = require('gulp-uncss');
var minifyCSS = require('gulp-minify-css');
gulp.task('css', function () {
  gulp.src('./front/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ],
      filename: 'main.less',
      ru: true
    }))
    .pipe(gcmq())
    .pipe(uncss({
      html: glob.sync('./front/**/*.html')
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));
});

// AngularJS Template Cache
var templateCache = require('gulp-angular-templatecache');
gulp.task('template-cache', function () {
  gulp.src(['./front/views/*.html', './front/partials/*.html'])
    .pipe(templateCache({ standalone: true, module: 'HTMLTemplates' }))
    .pipe(gulp.dest('./front/modules/templates'));
});

// HTML Minify
var minifyHTML    = require('gulp-minify-html');
gulp.task('minify-html', function() {
  gulp.src('./front/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./public'))
});

// JS Concatenation and Minification
var concat = require('gulp-concat');
var jsmin  = require('gulp-jsmin');
gulp.task('js', function() {
  gulp.src('./front/**/**/*.js')
    .pipe(concat('main.js'))
    //.pipe(jsmin())
    .pipe(gulp.dest('./public/js'));
});

// Watch
var watch  = require('gulp-watch');
gulp.task('watch', function() {
  gulp.watch(['./front/less/**/*.less'], ['css']);
  gulp.watch(['./front/**/*.html'], ['template-cache', 'css', 'minify-html']);
  gulp.watch(['./front/**/**/*.js'], ['js']);
});

// Default
gulp.task('default', ['css', 'template-cache', 'js', 'minify-html', 'watch']);
