'use strict';

var Joi = require('joi');
var Hoek = require('hoek');

var internals = {};

exports.assert = function (type, obj, message) {

    var result = Joi.validate(obj, internals[type]);
    Hoek.assert(!result.error, message);
    return result.value;
};

internals.Console = Joi.object().keys({
    colours: Joi.boolean(),
    format: Joi.string(),
    timestamp: Joi.string()

});
