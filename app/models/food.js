const mongoose = require('mongoose');

module.exports = mongoose.model('Food', {

        foodname: {type: String, required:true},
        price: {type:Number, required: true},
        ordertime: {type:Date,
        default: Date.now}
});