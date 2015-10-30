'use strict'

var Chalk = require('chalk');
var Hoek = require('hoek');
var Moment = require('moment');
var Schema = require('./schema.js');
var Util = require('util');

let internals = {
    defaults: {
        colours: true,
        format: ':level :ts :data',
        timestamp: 'HH:mm:SSS'
    },
    colours: {
        debug: 'cyan',
        info: 'white',
        warn: 'yellow',
        error: 'red'
    }
};

module.exports = internals.Logger = class Logger {

    constructor (options) {

        Hoek.assert(typeof options === 'object', 'Logger must be constructed with an options object');
        this.settings = Hoek.applyToDefaults(internals.defaults, options);
        Schema.assert('Logger', this.settings, 'Invalid logger object passed to constructor');
        this.debugLevel = process.env.NODE_ENV === 'debug' ? true : false;
        return this;
    }

    debugMode () {

        if (this.debugLevel) {
            this.debugLevel = false;
            return;
        }
        this.debugLevel = true;
        return;
    }

    _write (level, data) {

        let colour = internals.colours[level];
        let line = this.settings.format;
        let ts = this.settings.timestamp;
        line = line.replace(':ts', '[' + Moment().format(ts) + ']');
        line = line.replace(':level', '[' + level.toUpperCase() + ']');
        line = line.replace(':data', Util.format.apply(null, data));
        if (!this.settings.colours) {
            line = Chalk.stripColor(line);
        } else {
            line = Chalk[colour](line);
        }
        return line;
    }

    debug () {

        if (!this.debugLevel) {
            return;
        }
        let args = Array.from(arguments);
        for (let i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        console.log(this._write('debug', args));
        return;

    }

    info () {

        let args = Array.from(arguments);
        for (let i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        console.log(this._write('info', args));
        return;
    }

    warn () {

        let args = Array.from(arguments);
        for (let i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        console.warn(this._write('warn', args));
        return;
    }

    error () {

        let args = Array.from(arguments);
        for (let i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        console.error(this._write('error', args));
        return;
    }


};
