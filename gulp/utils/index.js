/* gulp/utils/index.js */

var fs   = require('fs');
var path = require('path');
var _    = require('underscore');
var util = require('gulp-util');


module.exports = {

    // Filter `.js` tasks
    taskFilter: function(item) {
        return /\.js$/i.test(item);
    },

    // Rewrite paths
    rewritePath: function(root, obj) {
        var result;
        result = _.object(_.map(obj, function (val, key) {
            var value = (obj[key] = path.join(root, val));
            return value;
        }));
        return result;
    },

    // Print today's date `2015-10-20`
    today: function(str) {
        return util.date(new Date(), 'yyyy' + str + 'mm' + str + 'dd');
    },

    // Change string to TitleCase
    titleCase: function(str) {
        var title;
        return str.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            title = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            return title;
        });
    },

    // Get data from a .json file or return {}
    dataJson: function(file) {
        var data;
        try {
            data = JSON.parse(fs.readFileSync(file, 'utf8'));
        } catch (err) {
            util.log('Couldn\'t access \'' + util.colors.cyan(file) + '\'');
        }
        return data || {};
    }

};
