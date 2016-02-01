angular.module('product.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('PromocoesCtrl', function($scope, $http, $stateParams, $ionicLoading, constants, productService) {
  $ionicLoading.show({template: 'Carregando...'});
      productService.getAllPromotions().then(function(response){
      console.log(response);
        $scope.promo = response;
      $ionicLoading.hide();
    });
})

.controller('CategoryCtrl', function($scope, $http, $ionicLoading, constants, productService) {
  $ionicLoading.show({template: 'Carregando...'});
  productService.getAllCategories().then(function (response) {
    $scope.cat = response;
    $ionicLoading.hide();
  });
})

.controller('ProductCtrl', function ($scope, $http, $stateParams, $ionicLoading, constants, productService){
  $scope.noMoreItemsAvailable = false;

  $scope.loadMore = function () {
    $ionicLoading.show({template: 'Carregando...'});
    productService.getAllProducts().then(function(response) {
      if (response.length == []) {
        $scope.noMoreItemsAvailable = true;
      }

      $scope.pro = response;
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $ionicLoading.hide();
    });
  };

  $scope.$on('$stateChangeSuccess', function(){
    $scope.loadMore();
  });
})

.controller('ProductDetailCtrl', function ($scope, $http, $ionicModal, $stateParams, $ionicLoading, $cordovaSocialSharing, constants) {

  function productDetail() {
    $ionicLoading.show({template: 'Carregando...'});
    $http.get(constants.URL_MONTESERRAT + 'products/' + $stateParams.id + constants.ADAPTER_MONTERRAT)
      .then(function (response) {
      $scope.prodetail = response.data.result;
      $ionicLoading.hide();
      }, function (err) {
        console.log('err');
      });

    $scope.shareViaTwitter = function (prodetail) {
      $cordovaSocialSharing.shareViaTwitter(prodetail.name, prodetail.image)
        .then(function (result) {

        }, function (err) {
            alert('Por favor instalar a Aplicação Twitter');
        });
    };

    $scope.shareViaFacebook = function (prodetail) {
      $cordovaSocialSharing.shareViaFacebook(prodetail.name, prodetail.image)
        .then(function (result) {

        }, function (err) {
          alert('Por favor instalar a Aplicação Facebook');
        });
    }

  }
    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-right'
    });

  productDetail();

});
