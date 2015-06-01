#yall - yet another logging logger

Console logger with colours and format

[![Build Status](https://travis-ci.org/simon-p-r/yall.svg?branch=master)](https://travis-ci.org/simon-p-r/yall)
[![Current Version](https://img.shields.io/npm/v/yall.svg)](https://www.npmjs.org/package/yall)
![devDependencies](http://img.shields.io/david/dev/simon-p-r/yall.svg)


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

logger.debug('hello'); // should print in Chalk yellow [DEBUG - 2015-06-01-09:02:123 - hello]
```
