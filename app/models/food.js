var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {

        foodname: String,
        default: '',
        price:Number,
        default:0,
        customername: {type :String,
        default: 'table 1'},
        ordertime: {type:Date,
        default: Date.now},
});