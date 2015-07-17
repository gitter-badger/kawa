/* gulp/tasks/images */


module.exports = function(gulp, gp, config, debug) {
    'use strict';

    gulp.task('images', function() {

        return gulp
            .src('**/!(_)*.{png,jpg,jpeg,gif,svg}', { cwd: config.dirs.src.img })
            .pipe(debug ? gp.util.noop() : gp.imagemin(config.imagemin))
            .pipe(gulp.dest(config.dirs.dest.img));

    });

};
