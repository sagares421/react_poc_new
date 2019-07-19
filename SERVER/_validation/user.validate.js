const Joi = require('joi');

module.exports = {

    createUser:{
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            role: Joi.string().required(),
            email: Joi.string().email().required()
        }
    },
    updateUser: {
        body: {
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            phone: Joi.string().optional(),
            email: Joi.string().email().optional(),
            rating: Joi.object({
                one:Joi.string().optional(),
                two:Joi.string().optional(),
                three:Joi.string().optional(),
                four:Joi.string().optional(),
                five:Joi.string().optional()
            }).optional(),
            address: Joi.object({
                city:Joi.string().optional(),
                state:Joi.string().optional(),
                country:Joi.string().optional(),
                zip:Joi.string().optional(),
                address1:Joi.string().optional(),
                address2:Joi.string().optional()
            }).optional()
        }
    },
    updateUserRating: {
        body: {
            type: Joi.number().optional()
        }
    },
    createAdvisor:{
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            role: Joi.string().required().default('Advisor'),
            email: Joi.string().email().required()
        }
    },
    updateAdvisor:{
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required()
        }
    }
}