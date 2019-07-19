var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_User = new mongoose.Schema({
    metal_id: {
        type: ObjectId,
        required: true,
        ref: 'Metal'
    },
    name: {
        type: String
    },
    tip_one: {
        type: String
    },
    tip_two: {
        type: String
    },
    tip_three: {
        type: String
    },
    comment: {
        type: String
    },
    is_approved: {
        type: Boolean,
        required: true,
        default: false
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
        ref: 'User'
    },
    updated_at: {
        type: Date,
        default: null
    },
    updated_by: {
        type: ObjectId,
        required: false,
        ref: 'User'
    }
});
module.exports = mongoose.model('Tip', Schema_User);