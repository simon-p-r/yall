// Load modules

var Code = require('code');
var Lab = require('lab');
var Moment = require('moment');
var Logger = require('../lib/index.js');
var StdMocks = require('std-mocks');


// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('YALL', function () {

    it('should throw an error when constructed without options object', function (done) {

        var fn = function () {

            var logger = new Logger();
        };

        expect(fn).throws(Error, 'Logger must be constructed with an options object');
        done();

    });

    it('should apply defaults object to options object to create settings object', function (done) {

        process.env.NODE_ENV = 'debug';
        var logger = new Logger({
            timestamp: 'YYYY-MM-DD HH:MM:SSS'
        });
        expect(logger.settings.colours).to.be.true();
        expect(logger.settings.timestamp).to.equal('YYYY-MM-DD HH:MM:SSS');
        expect(logger.debugLevel).to.be.true();
        logger.debugMode();
        expect(logger.debugLevel).to.be.false();
        logger.debugMode();
        expect(logger.debugLevel).to.be.true();
        done();

    });

    it('should write messages to console', function (done) {

        delete process.env.NODE_ENV;
        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY'
        });
        logger.debugMode();
        var time = Moment().format('HH:mm DD-MM-YYYY');
        StdMocks.use();
        logger.debug('hello');
        process.stdout.write('\u001b[36m[DEBUG] [' + time + '] hello\u001b[39m\n');
        logger.info('hello');
        process.stdout.write('\u001b[37m[INFO] [' + time + '] hello\u001b[39m\n');
        logger.warn('hello');
        process.stderr.write('\u001b[33m[WARN] [' + time + '] hello\u001b[39m\n');
        logger.error('hello');
        process.stderr.write('\u001b[31m[ERROR] [' + time + '] hello\u001b[39m\n');
        StdMocks.restore();
        var test = StdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        expect(test.stdout[2]).to.equal(test.stdout[3]);
        expect(test.stderr[0]).to.equal(test.stderr[1]);
        expect(test.stderr[2]).to.equal(test.stderr[3]);
        done();

    });

    it('should strip colours from writes to console', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY',
            colours: false,
            format: ':data'
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        StdMocks.use();
        logger.info('hello');
        process.stdout.write('hello\n');
        StdMocks.restore();
        var test = StdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });

    it('does not print debug messages when debug mode is disabled', function (done) {

        var logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY',
            colours: false,
            format: ':data'
        });
        var time = Moment().format('HH:mm DD-MM-YYYY');
        StdMocks.use();
        logger.debug('hello');
        process.stdout.write('hello\n');
        StdMocks.restore();
        var test = StdMocks.flush();
        expect(test.stdout[0]).to.equal('hello\n');
        done();

    });


});
