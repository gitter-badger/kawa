/* gulp/tasks/fonts */


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('fonts', function() {

        return gulp
            .src('**/!(_)*.{eot,svg,ttf,woff,woff2}', { cwd: config.dirs.src.font })
            .pipe(gulp.dest(config.dirs.dest.font));

    });

};
