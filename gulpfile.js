//imports
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var size = require('gulp-size');
var browserSync = require('browser-sync');

//Minify HTML
gulp.task('html', function(){
  return gulp.src('./app/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./build'));
})

//styles task
gulp.task('styles', function(){
  gulp.src('./app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles'));
});

//scripts task
gulp.task('scripts', function() {
  gulp.src('./app/scripts/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify().on('error', util.log))
    .pipe(gulp.dest('./build/scripts/'));
});

//size task
gulp.task('size', function() {
  gulp.src('./app/**')
    .pipe(size({
    showFiles: true,
  }));
});

//build size task
gulp.task('build-size', function() {
  gulp.src('./build/**')
  .pipe(size({
    showFiles: true,
  }));
});

//server task
gulp.task('serve', ['styles', 'html', 'scripts', 'size'], function() {
  browserSync.init({
    server: {
      baseDir: 'build',
    },
  });
});

//default task
gulp.task('default', ['serve', 'styles'], function() {
  gulp.watch('app/sass/**/*.scss', ['styles']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/scripts/**/*.js', browserSync.reload);
});
