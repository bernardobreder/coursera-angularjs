(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', MenuFoundItemsListDirective);

    function MenuFoundItemsListDirective() {
        var ddo = {
            templateUrl: 'foundItemsList.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: MenuFoundItemsListDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return ddo;
    }

    function MenuFoundItemsListDirectiveController() {
        var menu = this;

        menu.itemIsNotInList = function () {
            if (menu.found != undefined && menu.found.length == 0) {
                return true;
            }
            return false;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";

        ctrl.searchByTerm = function (searchTerm) {
            if (searchTerm == "") {
                return ctrl.found = [];
            }
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function (response) {
                    ctrl.found = response;
                }).catch(function (error) {
                    console.log("[AT CONTROLLER] error: ", error);
                })
        };

        ctrl.removeItem = function (itemIndex) {
            ctrl.found.splice(itemIndex, 1);
            if (ctrl.found.length == 0) {
                ctrl.found = undefined;
                ctrl.searchTerm = "";
            }
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {

        this.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                console.log(result)
                var objMenuItems = result.data;
                var aMenuItems = result.data.menu_items;
                var foundItems = [];
                for (var i = 0; i < aMenuItems.length; i++) {
                    var menuItem = aMenuItems[i];
                    var aDescrItens = menuItem.description.split(' ');
                    for (var j = 0; j < aDescrItens.length; j++) {
                        if (searchTerm.toLowerCase() == aDescrItens[j]) {
                            foundItems.push(aMenuItems[i]);
                            break;
                        }
                    }
                }
                return foundItems;
            }).catch(function (error) {
                console.log("[AT SERVICE] erro: ", error);
            });
        }
    }

}());