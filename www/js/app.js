angular.module('product', ['ngCordova', 'dcbImgFallback', 'ionic', 'product.controllers', 'product.services', 'product.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: '/',
    controller:'HomeCtrl',
    controllerAs:'home',
    templateUrl: 'templates/home.html'
  })

  .state('category', {
    url: '/categories',
    controller: 'CategoryCtrl',
    controllerAs:'categories',
    templateUrl: 'templates/category.html'
    })

  .state('products', {
    url: '/products/:id',
    templateUrl: 'templates/products.html'
  })
  .state('product-detail', {
    url: '/product-detail/:id',
    templateUrl: 'templates/product-detail.html'
  })

  .state('promocoes', {
    url: '/promocoes',
    templateUrl: 'templates/promocoes.html',
    controller:'PromocoesCtrl',
    controllerAs:'promo'
  });

  $urlRouterProvider.otherwise('/');

})

.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});


