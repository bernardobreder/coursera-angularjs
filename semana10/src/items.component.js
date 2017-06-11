(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/templates/itemscomponent.template.html',
      bindings: {
        items: '<'
      }
    });

})();
