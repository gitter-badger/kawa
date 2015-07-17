/* gulp/tasks/watch */

var path        = require('path');
var browserSync = require('browser-sync');
// Temporary solution until gulp 4
var runSequence = require('run-sequence');


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('watch', function() {

        runSequence('default', 'serve', function() {

            // Watch CSS and JS for changes

            gulp.watch([
                path.join(config.dirs.src.css, '**/*.css'),
                '.csslintrc'
            ], ['styles', browserSync.reload]);

            gulp.watch([
                path.join(config.dirs.src.js, '**/*.js'),
                '.jscsrc',
                '.jshintrc'
            ], ['scripts', browserSync.reload]);

            // Watch VIEWS and FILES for changes

            gulp.watch([
                path.join(config.dirs.src.file, '**/!(_)*.*'),
                path.join(config.dirs.src.view, '**/!(_)*.{html,php}')
            ], ['htdocs', browserSync.reload]);

            gulp.watch([
                path.join(config.dirs.src.view, '**/_*.html'),
                path.join(config.rootDirectories.src, 'data.json')
            ]).on('change', function(evt) {
                config.force = true;
                gp.util.log('\'' + gp.util.colors.cyan(path.basename(evt.path)) + '\' ' + evt.type);
                runSequence('htdocs', browserSync.reload);
            });

        });

    });

    // Watch tests files
    gulp.task('watch:test', function() {

        runSequence('default', 'test', function() {

            gulp.watch([
                'test/runner.html',
                'test/spec.js'
            ], ['test']);

        });

    });

};
