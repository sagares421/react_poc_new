const Joi = require('joi');

module.exports = {

    createTip:{
        body: {
            metal_id: Joi.string().required(),
            name: Joi.string().required(),
            tip_one: Joi.string().required(),
            tip_two: Joi.string().required(),
            tip_three: Joi.string().required(),
            comment: Joi.string().required()
        }
    },
    updateTip: {
        body: {
            name: Joi.string().required(),
            tip_one: Joi.string().required(),
            tip_two: Joi.string().required(),
            tip_three: Joi.string().required(),
            comment: Joi.string().required()
        }
    }
}