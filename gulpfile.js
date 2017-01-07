const gulp = require('gulp')
const gutil = require('gulp-util')
const source = require('vinyl-source-stream')
const babelify = require('babelify')
const watchify = require('watchify')
const exorcist = require('exorcist')
const browserify = require('browserify')
const browserSync = require('browser-sync').create()

// Watchify args contains necessary cache options to achieve fast incremental bundles.
// See watchify readme for details. Adding debug true for source-map generation.
watchify.args.debug = true
// Input file.
let bundler = watchify(browserify('./app/src/main.js', watchify.args))

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'app/src',
  presets: ['es2015', 'es2016']
}))

// On updates recompile
bundler.on('update', bundle);

function bundle() {

  gutil.log('Compiling JS...');

  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message);
      browserSync.notify("Browserify Error!");
      this.emit("end");
    })
    .pipe(exorcist('app/src/dist/main.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/src/dist'))
    .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
  return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], function () {
  browserSync.init({
    server: "./app"
  });
});