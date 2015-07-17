/* gulp/tasks/htdocs */

var path        = require('path');
var eventStream = require('event-stream');
var _           = require('underscore');
var reporter    = require('../utils/reporter');
var template    = require('../utils/template');
var utils       = require('../utils');


module.exports = function(gulp, gp, config, debug) {
    'use strict';

    gulp.task('htdocs', function() {

        var data      = utils.dataJson(path.join(config.rootDirectories.src, 'data.json'));
        var replaceDB = template(_.extend(config, data), '');

        var replaceFilter = gp.filter(['**/*.{html,php,xml,txt}', 'CNAME']);
        var htmlFilter    = gp.filter('**/*.html');

        var fileHtdocs = gulp
            .src('**/!(_)*.*', { cwd: config.dirs.src.file });

        var viewHtdocs = gulp
            .src('**/!(_)*.{html,php}', { cwd: config.dirs.src.view });

        return eventStream.merge(fileHtdocs, viewHtdocs)
            .pipe(gp.plumber())
            .pipe(config.force ? gp.util.noop() : gp.changed(config.rootDirectories.dest))
            .pipe(replaceFilter)
            .pipe(gp.preprocess(config.preprocess))
            .pipe(gp.replaceTask({ patterns: replaceDB, usePrefix: false }))
            .pipe(replaceFilter.restore())
            .pipe(htmlFilter)
            .pipe(gp.htmlhint())
            .pipe(reporter('htmlhint'))
            .pipe(debug ? gp.util.noop() : gp.htmlmin(config.htmlmin))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(config.rootDirectories.dest));

    });

};
