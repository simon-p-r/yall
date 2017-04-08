# yall - yet another logging logger

[![Greenkeeper badge](https://badges.greenkeeper.io/simon-p-r/yall.svg)](https://greenkeeper.io/)

[![build status](https://travis-ci.org/simon-p-r/yall.svg?branch=master)](https://travis-ci.org/simon-p-r/yall)
[![Current Version](https://img.shields.io/npm/v/yall.svg?maxAge=1000)](https://www.npmjs.org/package/yall)
[![dependency Status](https://img.shields.io/david/simon-p-r/yall.svg?maxAge=1000)](https://david-dm.org/simon-p-r/yall)
[![devDependency Status](https://img.shields.io/david/dev/simon-p-r/yall.svg?maxAge=1000)](https://david-dm.org/simon-p-r/yall?type=dev)
[![Coveralls](https://img.shields.io/coveralls/simon-p-r/yall.svg?maxAge=1000)](https://coveralls.io/github/simon-p-r/yall)

Console logger with colours, debugMode and format

### Install

````ShellSession

npm install yall

````

### Example

```js

const Logger = require('yall');

const options = {
    timestamp: 'YYYY-MM-DD-HH:mm:SSS', // format of timedate from momentjs
    format: ':level - :ts - :data', // to change appearance of message and order they appear in
    colours: false // strips colours from message
};

const logger = new Logger(options);

logger.debug('hello'); // by default debug won't print to console unless process.env.NODE_ENV is set to 'debug' or debugMode method is called like below
logger.debugMode(); // toggles debug mode on
logger.debug('hello'); // should print in Chalk yellow [DEBUG - 2015-06-01-09:02:123 - hello]

```
