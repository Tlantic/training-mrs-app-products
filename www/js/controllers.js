angular.module('product.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('PromocoesCtrl', function($scope, $http, $stateParams, $ionicLoading) {
  var promocoes = [];
  function Promocoes(){
    $http.get('http://52.17.194.187/orgs/monteserrat/apps/customer/hierarchicalstructure/1.011/products?adapter=customer-adapter&from=60&size=10')
      .then(function(response){
        for (var i = 0; i < response.data.result.length; i++) {
          promocoes.push({
            name: response.data.result[i].name,
            id: response.data.result[i].id,
            brand: response.data.result[i].brand,
            price: response.data.result[i].price,
            currency: response.data.result[i].currency,
            image: response.data.result[i].image,
            hdpi:response.data.result[i].images.hdpi
          });
        }
    $scope.promo = promocoes;
      });
  }

  Promocoes();
})

.controller('CategoryCtrl', function($scope, $http) {

  $http.get('http://52.17.194.187/orgs/monteserrat/apps/customer/hierarchicalstructure/1?adapter=customer-adapter').then(function (response) {

    var categories = [];
    for (var i = 0; i < response.data.result.length; i++) {
      categories.push({
        id: response.data.result[i].id,
        name: response.data.result[i].name
      });
    }
    $scope.cat = categories;
  });

})

.controller('ProductCtrl', function ($scope, $http, $stateParams, $ionicLoading) {

  var from = 0;
  var products = [];
  $scope.noMoreItemsAvailable = false;
  $ionicLoading.show({template: 'Carregando...'});

  $scope.loadMore = function() {

    $http.get('http://52.17.194.187/orgs/monteserrat/apps/customer/hierarchicalstructure/' + $stateParams.id + '/products?adapter=customer-adapter&from=' + from + '&size=10')
      .then(function (response) {

      from += 10;
      $scope.$broadcast('scroll.infiniteScrollComplete');

      for (var i = 0; i < response.data.result.length; i++) {
        products.push({
          name: response.data.result[i].name,
          id: response.data.result[i].id,
          brand: response.data.result[i].brand,
          price: response.data.result[i].price,
          currency: response.data.result[i].currency,
          image: response.data.result[i].image,
          hdpi:response.data.result[i].images.hdpi,
          xhdpi:response.data.result[i].images.xhdpi

        });
      }
      if (response.data.result.length == []) {
        $scope.noMoreItemsAvailable = true;
      }

      $scope.pro = products;
      $ionicLoading.hide();
    });

  };

  $scope.$on('$stateChangeSuccess', function(){
    $scope.loadMore();
  });
})

.controller('ProductDetailCtrl', function ($scope, $http, $ionicModal, $stateParams, $ionicLoading, $cordovaSocialSharing) {

  function productDetail() {
    $ionicLoading.show({template: 'Carregando...'});
    $http.get('http://52.17.194.187/orgs/monteserrat/apps/customer/products/' + $stateParams.id + '?adapter=customer-adapter')
      .then(function (response) {
        $scope.prodetail = response.data.result;
      }, function (err) {
        console.log('err');
      });
    $ionicLoading.hide();


    $scope.shareViaTwitter = function (prodetail) {
      $cordovaSocialSharing.shareViaTwitter(prodetail.name, prodetail.image)
        .then(function (result) {

        }, function (error) {

        });
    };

    $scope.shareViaFacebook = function (prodetail) {
      $cordovaSocialSharing.shareViaFacebook(prodetail.name, prodetail.image)
        .then(function (result) {
          // Success!
        }, function (err) {
          alert('Não foi possível partilhar!')
        });
    }

  }
  $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  productDetail();

});
