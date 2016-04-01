//var FoodMenu = require('./models/foodmenu');
//
////function getFoods(res) {
////    Food.find(function (err, foods) {
////
////        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
////        if (err) {
////            res.send(err);
////        }
////
////        res.json(foods); // return all foods in JSON format
////    });
////}
////;
//
//function getFoodMenu(res) {
//    FoodMenu.find(function (err, foodmenu) {
//
//        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//        if (err) {
//            res.send(err);
//        }
//
//        res.json(foodmenu); // return all foods in JSON format
//    });
//}
//;
//
//
//
//
//module.exports = function (app) {
//
//    app.post('/api/foodmenu', function (req, res) {
//
//        // create a food, information comes from AJAX request from Angular
//        FoodMenu.create({
//            foodname: req.body.text,
//            price: req.body.price,
//            done: false
//        }, function (err, food) {
//            if (err)
//                res.send(err);
//
//            // get and return all the foods after you create another
//            getFoodMenu(res);
//        });
//
//    });
//
//
//};