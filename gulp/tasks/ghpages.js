/* gulp/tasks/ghpages */

var ghPages = require('gh-pages');


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('ghpages', function(done) {

        config.ghpages.logger = function(message) {
            gp.util.log(message);
        };

        ghPages.publish(
            config.rootDirectories.dest,
            config.ghpages,
            done
        );

    });

};
