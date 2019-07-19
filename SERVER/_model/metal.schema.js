var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_Metal = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
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
module.exports = mongoose.model('Metal', Schema_Metal);