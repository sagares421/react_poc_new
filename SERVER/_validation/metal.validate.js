const Joi = require('joi');

module.exports = {

    createMetal:{
        body: {
            name: Joi.string().required(),
            type: Joi.string().required()
        }
    },
    updateMetal: {
        body: {
            name: Joi.string().required(),
            type: Joi.string().required()
        }
    }
}