angular.module('foodMenuService', [])

    // super simple service
    // each function returns a promise object
    .factory('FoodMenu', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/foodmenu');
            },
            create : function(foodData) {
                return $http.post('/api/foodmenu', foodData);
            },
            delete : function(id) {
                return $http.delete('/api/foodmenu/' + id);
            },
            update : function(updatemenu) {
                return $http.put('/api/foodmenu/update/', updatemenu);
            }

        }
    }]);