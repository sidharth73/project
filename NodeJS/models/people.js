const mongoose = require('mongoose');

var People = mongoose.model('People',{
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
})

module.exports = People