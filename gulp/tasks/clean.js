/* gulp/tasks/clean */

var fs   = require('fs');
var path = require('path');
var del  = require('del');


module.exports = function(gulp, gp, config) {
    'use strict';

    // Clean all built files
    gulp.task('clean', function(done) {

        var viewFiles   = fs.readdirSync(config.dirs.src.view);
        var htdocsFiles = fs.readdirSync(config.dirs.src.file).concat(viewFiles);

        del([
            config.dirs.dest.css,
            config.dirs.dest.js,
            config.dirs.dest.img,
            config.dirs.dest.font,
            path.join(config.rootDirectories.dest, 'license.*'),
            path.join(config.rootDirectories.dest, '{' + htdocsFiles + '}')
        ], done);

    });

    // Clean up before deployment
    gulp.task('clean:up', function(done) {

        del([
            path.join(config.dirs.dest.js, '!(bundle)*.js'),
            path.join(config.dirs.dest.css, '!(bundle)*.css')
        ], done);

    });

};
