/* gulp/utils/template.js */

var _ = require('underscore');


module.exports = function(obj, prefix) {
    'use strict';

    var output    = [];
    var separator = prefix ? '.' : '';

    var TemplatePattern = function(name, value) {
        this.match       = '{{ ' + name + ' }}';
        this.replacement = value;
    };

    var templateData = function(data, pre, sep, out) {

        Object.keys(data).forEach(function(property) {

            if (data.hasOwnProperty(property)) {
                var item = data[property];

                if (Object.prototype.toString.call(item) === '[object Array]') {

                    if (typeof _.first(item) === 'object') {
                        templateData(item, pre + sep + property, '-', out);
                    } else {
                        out.push(new TemplatePattern(pre + sep + property, item.join(', ')));
                    }

                } else if (typeof item === 'object') {
                    templateData(item, pre + sep + property, '.', out);
                } else {
                    out.push(new TemplatePattern(pre + sep + property, item));
                }

            }

        });

        return out;
    };

    return templateData(obj, prefix, separator, output);

};
