(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'src/templates/categoriescomponent.template.html',
      bindings: {
        items: '<'
      }
    });

})();
