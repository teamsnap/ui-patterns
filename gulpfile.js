'use strict';

const drizzle = require('drizzle-builder');
const gulp = require('gulp');
const helpers = require('@cloudfour/hbs-helpers');
const tasks = require('@cloudfour/gulp-tasks');
const env = require('gulp-util').env;
const config = require('./config');

const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const csso = require('gulp-csso');
const runSequence = require('gulp4-run-sequence');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

// Customize inline SVG helper base path
helpers.svg = helpers.svg.create({
  basePath: './src/teamsnap-ui/src/assets/icons/'
});


// Append config
Object.assign(config.drizzle, { helpers });

// Register core tasks
[
  'clean',
  'copy',
  'js'
].forEach(name => tasks[name](gulp, config[name]));

// Register special CSS tasks
tasks.css(gulp, config['css:drizzle']);
gulp.task('css', gulp.series('css:drizzle'));

// Add sass function for compiling Sass
function compileSass(cfg) {
  return gulp.src(cfg.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 1 version'))
  .pipe(gulp.dest(cfg.dest))
}

// Run Sass compile on Teamsnap UI and Demo CSS
gulp.task('sass', function(done) {
  compileSass(config.ui);
  compileSass(config.demos);
  done();
});

gulp.task('sass-themes', function(done) {
  compileSass(config.themes);
  done();
});

gulp.task('watch', function() {
  const watchers = config.watch.watchers;

  watchers.forEach(function(item) {
    watch(item.match, function() {
      runSequence(item.tasks);
    });
  });
});

gulp.task('serve', function(done) {
  browserSync.init(config.browserSync);
  done();
});

// Register Drizzle builder task
gulp.task('drizzle', () => {
  const result = drizzle(config.drizzle);
  return result;
});

// Register frontend composite task
gulp.task('frontend', gulp.series(
  'drizzle',
  'copy',
  'css',
  'sass',
  'sass-themes',
  'js'
));

// Register build task (for continuous deployment via Netflify)
gulp.task('build', gulp.series('clean', 'frontend'));

// Register default task
gulp.task('default', gulp.series('frontend', 'serve', 'watch'));
