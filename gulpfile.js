// Tasks:
//
// 1. Convert coffeescript to javascript
// 2. Pass javascript through babel
// 3. Put javascript into dist/
// 4. Put everything else into dist/

const gulp = require('gulp');
const coffee = require('gulp-coffee');
const babel = require('gulp-babel');
const log = require('fancy-log');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const cssimport = require('gulp-cssimport');
const postcssGridKiss = require('postcss-grid-kiss');
const postcssCssVariables = require('postcss-css-variables');
const cssnano = require('cssnano');

gulp.task('default', function(done) {
    // Pipe any js files (should be none in final build)
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/'))
        .on('end', function(){ log("Moved js file to dist") });
    // Convert coffee files
    gulp.src('./src/js/*.coffee', {sourcemaps: true})
        .pipe(coffee({bare: true}))
        .on('end', function(){ log("Converted coffee to js") })
        .pipe(babel({presets: ['env']}))
        .on('end', function(){ log("Piped coffee through Babel") })
        .pipe(gulp.dest('./dist/'))
        .on('end', function(){ log("Finished processing JS") });
    // Pipe images, html, json
    gulp.src('./src/images/*.*')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/js/*.json')
        .pipe(gulp.dest('./dist/'));
    // Post-process, minify and concatenate css files
    gulp.src('./src/css/root.css')
        .pipe(cssimport())
        .on('end', function(){ log("Resolving CSS imports") })
        .pipe(postcss([
          postcssCssVariables(),
          postcssGridKiss(),
          // cssnano(),
        ]))
        .on('end', function(){ log("Post-processing CSS") })
        .pipe(rename("maitreya.css"))
        .pipe(gulp.dest('./dist/'))
        .on('end', function(){ log("Finished processing CSS") });
    // Finish
    done()
});
