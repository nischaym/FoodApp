angular.module('foodController', [])

	// inject the Food service factory into our controller
	.controller('mainController', ['$scope','$http','Foods','FoodMenu','OrderHistory',function($scope, $http, Foods,FoodMenu,OrderHistory) {
		$scope.menu = {};
        $scope.formData = {};
        $scope.total = 0;
		$scope.loading = true;
        $scope.totalsales = 0;
        $scope.ordersconsol= {};
        $scope.sortByName = true;
        $scope.sortByPrice = true;
        $scope.sortByDate = true;
        $scope.sortByCount = true;
        $scope.sortBySales = true;
        var sort_by = function(field, reverse, primer){

            var key = primer ?
                function(x) {return primer(x[field])} :
                function(x) {return x[field]};

            reverse = !reverse ? 1 : -1;

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        };
		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
                console.log(data);
			});

        Foods.getTotal()
            .success(function(data) {
                $scope.total = data[0].total;
                //$scope.loading = false;
                console.log(data);
            });

        FoodMenu.get()
            .success(function(data) {
                $scope.foodsmenu = data;
                $scope.loading = false;
                console.log(data);
            });

        OrderHistory.get()
            .success(function(data) {
            $scope.orders = data;
            $scope.loading = false;
            console.log(data);
        });

        OrderHistory.getTotal()
            .success(function(data) {
                $scope.totalsales = data[0].total;
                $scope.loading = false;
                console.log(data);
            });

        OrderHistory.getConsolTotal()
            .success(function(data) {
                $scope.ordersconsol = data;
                $scope.loading = false;
                console.log("blah blah");
                console.log(data);
            });
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined ) {
				$scope.loading = true;
                console.log($scope.formData);
				//console.log($scope.formData.text);
				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new foods
					.success(function(data) {
                        console.log(data);
                        $scope.loading = false;
                        if(data === "Not Found in Menu")
                        {
                            alert("Not Found in Menu");
                        }
                        else
                        {
                            $scope.formData = {}; // clear the form so our user is ready to enter another
                            $scope.foods = data; // assign our new list of foods
                            Foods.getTotal()
                                .success(function(data) {
                                    $scope.total = data[0].total;
                                    //$scope.loading = false;
                                    console.log(data);
                                });
                        }
					});
			}
            else
            {
                alert("Please Enter the data correctly")
            }
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new foods
				.success(function(data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of foods

                    Foods.getTotal()
                        .success(function(data) {
                            $scope.total = data[0].total;
                            //$scope.loading = false;
                            console.log(data);
                        });
                    OrderHistory.get()
                        .success(function(data) {
                            $scope.orders = data;
                            $scope.loading = false;
                            console.log(data);
                        });
                    OrderHistory.getTotal()
                        .success(function(data) {
                            $scope.totalsales = data[0].total;
                            $scope.loading = false;
                            console.log(data);
                        });
                    OrderHistory.getConsolTotal()
                        .success(function(data) {
                            $scope.ordersconsol = data;
                            $scope.loading = false;
                            console.log("blah blah");
                            console.log(data);
                        });
				});
		};


        $scope.sortFoodByName = function () {
            if($scope.sortByName === true)
            {
                $scope.sortByName = false;
            }
            else
            {
                $scope.sortByName = true;
            }
            // Sort by price high to low
            $scope.orders.sort(sort_by('foodname', $scope.sortByName, String));

        };

        $scope.sortFoodByPrice = function () {
            if($scope.sortByPrice === true)
            {
                $scope.sortByPrice = false;
            }
            else
            {
                $scope.sortByPrice = true;
            }
            // Sort by price high to low
            $scope.orders.sort(sort_by('price', $scope.sortByPrice, parseInt));

        };

        $scope.sortFoodByDate = function () {
            if($scope.sortByDate === true)
            {
                $scope.sortByDate = false;
            }
            else
            {
                $scope.sortByDate = true;
            }
            // Sort by price high to low
            $scope.orders.sort(sort_by('ordertime', $scope.sortByDate, String));

        };

        $scope.sortOrderByCount = function () {
            if($scope.sortByCount === true)
            {
                $scope.sortByCount = false;
            }
            else
            {
                $scope.sortByCount = true;
            }
            // Sort by price high to low
            $scope.ordersconsol.sort(sort_by('count', $scope.sortByCount, parseInt));

        };
        $scope.sortOrderBySales = function () {
            if($scope.sortBySales === true)
            {
                $scope.sortBySales = false;
            }
            else
            {
                $scope.sortBySales = true;
            }
            // Sort by price high to low
            $scope.ordersconsol.sort(sort_by('amt', $scope.sortBySales));

        };
        // CREATE MENU ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createMenuFood = function() {

            // if form is empty, nothing will happen
            if ($scope.menu.foodname != undefined && $scope.menu.price != undefined && !isNaN($scope.menu.price)) {
                $scope.loading = true;
                console.log($scope.menu);

                // call the create function from our service (returns a promise object)
                FoodMenu.create($scope.menu)

                    // if successful creation, call our get function to get all the new foods
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.menu = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                        $scope.foodsmenu = data; // assign our new list of foods
                    });
            }
            else
            {
                alert("Please Enter the data correctly")
            }
        };

        $scope.deleteMenuFood = function(id) {
            $scope.loading = true;
            FoodMenu.delete(id)
                // if successful creation, call our get function to get all the new foods
                .success(function(data) {
                    $scope.loading = false;
                    console.log("delete");
                    console.log(data);
                    $scope.foodsmenu = data; // assign our new list of foods
                });
        };

        $scope.SelectFood = function(index) {
            $scope.loading = true;
            //console.log("select")
            FoodMenu.get()
                .success(function(data) {
                    $scope.menu = data[index];
                    $scope.loading = false;
                    console.log(data[index]);
                });
        };

        $scope.updateMenuFood = function(){

            if($scope.menu.foodname !== undefined && $scope.menu.price !== undefined && !isNaN($scope.menu.price) )
            {
                //var menu1 = {_id:$scop}
                FoodMenu.update($scope.menu)
                    .success(function(data) {
                        $scope.loading = false;
                        console.log("update");
                        console.log(data);
                        $scope.foodsmenu = data; // assign our new list of foods
                        $scope.menu = {};
                    });

            }
        }
	}]);