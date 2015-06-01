// Load modules

var Code = require('code');
var Lab = require('lab');
var Moment = require('moment');
var Logger = require('../lib/index.js');
var stdMocks = require('std-mocks');


// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;




describe('initialise', function () {

    it('should throw an error when constructed without new', function (done) {

        var fn = function () {

            var logger = Logger();
        };

        expect(fn).throws(Error, 'Logger must be constructed using new');
        done();

    });

    it('should throw an error when constructed without options object', function (done) {

        var fn = function () {

            var logger = new Logger();
        };

        expect(fn).throws(Error, 'Logger must be constructed with an options object');
        done();

    });

    it('should apply defaults object to options object to create settings object', function (done) {

        var logger = new Logger({});
        var levels = {
            debug: 1,
            info: 2,
            warn: 3,
            error: 4
        };

        expect(logger.settings.levels).to.deep.equal(levels);
        done();

    });

    it('should write debug message to console', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY'
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        stdMocks.use();
        logger.debug('hello');
        process.stdout.write('\u001b[94m[DEBUG] - [' + time + '] - hello\u001b[39m\n');
        stdMocks.restore();
        var test = stdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });

    it('should write info message to console', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY'
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        stdMocks.use();
        logger.info('hello');
        process.stdout.write('\u001b[37m[INFO] - [' + time + '] - hello\u001b[39m\n');
        stdMocks.restore();
        var test = stdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });

    it('should write warn message to console', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY'
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        stdMocks.use();
        logger.warn('hello');
        process.stdout.write('\u001b[33m[WARN] - [' + time + '] - hello\u001b[39m\n');
        stdMocks.restore();
        var test = stdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });

    it('should write error message to console', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY'
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        stdMocks.use();
        logger.error('hello');
        process.stderr.write('\u001b[33m[ERROR] - [' + time + '] - hello\u001b[39m\n');
        stdMocks.restore();
        var test = stdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });

    it('should strip colours from writes to console', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY',
            colours: false
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        stdMocks.use();
        logger.debug('hello');
        process.stdout.write('[DEBUG] - [' + time + '] - hello\n');
        stdMocks.restore();
        var test = stdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });


});
