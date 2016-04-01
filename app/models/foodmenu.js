//var mongoose = require('mongoose');
var mongoose_menu = require('mongoose');


module.exports = mongoose_menu.model('FoodMenu', {

    foodname: String,
    default: '',
    price:Number,
    default:0
});