/* gulp/tasks/components */

var path        = require('path');
var eventStream = require('event-stream');


module.exports = function(gulp, gp, config, debug) {
    'use strict';

    gulp.task('components', function() {

        var tasks = [];

        config.components.forEach(function(componentGroup) {

            var componentDest     = Object.keys(componentGroup)[0];
            var componentDestPath = componentDest.replace(/-/g, '/');
            var componentSrcFiles = componentGroup[componentDest];

            componentSrcFiles.forEach(function(componentFile) {

                var noMinGlob    = '!**/*min*';
                var cssMinFilter = gp.filter(['**/*.css', noMinGlob]);
                var jsMinFilter  = gp.filter(['**/*.js', noMinGlob]);

                tasks.push(
                    gulp
                        .src(componentFile, { cwd: '.' })
                        .pipe(cssMinFilter)
                        .pipe(debug ? gp.util.noop() : gp.csso(config.csso))
                        .pipe(debug ? gp.util.noop() : gp.rename({ suffix: '.min' }))
                        .pipe(cssMinFilter.restore())
                        .pipe(jsMinFilter)
                        .pipe(debug ? gp.util.noop() : gp.uglify(config.uglify.minify))
                        .pipe(debug ? gp.util.noop() : gp.rename({ suffix: '.min' }))
                        .pipe(jsMinFilter.restore())
                        .pipe(gulp.dest(path.join(config.rootDirectories.dest, componentDestPath)))
                );

            });

        });

        return eventStream.merge(tasks);

    });

};
