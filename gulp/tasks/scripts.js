/* gulp/tasks/scripts */

var reporter = require('../utils/reporter');


module.exports = function(gulp, gp, config, debug) {
    'use strict';

    gulp.task('scripts', function() {

        return gulp
            .src('**/!(_)*.js', { cwd: config.dirs.src.js })
            .pipe(gp.plumber())
            .pipe(gp.preprocess(config.preprocess))
            .pipe(gp.uglify(config.uglify.beautify))
            .pipe(gp.jscs('.jscsrc'))
            .pipe(gp.jshint('.jshintrc'))
            .pipe(reporter('jshint'))
            .pipe(debug ? gp.util.noop() : gp.uglify(config.uglify.minify))
            .pipe(debug ? gp.util.noop() : gp.rename({ suffix: '.min' }))
            .pipe(gulp.dest(config.dirs.dest.js));

    });

};
