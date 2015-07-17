/* gulp/tasks/bundle */

var eventStream = require('event-stream');


module.exports = function(gulp, gp, config, debug) {
    'use strict';

    gulp.task('bundle', ['default'], function() {

        var bundleName = 'bundle.' + config.version + config.min;

        var bundleCss = gulp
            .src(config.bundles.css, { cwd: config.dirs.dest.css })
            .pipe(gp.concatUtil(bundleName + '.css'))
            .pipe(debug ? gp.csscomb() : gp.util.noop())
            .pipe(gp.concatUtil.header(config.banner))
            .pipe(gulp.dest(config.dirs.dest.css));

        var bundleJs = gulp
            .src(config.bundles.js, { cwd: config.dirs.dest.js })
            .pipe(gp.concatUtil(bundleName + '.js'))
            .pipe(gp.concatUtil.header(config.banner))
            .pipe(gulp.dest(config.dirs.dest.js));

        return eventStream.merge(bundleCss, bundleJs);

    });

};
