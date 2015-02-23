var gulp=require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rimraf= require('gulp-rimraf');


gulp.task('clean', function (cb) {
  return gulp.src('./dist')
  .pipe(rimraf({force:true}));
});
 
gulp.task('usemin', ['clean'], function () {
  return gulp.src('./src/*.html')
      .pipe(usemin({
      	css:['concat'],
        libs: [uglify()]
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['usemin']);