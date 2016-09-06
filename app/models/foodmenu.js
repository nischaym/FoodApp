//var mongoose = require('mongoose');
var mongoose_menu = require('mongoose');


module.exports = mongoose_menu.model('FoodMenu', {

    foodname: {type: String, required:true},
    price: {type: Number, required:true}
});