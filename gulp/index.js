/* gulp/index.js */


var gulp  = require('gulp');
var gp    = require('gulp-load-plugins')();

var fs    = require('fs');
var path  = require('path');
var _     = require('underscore');
var utils = require('./utils');
var clrs  = require('colors.css');


module.exports = function(pkg, options) {
    'use strict';

    // Overrides `dest` using `--dest [DIR]`
    pkg.rootDirectories.dest = gp.util.env.dest || pkg.rootDirectories.dest;

    // Prepend root paths to `options.dirs.{src,dest}`

    utils.rewritePath(pkg.rootDirectories.src, options.dirs.src);
    utils.rewritePath(pkg.rootDirectories.dest, options.dirs.dest);

    // Optimize assets using `NODE_ENV=production` or `--production`

    var debug = (process.env.NODE_ENV !== 'production') && (typeof gp.util.env.production === 'undefined');

    // Base url depending of the context
    // Production url using `--homepage`

    var hostUrl = options.browsersync.proxy || 'http://localhost:' + options.browsersync.port;
    var baseUrl = gp.util.env.homepage ? pkg.homepage : hostUrl;

    // Add clrs.cc colors variables

    options.cssnext.features.customProperties.variables = _.extend(
        options.cssnext.features.customProperties.variables,
        clrs
    );

    // Custom properties

    var customOpts = {

        // Variables
        today:  utils.today('-'),
        title:  utils.titleCase(pkg.name),
        url:    baseUrl,
        domain: baseUrl.replace(/.*?:\/\//g, ''),
        min:    debug ? '' : '.min',

        // Preprocess settings
        preprocess: {
            context: {
                task:    _.first(gp.util.env._) === 'bundle' ? 'bundle' : 'default',
                baseurl: baseUrl,
                debug:   debug
            }
        },

        // Force to compile all
        force: false

    };

    // Build configuration

    var config = _.extend(pkg, options, customOpts);

    // Load all the tasks

    var taskPath = 'gulp/tasks';
    var taskList = fs.readdirSync(taskPath).filter(utils.taskFilter);

    taskList.forEach(function(taskFile) {
        require(path.resolve(taskPath, taskFile))(gulp, gp, config, debug);
    });

    // Help task

    gulp.task('help', function() {
        console.log(fs.readFileSync('gulp/help.txt', 'utf8'));
    });

};
