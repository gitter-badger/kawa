/* gulp/tasks/serve */

var browserSync = require('browser-sync');


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('serve', function() {

        var browserList = config.browsersync.browser.join(', ');
        gp.util.log('Opening \'' + gp.util.colors.blue(browserList) + '\'');

        // Launches the BrowserSync server
        browserSync(config.browsersync);

    });

};
