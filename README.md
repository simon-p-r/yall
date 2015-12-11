# yall - yet another logging logger

Console logger with colours, debugMode and format

[![Build Status](https://travis-ci.org/simon-p-r/yall.svg?branch=master)](https://travis-ci.org/simon-p-r/yall)


### Install

````ShellSession

npm install yall

````

### Example

```js

var Logger = require('yall');
var options = {
		timestamp: 'YYYY-MM-DD-HH:mm:SSS', // format of timedate from momentjs
		format: ':level - :time - :data', // to change appearance of message and order they appear in
		colours: false // strips colours from message

};
var logger = new Logger(options)
logger.debug('hello'); // by default debug won't print to console unless process.env.DEBUG is set in environment or debugMode method is called like below
logger.debugMode(); // toggles debug mode on
logger.debug('hello'); // should print in Chalk yellow [DEBUG - 2015-06-01-09:02:123 - hello]

```
