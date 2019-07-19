var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_User = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    role: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    rating: {
        one: {
            type: Number,
            default: null
        },
        two: {
            type: Number,
            default: null
        },
        three: {
            type: Number,
            default: null
        },
        four: {
            type: Number,
            default: null
        },
        five: {
            type: Number,
            default: null
        }
    },
    address: {
        city: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        zip: {
            type: String,
            default: null
        },
        address1: {
            type: String,
            default: null
        },
        address2: {
            type: String,
            default: null
        }
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    created_by: {
        type: ObjectId,
        required: true,
        ref: 'User',
        default: '5d317134b138a118290ef5e4'
    },
    updated_at: {
        type: Date,
        default: null
    },
    updated_by: {
        type: ObjectId,
        required: false,
        ref: 'User',
        default: '5d317134b138a118290ef5e4'
    }
});
module.exports = mongoose.model('User', Schema_User);