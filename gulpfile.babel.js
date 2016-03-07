import gulp       from 'gulp'
import browserify from 'gulp-browserify'
import concat     from 'gulp-concat'
import livereload from 'gulp-livereload'
import open       from 'gulp-open'

let
src     = 'src/**/*.*',
sources = 'sources.js',
mocha   = 'mocha/',
test    = 'test/**/*.*',
tests   = 'tests.js',
any     = 'mocha/**/*.*',
dist    = 'dist/'

gulp.task('sources', () => {
  return gulp.src(src)
    .pipe(browserify({
      debug: true,
      insertGlobals: true
    }))
    .pipe(concat(sources))
    .pipe(gulp.dest(mocha))
})

gulp.task('tests', ['sources'], () => {
  return gulp.src(test)
    .pipe(browserify({
      debug: true,
      insertGlobals: true
    }))
    .pipe(concat(tests))
    .pipe(gulp.dest(mocha))
})

gulp.task('deploy', ['sources', 'tests'], () => {
  return gulp.src([
      'node_modules/chai/chai.js',
      any
    ])
    .pipe(gulp.dest(dist))
    .pipe(livereload())
})

gulp.task('default', ['sources', 'tests', 'deploy'])

gulp.task('tdd', ['default'], () => {
  livereload.listen({ basePath: dist })
  
  gulp.watch([src], ['sources'])
  gulp.watch([test], ['tests'])
  gulp.watch([any], ['deploy'])

  return gulp.src(dist)
      .pipe(open({ uri: 'http://localhost:3000' }))
})
