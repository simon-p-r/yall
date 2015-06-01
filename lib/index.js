
var Util = require('util');
var Hoek = require('hoek');
var Chalk = require('chalk');
var Moment = require('moment');
var Schema = require('./schema.js');

var colors = {
    debug: 'cyan',
    info: 'white',
    warn: 'yellow',
    error: 'red'
};

var internals = {
    defaults: {
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
    line = line.replace(':ts', '[' + Moment().format(ts) + ']');
    line = line.replace(':level', '[' + level.toUpperCase() + ']');
    line = line.replace(':data', Util.format.apply(this, data));
    if (colours === false) {
        line = Chalk.stripColor(line);
    } else {
        line = Chalk[colour](line);
    }
    return line;
};

internals.Logger.prototype.debug = function () {

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    return console.log(this._write('debug', args));

};

internals.Logger.prototype.info = function () {

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    return console.log(this._write('info', args));

};

internals.Logger.prototype.warn = function () {

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    return console.error(this._write('warn', args));

};

internals.Logger.prototype.error = function () {

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    return console.error(this._write('error', args));

};
