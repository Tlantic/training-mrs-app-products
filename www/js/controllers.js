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

.controller('ProductCtrl', function ($scope, $http, $stateParams, $ionicLoading, constants,productService){

  $scope.pro = [];
  $scope.noMoreItemsAvailable = false;
  var from = 0;

  $scope.loadMore = function (){
    $ionicLoading.show({template: 'Carregando...'});
    productService.getAllProducts(from).then(function(response) {
      from += 10;
      if (response.length == 0) {
        $scope.noMoreItemsAvailable = true;
      }
      $scope.pro = $scope.pro.concat(response);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $ionicLoading.hide();

    });

  };

  $scope.$on('$stateChangeSuccess', function(){
    $scope.loadMore();
  });
})

.controller('ProductDetailCtrl', function ($scope, $http, $ionicModal, $stateParams, $ionicLoading, $cordovaSocialSharing, constants, productService) {

  $ionicLoading.show({template: 'Carregando...'});
    productService.getAllProductsDetails().then(function(response){
        $scope.prodetail = response;
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
    };
    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
    }, {
      scope: $scope,
      animation: 'slide-in-right'
    });

});
