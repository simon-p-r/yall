
var Util = require('util');
var Hoek = require('hoek');
var Chalk = require('chalk');
var Moment = require('moment');
var Schema = require('./schema.js');

var colors = {
    debug: 'blue',
    info: 'white',
    warn: 'yellow',
    error: 'red'
};

var internals = {
    defaults: {
        levels: {
            debug: 1,
            info: 2,
            warn: 3,
            error: 4
        },
        level: 'info',
        colours: true,
        format: ':level - :ts - :data',
        timestamp: 'HH:mm:SSS'
    }
};

module.exports = internals.Logger = function (options) {

    Hoek.assert(this.constructor === internals.Logger, 'Logger must be constructed using new');
    Hoek.assert(typeof options === 'object', 'Logger must be constructed with an options object');
    this.settings = Hoek.applyToDefaults(internals.defaults, options);
    Schema.assert('Console', this.settings, 'Invalid console object passed to constructor');

};

internals.Logger.prototype._write = function (level, data) {

    var colour = colors[level];
    var colours = this.settings.colours;
    var line = this.settings.format;
    var ts = this.settings.timestamp;
    line = line.replace(':ts', ts ? '[' + Moment().format(ts) + ']' : '');
    line = line.replace(':level', '[' + level.toUpperCase() + ']');
    line = line.replace(':data', Util.format.apply(null, data));

    //remove line endings and undefined values
    line = line.replace(/\r?\n|\r/g);
    line = line.replace(/undefined/g, '');
    if (colours === false) {
        line = Chalk.stripColor(line);
    } else {
        line = Chalk[colour](line);
    }
    return line;
};

internals.Logger.prototype.debug = function () {

    return console.log(this._write('debug', arguments));

};

internals.Logger.prototype.info = function () {

    return console.log(this._write('info', arguments));

};

internals.Logger.prototype.warn = function () {

    return console.log(this._write('warn', arguments));

};

internals.Logger.prototype.error = function () {

    return console.error(this._write('error', arguments));

};
