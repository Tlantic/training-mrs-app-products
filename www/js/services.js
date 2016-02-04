angular.module('product.services',[])
  .factory('productService',['$http','$q','constants','$stateParams',function($http, $q, constants, $stateParams) {
    var productService = {};

    productService.getAllCategories = function () {
      var deferred = $q.defer();
      $http.get(constants.endpoint + 'hierarchicalstructure/1?adapter=customer-adapter')
        .success(function (response) {
          deferred.resolve(response.result);

        }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    productService.getAllProducts = function(from) {
      var deferred = $q.defer();
      $http.get(constants.endpoint + 'hierarchicalstructure/' + $stateParams.id + '/products?adapter=customer-adapter&from=' + from + '&size=10')
        .success(function (response) {
          deferred.resolve(response.result);

        }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    productService.getAllPromotions = function() {
      var deferred = $q.defer();
      $http.get(constants.endpoint + '/hierarchicalstructure/1.011/products?adapter=customer-adapter&from=60&size=10')
        .success(function (response) {
          deferred.resolve(response.result);

        }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    productService.getAllProductsDetails = function() {

    var deferred = $q.defer();
      $http.get(constants.endpoint + 'products/' + $stateParams.id + '?adapter=customer-adapter')
      .success(function (response) {
        deferred.resolve(response.result);

      }).error(function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

    return productService;
  }]);



