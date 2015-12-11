'use strict';

const Chalk = require('chalk');
const Hoek = require('hoek');
const Moment = require('moment');
const Schema = require('./schema.js');
const Util = require('util');

const internals = {
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

internals._write = (level, data) => {

    const colour = internals.colours[level];
    let line = internals.settings.format;
    const ts = internals.settings.timestamp;
    line = line.replace(':ts', '[' + Moment().format(ts) + ']');
    line = line.replace(':level', '[' + level.toUpperCase() + ']');
    line = line.replace(':data', Util.format.apply(null, data));
    if (!internals.settings.colours) {
        line = Chalk.stripColor(line);
    }
    else {
        line = Chalk[colour](line);
    }
    return line;
};

module.exports = class Logger {

    constructor(options) {

        Hoek.assert(typeof options === 'object', 'Logger must be constructed with an options object');
        internals.settings = Hoek.applyToDefaults(internals.defaults, options);
        Schema.assert('Logger', internals.settings, 'Invalid logger object passed to constructor');
        this.debugLevel = process.env.NODE_ENV === 'debug' ? true : false;
    }

    debugMode() {

        if (this.debugLevel) {
            this.debugLevel = false;
            return;
        }
        this.debugLevel = true;
        return;
    }

    debug() {

        if (!this.debugLevel) {
            return;
        }
        const args = Array.from(arguments);
        return console.log(internals._write('debug', args));
    }

    info() {

        const args = Array.from(arguments);
        return console.log(internals._write('info', args));
    }

    warn() {

        const args = Array.from(arguments);
        return console.warn(internals._write('warn', args));
    }

    error() {

        const args = Array.from(arguments);
        return console.error(internals._write('error', args));
    }

};
