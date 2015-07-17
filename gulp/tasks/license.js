/* gulp/tasks/license */


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('license', function() {

        return gulp
            .src('LICENSE*', { cwd: '.' })
            .pipe(gp.rename('license.txt'))
            .pipe(gulp.dest(config.rootDirectories.dest));

    });

};
