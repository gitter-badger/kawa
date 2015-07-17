/* gulp/tasks/styles */

var cssnext  = require('cssnext');
var mqpacker = require('css-mqpacker');
var reporter = require('../utils/reporter');


module.exports = function(gulp, gp, config, debug) {
    'use strict';

    gulp.task('styles', function() {

        return gulp
            .src('**/!(_)*.css', { cwd: config.dirs.src.css })
            .pipe(gp.plumber())
            .pipe(gp.postcss([
                cssnext(config.cssnext),
                mqpacker
            ]))
            .pipe(gp.preprocess(config.preprocess))
            .pipe(gp.csscomb())
            .pipe(gp.csslint('.csslintrc'))
            .pipe(reporter('csslint'))
            .pipe(debug ? gp.util.noop() : gp.csso(config.csso))
            .pipe(debug ? gp.util.noop() : gp.rename({ suffix: '.min' }))
            .pipe(gulp.dest(config.dirs.dest.css));

    });

};
