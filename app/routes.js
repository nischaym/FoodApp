var Food = require('./models/food');
var FoodMenu = require('./models/foodmenu');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all foods in JSON format
    });
}
;

function getFoodMenu(res) {
    FoodMenu.find(function (err, foodmenu) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foodmenu); // return all foods in JSON format
    });
}
;




module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all foods in the database
        getFoods(res);
    });

    //to Get Total

    app.get('/api/total', function (req, res) {
        // use mongoose to get all foods in the database
        // create a food, information comes from AJAX request from Angular
        Food.aggregate({ $group: {
            _id: null,
            totalsum: {
                $sum: "$price"
            }
        } }, function (err, total1) {
            if (err)
                res.send(err);

            if(total1.length == 0)
            {
               var t = 0;
            }
            else
            {
                var t = total1[0].totalsum +((total1[0].totalsum * 7.5)/100);
            }

            var newTotal = [
                {total:t}
            ];

            res.json(newTotal);
            // get and return all the foods after you create another
            //getFoods(res);
        });

    });

    // create food and send back all foods after creation
    app.post('/api/foods', function (req, res) {

        // create a food, information comes from AJAX request from Angular

        FoodMenu.find({foodname:req.body.text},function (err, foodmenu) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            else {
                if (foodmenu.length === 0) {

                    res.send("Not Found in Menu");
                }
                else
                {
                    console.log(foodmenu);
                    var foodprice = foodmenu[0].price;
                    Food.create({
                        foodname: req.body.text,
                        price: foodprice,
                        done: false
                    }, function (err, food) {
                        if (err)
                            res.send(err);

                        // get and return all the foods after you create another
                        getFoods(res);
                    });
                }
            }
        });


    });

    // delete a food
    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    //*****************************
    // MENU
    //*****************************

    app.get('/api/foodmenu', function (req, res) {
        // use mongoose to get all foods in the database
        getFoodMenu(res);
    });



    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    app.post('/api/foodmenu', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        FoodMenu.create({
            foodname: req.body.foodname,
            price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoodMenu(res);
        });

    });

    // delete a food
    app.delete('/api/foodmenu/:food_id', function (req, res) {
        FoodMenu.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoodMenu(res);
        });
    });

    app.put('/api/foodmenu/update/', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        FoodMenu.findByIdAndUpdate(req.body._id,{$set: {
            foodname: req.body.foodname,
            price: req.body.price,
            //done: false
        }}, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoodMenu(res);
        });

    });
};