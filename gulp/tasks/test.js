/* gulp/tasks/test */


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('test', function() {

        return gulp
            .src('runner.html', { cwd: 'test' })
            .pipe(gp.mochaPhantomjs(config.mochaPhantomjs));

    });

};
