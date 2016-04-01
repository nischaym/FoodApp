var mongoose = require('mongoose');

module.exports = mongoose.model('OrderHistory', {

    foodname: String,
    price:Number,
    ordertime: {type:Date,
        default: Date.now},
});