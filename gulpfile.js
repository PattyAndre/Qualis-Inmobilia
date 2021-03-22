'use strict';
// gulpfile.js
//
var browserSync = require('browser-sync').create(); // browser autoreload
var del = require('del'); // Removes files
var gulp = require('gulp'); // Gulp task runner
var cache = require('gulp-cache'); // avoid repeating tasks
var concat = require('gulp-concat'); // join css and js
var cssnano = require('gulp-cssnano'); // reduce css size
var sass = require('gulp-sass'); // Compile Sass to CSS
var image = require('gulp-image'); // Minify images
var uglify = require('gulp-uglify'); // Minify js
var plumber = require('gulp-plumber'); // Gulp error handler
var gutil = require('gulp-util'); // Useful Utilities
var psi = require('psi'); // Page Speed Insights
var regexRename = require('gulp-regex-rename'); // Rename Files REGEX
var rename = require('gulp-rename'); // Rename Files
var hb = require('gulp-hb'); // HandleBars compiling
var layouts = require('handlebars-layouts'); // HandleBars layouts

// var replace = require('gulp-replace');             // Replace Strings
// var gulpif = require('gulp-if');                   // If statements

gulp.task('images', function() {
  gulp.src('app/favicon/**').pipe(gulp.dest('dist/'));
  return (
    gulp
      .src('app/images/**/*.+(jpg|jpeg|gif|svg|png)')
      //.pipe(cache(image()))
      .pipe(gulp.dest('dist/images'))
  );
});
gulp.task('videos', function() {
  return (
    gulp
      .src('app/videos/**/*.+(mp4)')
      .pipe(gulp.dest('dist/videos'))
  );
});
gulp.task('pdfs', function() {
  return (
    gulp
      .src('app/pdfs/**/*.+(pdf)')
      //.pipe(cache(image()))
      .pipe(gulp.dest('dist/pdfs'))
  );
});

gulp.task('fonts', function() {
  return (
    gulp
      .src('app/fonts/**/*')
      //.pipe(cache(image()))
      .pipe(gulp.dest('dist/fonts'))
  );
});

gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});

gulp.task('clean:dist', () => del(['dist']));

gulp.task('views', function() {
  return gulp
    .src('app/views/**/*.page.hbs')
    .pipe(
      hb()
        .partials('./app/views/partials/**/*.hbs')
        .partials('./app/views/layouts/**/*.hbs')
        .data('./app/views/data/**/*.{js,json}')
        .data(require('./app/views/data/main.json'))
        .helpers('./node_modules/handlebars-layouts/index.js')
    )
    .pipe(regexRename(/\.page\.hbs$/, '.html'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

function style() {
  return gulp
    .src(['app/css/**/*.css']) // Gets all files ending with .css in app/scss and children dirs
    .pipe(concat('styles.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

gulp.task('plugins', function() {
  return gulp.src('app/plugins/**/*').pipe(gulp.dest('dist/plugins'));
});

//gutil.log(gutil.colors.bgGreen.white.bold('JS generated and updated'));
gulp.task('js', function() {
  return gulp
    .src(['app/js/**/*.js', 'app/js/**/*.min.js', '!app/js/*.min.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
});

gulp.task(
  'watch',
  gulp.parallel(
    gulp.series(
      'clean:dist',
      // 'cache:clear',
      'images',
      'videos',
      'pdfs',
      'fonts',
      'plugins',
      gulp.parallel('browserSync', 'views', 'js', style)
    ),
    watchFiles
  )
);
gulp.task(
  'build',
  gulp.parallel(
    gulp.series(
      'clean:dist',
      // 'cache:clear',
      'images',
      'videos',
      'pdfs',
      'fonts',
      'plugins',
      gulp.parallel('views', 'js', style)
    )
  )
);

function watchFiles() {
  gulp.watch('app/css/**/*.css', style);
  gulp.watch(['app/js/**/*.js', '!app/js/**/*.min.js'], gulp.series('js'));
  gulp.watch(['app/images/**/*'], gulp.series('images'));
  gulp.watch(
    ['app/views/**/*.hbs', 'app/views/data/**/*.json'],
    gulp.series('views')
  );
}

var site = 'CHANGE THIS';
var key = '';

// https://developers.google.com/speed/docs/insights/v2/getting-started

gulp.task('mobile', function() {
  return psi(site, {
    // key: key
    nokey: 'true',
    strategy: 'mobile'
  }).then(function(data) {
    console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
  });
});

gulp.task('desktop', function() {
  return psi.output(site, {
    // key: key,
    nokey: 'true',
    strategy: 'desktop',
    threshold: 30
  });
});

gulp.task('default', gulp.series('watch'));

exports.style = style;
