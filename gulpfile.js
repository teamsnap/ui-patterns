'use strict';

const drizzle = require('drizzle-builder');
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const helpers = require('@cloudfour/hbs-helpers');
const tasks = require('@cloudfour/gulp-tasks');
const env = require('gulp-util').env;
const config = require('./config');

const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const csso = require('gulp-csso');

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
  'js',
  'serve',
  'watch'
].forEach(name => tasks[name](gulp, config[name]));

// Register special CSS tasks
tasks.css(gulp, config['css:drizzle']);
gulp.task('css', ['css:drizzle']);

// Add sass function for compiling Sass
function compileSass(cfg) {
  return gulp.src(cfg.src)
	.pipe(sass().on('error', sass.logError))
	.pipe(prefix('last 1 version'))
  .pipe(gulp.dest(cfg.dest))
}

// Run Sass compile on Teamsnap UI and Demo CSS
gulp.task('sass', function() {
  compileSass(config.ui);
  compileSass(config.demos);
});

// Register Drizzle builder task
gulp.task('drizzle', () => {
  const result = drizzle(config.drizzle);
  return result;
});

// Register frontend composite task
gulp.task('frontend', [
  'drizzle',
  'copy',
  'css',
  'sass',
  'js'
]);

// Register build task (for continuous deployment via Netflify)
gulp.task('build', ['clean'], done => {
  gulp.start('frontend');
  done();
});

/**
 * Register demo task (deploy output to GitHub Pages)
 * NOTE: Run this after building.
 */
gulp.task('demo', () => {
  const buildDest = `${config.drizzle.dest.pages}/**/*`;
  return gulp.src(buildDest)
    .pipe(ghPages({
      cacheDir: 'demo'
    }));
});

// Register default task
gulp.task('default', ['frontend'], done => {
  gulp.start('serve');
  if (env.dev) {
    gulp.start('watch');
  }
  done();
});
