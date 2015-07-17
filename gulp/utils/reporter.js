/* gulp/utils/reporter.js */

var path        = require('path');
var util        = require('gulp-util');
var eventStream = require('event-stream');


module.exports = function(type) {
    'use strict';

    var logFile = function(name, file, status, err) {

        var str = [
            util.colors.yellow('[' + name + ']'),
            util.colors.magenta(path.basename(file)),
            (status === 'Fail' ? util.colors.red('✖ ' + status) : util.colors.blue('✔ ' + status)),
            util.colors.gray(err === 0 ? '' : ('(' + err + ' problem' + (err === 1 ? '' : 's') + ')'))
        ].join(' ');

        return util.log(str);

    };

    var logError = function(line, col, msg, code) {

        var str = [
            util.colors.cyan('[line ' + line + ' - col ' + col + ']'),
            util.colors.dim(msg),
            util.colors.gray(code)
        ].join(' ');

        return util.log(str);

    };

    return eventStream.map(function(file, done) {

        var fileType = file[type];

        if (!fileType.success) {
            var errors = (type === 'jshint') ? fileType.results.length : fileType.errorCount;
            logFile(type, file.path, 'Fail', errors);

            var results = (type === 'htmlhint' ? fileType.messages : fileType.results);
            results.forEach(function(res) {
                var err = res.error;

                if (type === 'jshint') {
                    logError(err.line, err.character, err.reason, err.code);
                } else {
                    logError(err.line, err.col, err.message, err.rule.id);
                }

            });

        } else {

            logFile(type, file.path, 'Success', 0);

        }

        done(null, file);

    });

};
