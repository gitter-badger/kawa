/* gulp/tasks/changelog */

var fs        = require('fs');
var exec      = require('child_process').exec;
var changeLog = require('conventional-changelog');


module.exports = function(gulp, gp, config) {
    'use strict';

    gulp.task('changelog', function(done) {

        var commitFile = [
            'git add ' + config.changelog.file + ' &&',
            'git commit -m "docs(changelog): add changes for v' + config.version + '"'
        ].join(' ');

        config.changelog.log = gp.util.log;

        changeLog(config.changelog, function(err, log) {
            if (err) { throw err; }

            fs.writeFile(config.changelog.file, log, 'utf8', function(err) {
                if (err) { throw err; }

                exec(commitFile, function(err, stdout) {
                    gp.util.log(stdout);
                    done(err);
                });

            });

        });

    });

};
