'use strict';

const Joi = require('joi');
const Hoek = require('hoek');

const internals = {};

exports.assert = function (type, obj, message) {

    const result = Joi.validate(obj, internals[type]);
    Hoek.assert(!result.error, message);
    return result.value;
};

internals.Logger = Joi.object().keys({
    colours: Joi.boolean(),
    format: Joi.string(),
    timestamp: Joi.string()
});
