angular.module('product.services', [])

.factory('Products', function() {
  
  return {
    all: function() {
      return products;
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
});

