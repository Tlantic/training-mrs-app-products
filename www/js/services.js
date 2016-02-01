angular.module('product.services', [])
  .factory('productService',['$http','$q','constants','$stateParams',function($http, $q,constants, $stateParams) {
    var productService = {};

    productService.getAllCategories = function () {
      var deferred = $q.defer();
      $http.get(constants.URL_MONTESERRAT + 'hierarchicalstructure/1' + constants.ADAPTER_MONTERRAT)
        .success(function (response) {
          deferred.resolve(response.result);

        }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    productService.getAllProducts = function() {
      var from = 0;
      var deferred = $q.defer();
      $http.get(constants.URL_MONTESERRAT + 'hierarchicalstructure/' + $stateParams.id + '/products' + constants.ADAPTER_MONTERRAT + '&from=' + from + '&size=10')
        .success(function (response) {
          from += 10;
          deferred.resolve(response.result);

        }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    productService.getAllPromotions = function() {
      var deferred = $q.defer();
      $http.get(constants.URL_MONTESERRAT + '/hierarchicalstructure/1.011/products'+ constants.ADAPTER_MONTERRAT +'&from=60&size=10')
        .success(function (response) {
          deferred.resolve(response.result);

        }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    return productService;
  }]);



