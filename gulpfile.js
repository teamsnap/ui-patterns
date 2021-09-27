'use strict';

const drizzle = require('drizzle-builder');
const gulp = require('gulp');
const jsTask = require('./js-gulptask');
const helpers = require('@cloudfour/hbs-helpers');
const del = require('del');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const env = require('gulp-util').env;
const config = require('./config');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const importer = require('postcss-import');
const use = require('postcss-use');
const prefixer = require('postcss-class-prefix');

// Customize inline SVG helper base path
helpers.svg = helpers.svg.create({
  basePath: './src/teamsnap-ui/src/assets/icons/'
});

// Append config
Object.assign(config.drizzle, { helpers });

gulp.task('clean', function(done) {
  del.sync(config.clean.dest);
  done();
});

gulp.task('copy', function(done) {
  gulp.src(config.copy.src).pipe(gulp.dest(config.copy.dest));
  done();
});

// This creates a new task for the JavaScript task
jsTask(gulp, config['js']);


gulp.task('serve', function() {
  browserSync.init(config.serve.plugins.browserSync);
});

gulp.task('watch', function() {
  watchers.forEach(function(item) {
    watch(item.match, function() {
      runSequence(item.tasks);
    });
  });
});

gulp.task('cssDocs', function () {
  const plugins = [
    importer(),
    use({ modules: '*', resolveFromFile: true }),
    cssnext({browsers: ['last 1 version']})
  ];
  return gulp.src(config.cssDocs.src)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(config.cssDocs.dest));
});

gulp.task('cssDrizzle', function () {
  const plugins = [
    importer(),
    use({ modules: '*', resolveFromFile: true }),
    cssnext({browsers: ['last 1 version']}),
    prefixer(config.cssDrizzle.prefix, config.cssDrizzle.ignore)
  ];
  return gulp.src(config.cssDrizzle.src)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(config.cssDrizzle.dest));
});

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

// Register Drizzle builder task
gulp.task('drizzle', () => {
  const result = drizzle(config.drizzle);
  return result;
});

// Register frontend composite task
gulp.task('frontend', gulp.series(
  'drizzle',
  'copy',
  'cssDocs',
  'cssDrizzle',
  'sass',
  'js'
));

// Register deploy task (for continuous deployment via Netflify)
gulp.task('deploy', gulp.series('clean', 'frontend'));


// Register default task
gulp.task('default', gulp.series('frontend', 'serve', 'watch'));
