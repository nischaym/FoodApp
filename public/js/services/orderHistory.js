angular.module('orderHistoryService', [])

    // super simple service
    // each function returns a promise object
    .factory('OrderHistory', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/order');
            },
            create : function(foodData) {
                return $http.post('/api/order', foodData);
            },
            delete : function(id) {
                return $http.delete('/api/order/' + id);
            },
            getTotal : function() {
                return $http.get('/api/totalorder');
            },
            getConsolTotal : function() {
                return $http.get('/api/consolorder');
            }


        }
    }]);