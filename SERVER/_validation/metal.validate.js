const Joi = require('joi');

module.exports = {

    createMetal:{
        body: {
            name: Joi.string().optional(),
            type: Joi.string().optional()
        }
    },
    updateMetal: {
        body: {
            name: Joi.string().required(),
            type: Joi.string().required()
        }
    }
}