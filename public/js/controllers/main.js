angular.module('foodController', [])

	// inject the Food service factory into our controller
	.controller('mainController', ['$scope','$http','Foods','FoodMenu',function($scope, $http, Foods,FoodMenu) {
		$scope.menu = {};
        $scope.formData = {};
        $scope.total = 0;
		$scope.loading = true;

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
				});
		};


        $scope.sortFood = function () {

            function dynamicSortMultiple() {
                /*
                 * save the arguments object as it will be overwritten
                 * note that arguments object is an array-like object
                 * consisting of the names of the properties to sort by
                 */
                var props = arguments;
                return function (obj1, obj2) {
                    var i = 0, result = 0, numberOfProperties = props.length;
                    /* try getting a different result from 0 (equal)
                     * as long as we have extra properties to compare
                     */
                    while(result === 0 && i < numberOfProperties) {
                        result = dynamicSort(props[i])(obj1, obj2);
                        i++;
                    }
                    return result;
                }
            }

            if($scope.foods == undefined)
            {
                // do Nothing
                alert("No Items");
            }
            else
            {
                console.log($scope.foods.sort());
            }
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