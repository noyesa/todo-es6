var gulp = require('gulp'),
  babel = require('gulp-babel'),
  rm = require('gulp-rm'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('clean:scripts', function() {
  return gulp.src('assets/javascripts/**/*')
    .pipe(rm());
});

gulp.task('clean', ['clean:scripts']);

gulp.task('babel', ['clean:scripts'], function() {
  return gulp.src('public/javascripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ modules: 'amd' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/javascripts'));
});
