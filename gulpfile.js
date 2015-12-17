var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
  browserify('./src/jsx/app.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch('./src/jsx/**/*.jsx', ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);
