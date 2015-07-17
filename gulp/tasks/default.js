/* gulp/tasks/default */

// Temporary solution until gulp 4
var runSequence = require('run-sequence');


module.exports = function(gulp) {
    'use strict';

    gulp.task('default', ['clean'], function(done) {

        runSequence(
            ['license', 'images', 'fonts', 'components'],
            'htdocs',
            'styles',
            'scripts',
            done
        );

    });

};
