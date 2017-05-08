
angular.module('ShoppingListCheckOff', [])

    .controller('ShoppingListCheckOffController', ShoppingListCheckOffController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    .controller('ToBuyController', ToBuyController)
    .service('ToBuyService', ToBuyService)

    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('AlreadyBoughtService', AlreadyBoughtService)

ToBuyController.$inject = ['ShoppingListCheckOffService', 'ToBuyService', 'AlreadyBoughtService']
function ShoppingListCheckOffController(ShoppingListCheckOffService, ToBuyService, AlreadyBoughtService) {

    this.buy = function (index) {
        ShoppingListCheckOffService.buy(index)
    }

}

function ShoppingListCheckOffService(ToBuyService, AlreadyBoughtService) {

    this.array = [
        { name: 'Biscoito', count: 10 },
        { name: 'Lanterna', count: 15 },
        { name: 'Pasta', count: 5 },
    ]

    this.array.forEach(item => { ToBuyService.append(item) })

    this.buy = function (index) {
        ToBuyService.removeItem(index)
        AlreadyBoughtService.addItem(this.array[index])
        this.array.splice(index, 1)
    }

}

ToBuyController.$inject = ['ToBuyService']
function ToBuyController(ToBuyService) {

    this.array = ToBuyService.buys
    this.empty = function () { return ToBuyService.empty }

    this.addItem = function (item) {
        ToBuyService.addItem(item)
        this.empty = ToBuyService.empty
    }

    this.removeItem = function (index) {
        ToBuyService.removeItem(index)
        this.empty = ToBuyService.empty
    }

}

function ToBuyService() {

    this.buys = []
    this.empty = true

    this.append = function (item) {
        this.buys.push(item)
        this.empty = this.buys.length == 0
    }

    this.addItem = function (item) {
        this.buys.push(item)
        this.empty = this.buys.length == 0
    }

    this.removeItem = function (index) {
        this.buys.splice(index, 1)
        this.empty = this.buys.length == 0
    }

}

AlreadyBoughtController.$inject = ['AlreadyBoughtService']
function AlreadyBoughtController(AlreadyBoughtService) {
    
    this.array = AlreadyBoughtService.bought
    this.empty = function () { return AlreadyBoughtService.empty }

    this.addItem = function (item) {
        AlreadyBoughtService.addItem(item)
        this.empty = AlreadyBoughtService.empty
    }

    this.removeItem = function (index) {
        AlreadyBoughtService.removeItem(index)
        this.empty = AlreadyBoughtService.empty
    }

}

function AlreadyBoughtService() {

    this.bought = []
    this.empty = true

    this.addItem = function (item) {
        this.bought.push(item)
        this.empty = this.bought.length == 0
    }

    this.removeItem = function (index) {
        this.bought.splice(index, 1)
        this.empty = this.bought.length == 0
    }

}