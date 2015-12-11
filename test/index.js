'use strict';

const Code = require('code');
const Lab = require('lab');
const Moment = require('moment');
const Logger = require('../lib/index.js');
const StdMocks = require('std-mocks');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('YALL', () => {

    it('should throw an error when constructed without options object', (done) => {

        const fn = function () {

            new Logger();
        };

        expect(fn).throws(Error, 'Logger must be constructed with an options object');
        done();

    });

    it('should apply defaults object to options object to create settings object', (done) => {

        process.env.NODE_ENV = 'debug';
        const logger = new Logger({
            timestamp: 'YYYY-MM-DD HH:MM:SSS'
        });
        expect(logger.debugLevel).to.be.true();
        logger.debugMode();
        expect(logger.debugLevel).to.be.false();
        logger.debugMode();
        expect(logger.debugLevel).to.be.true();
        done();

    });

    it('should write messages to console', (done) => {

        delete process.env.NODE_ENV;
        const logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY'
        });
        logger.debugMode();
        const time = Moment().format('HH:mm DD-MM-YYYY');
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
        const test = StdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        expect(test.stdout[2]).to.equal(test.stdout[3]);
        expect(test.stderr[0]).to.equal(test.stderr[1]);
        expect(test.stderr[2]).to.equal(test.stderr[3]);
        done();

    });

    it('should strip colours from writes to console', (done) => {

        const logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY',
            colours: false,
            format: ':data'
        });
        StdMocks.use();
        logger.info('hello');
        process.stdout.write('hello\n');
        StdMocks.restore();
        const test = StdMocks.flush();
        expect(test.stdout[0]).to.equal(test.stdout[1]);
        done();

    });

    it('does not print debug messages when debug mode is disabled', (done) => {

        const logger = new Logger({
            timestamp: 'HH:mm DD-MM-YYYY',
            colours: false,
            format: ':data'
        });
        StdMocks.use();
        logger.debug('hello');
        process.stdout.write('hello\n');
        StdMocks.restore();
        const test = StdMocks.flush();
        expect(test.stdout[0]).to.equal('hello\n');
        done();

    });


});
