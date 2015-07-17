/*! Kawa | https://github.com/bymathias/kawa */

'use strict';

// Requirements

var utils = require('./gulp/utils');
var pkg   = require('./package');


// Configuration

var options = {

    /**
     * Paths to project folders
     * relative to `pkg.rootDirectories`
     */

    dirs: {
        // Source directories
        src: {
            css:  'styles',
            js:   'scripts',
            img:  'images',
            font: 'fonts',
            file: 'files',
            view: 'views'
        },
        // Destination directories
        dest: {
            css:  'assets/css',
            js:   'assets/js',
            img:  'assets/img',
            font: 'assets/font'
        }
    },

    /**
     * Components paths
     * CSS, JS, .. components files to copy to `dest`
     */

    components: [
        // CSS files to copy to `assets/css`
        {
            'assets-css': [
                'bower_components/normalize-css/normalize.css'
            ]
        },
        // JS libs files to copy to `assets/js/libs`
        {
            'assets-js-libs': [
                'bower_components/modernizr/modernizr.js',
                'bower_components/jquery/dist/jquery.js'
            ]
        }
    ],

    /**
     * Bundle files
     * CSS and JS files order to concatenate to `bundle.*.{css,js}`
     */

    bundles: {
        css: [
            'normalize*.css',
            '!(app)*.css',
            'app*.css'
        ],
        js: [
            '!(app)*.js',
            'app*.js'
        ]
    },

    /**
     * Dynamic banner added to `bundle.*.{css,js}`
     */

    banner: [
        '/*! ' + utils.today('/'),
        ' * ' + utils.titleCase(pkg.name),
        ' * @version v' + pkg.version,
        ' * @author ' + pkg.author,
        ' * @license ' + pkg.license,
        ' * Copyrights (c) 2015 */',
        '\n'
    ].join('\n'),

    /**
     * Cssnext options
     * @see: cssnext.io/usage
     */

    cssnext: {
        // Browser support lists
        browsers: [ '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1' ],
        // Enable inlined sourcemap in the output
        // sourcemap: true,
        features: {
            customProperties: {
                // Add custom css variables
                variables: {},
                preserve: false
            }
        },
        messages: {
            // Display message in the browser
            browser: false,
            // Display messages in console
            console: {
                // Clear the result's messages after it logs them.
                // Prevents other plugins from logging the same information
                clearMessages: true
            }
        }
    },

    /**
     * CSSO options
     * @see: github.com/css/csso
     * Set to `true` to disable structure minimization
     */

    csso: false,

    /**
     * Uglify options
     * @see: npmjs.com/package/gulp-uglify#options
     */

    uglify: {

        // jshint ignore:start
        // jscs:disable
        beautify: {
            // Pass false to skip mangling names
            mangle: false,
            // Skip compressing entirely
            compress: false,
            // Specify additional output options
            output: {
                // Beautify output
                beautify: true,
                // Always use single quotes
                quote_style: 1
            },
            // Preserve all comments
            preserveComments: 'all'
        },

        minify: {
            output: {
                quote_style: 1
            },
            // Preserve comments that start with a bang (!)
            // or include a Closure Compiler directive
            preserveComments: 'some'

        }
        // jshint ignore:end
        // jscs:enable

    },

    /**
     * Imagemin options
     * @see: npmjs.com/package/gulp-imagemin#api
     */
    imagemin: {
        // Optimization level between 0 and 7
        optimizationLevel: 4,
        // Lossless conversion to progressive
        progressive: true
    },

    /**
     * Htmlmin options
     * @see: github.com/kangax/html-minifier
     */

    htmlmin: {
        // Strip HTML comments
        removeComments: true,
        // Collapse white space that contributes
        // to text nodes in a document tree
        collapseWhitespace: true,
        // Minify Javascript in script elements and on* attributes
        minifyJS: true,
        // Minify CSS in style elements and style attributes
        minifyCSS: true
    },

    /**
     * Mocha PhantomJS options
     * @see: github.com/metaskills/mocha-phantomjs
     */

    mochaphantomjs: {
        // Output of tests piped into a file
        // dump: 'test.log',
        // Pass options to mocha and/or PhantomJS
        reporter: 'spec',
        mocha: {
            useColors: true
        }
        // ,phantomjs: {}
    },

    /**
     * Conventional changelog
     * @see: npmjs.com/package/conventional-changelog
     */

    changelog: {
        version:    pkg.version,
        // repository: pkg.repository.url,
        // String to display after the version title in the changelog
        // subtitle:   '',
        // Which commit the changelog should start at
        // from:       'v0.1.0',
        file:       'CHANGELOG.md'
    },

    /**
     * Github gh-pages options
     * @see: npmjs.com/package/gh-pages
     */

    ghpages: {
        // Include dotfiles
        dotfiles: true,
        // Name of the branch
        branch:   'gh-pages',
        // Commit message for all commits
        message:  'Release v' + pkg.version
    },

    /**
     * Browser-sync options
     * @see: browsersync.io
     */

    browsersync: {
        // logLevel: 'debug',
        browser: [
            // 'google chrome',
            'google chrome canary',
            'firefox'
        ],
        // https: true,
        port: 3000,
        server: {
            baseDir: pkg.rootDirectories.dest  // Web root dir
        }
        // OR
        // proxy: 'local.dev'
    }

};

// Tasks

require('./gulp')(pkg, options);
