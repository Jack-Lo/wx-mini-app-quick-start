var gulp = require('gulp')
var gutil = require('gulp-util')

var rename = require('gulp-rename')
var swig = require('gulp-swig')
var sass = require('gulp-sass')
var cached = require('gulp-cached')
var remember = require('gulp-remember')
var watch = require('gulp-watch')
var plumber = require('gulp-plumber')
var del = require('del')

var distDir = 'dist'
var styleExt = '.scss'
var tplExt = '.swig'

gulp.task('js', () => {
  return gulp.src(['app/**/*.js', '!app/common/**/*.js'])
  .pipe(plumber())
  .pipe(cached('js'))
  // .pipe(remember('js'))
  .pipe(gulp.dest(distDir))
})

gulp.task('json', () => {
  return gulp.src(['app/**/*.json', '!app/common/**/*.json'])
  .pipe(plumber())
  .pipe(cached('json'))
  // .pipe(remember('json'))
  .pipe(gulp.dest(distDir))
})

gulp.task('style', () => {
  return gulp.src(['app/**/*' + styleExt, '!app/common/**/*' + styleExt])
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(cached('style'))
  // .pipe(remember('style'))
  .pipe(rename({
    extname: '.wxss'
  }))
  .pipe(gulp.dest(distDir))
})

gulp.task('tpl', () => {
  return gulp.src(['app/**/*' + tplExt, '!app/common/**/*' + tplExt])
  .pipe(plumber())
  .pipe(swig({
    defaults: {
      cache: false,
      varControls: ['{*', '*}']
    }
  }))
  .pipe(cached('tpl'))
  // .pipe(remember('tpl'))
  .pipe(rename({
    extname: '.wxml'
  }))
  .pipe(gulp.dest(distDir))
})

gulp.task('clean', () => {
  return del(['dist/**', '!dist'])
  // .then(() => {})
})

gulp.task('trans:style', () => {
  return gulp.src('dist/**/*.wxss')
  .pipe(rename({
    extname: styleExt
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('trans:tpl', () => {
  return gulp.src('dist/**/*.wxml')
  .pipe(rename({
    extname: tplExt
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('trans', ['trans:style', 'trans:tpl'], () => {
  return del(['dist/**/*.wxss', 'dist/**/*.wxml'])
})

gulp.task('init', ['clean'], () => {
  return gulp.start(['js', 'json', 'style', 'tpl'])
})

gulp.task('dev', ['init'], () => {
  watch('app/**/*.js', (event) => {
    gulp.start('js')
  })

  watch('app/**/*.json', (event) => {
    gulp.start('json')
  })

  watch('app/**/*.scss', (event) => {
    gulp.start('style')
  })

  watch('app/**/*.swig', (event) => {
    gulp.start('tpl')
  })
})