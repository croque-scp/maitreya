// Tasks:
//
// 1. Convert coffeescript to javascript
// 2. Pass javascript through babel
// 3. Put javascript into dist/
// 4. Put everything else into dist/

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var babel = require('gulp-babel');
var log = require('fancy-log');

gulp.task('default', function(done) {
    // Pipe any js files (should be none in final build)
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/'))
        .on('end', function(){ log("Moved js file to dist") });
    // Convert coffee files
    gulp.src('./src/js/*.coffee')
        .pipe(coffee({bare: true}))
        .on('end', function(){ log("Converted coffee to js") })
        .pipe(babel({presets: ['env']}))
        .on('end', function(){ log("Piped coffee through Babel") })
        .pipe(gulp.dest('./dist/'))
        .on('end', function(){ log("Moved coffee to dist") });
    // Pipe images, css, html
    gulp.src('./src/images/*.*')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/'));
    // Finish
    done()
});
