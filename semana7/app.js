
angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController)
    
LunchCheckController.$inject = ['$scope']
function LunchCheckController($scope) {

	$scope.input = ""
	$scope.msg = ""
	
    $scope.click = function() {
		var input = $scope.input.trim().split(',').map(e=>e.trim()).filter(e=>e.length > 0)
	
		if (input.length == 0) {	
			return $scope.msg = "Please enter data first"
		}
		
		$scope.input = ""
		
		if (input.length <= 3) {
			$scope.msg = 'Enjoy!'
		} else {
			$scope.msg = 'Too much!'
		}
	}

}
