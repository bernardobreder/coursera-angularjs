(function () {
    'use strict'
    angular.module('app', []).controller('controller', ($scope) => {
        $scope.name = 'Bernardo'
        $scope.sayHello = () => 'Hello'
    })
})()

