app.controller('gameRaceController', function($scope, $state, gameValidEntriesService) {
	var validEntries = gameValidEntriesService;
	
	$scope.validEntriesLength = validEntries.length;
	$scope.userEntries = [];
	$scope.entry = {
		text: null
	};

	$scope.addEntry = function(){
		if (validEntries.indexOf($scope.entry.text) > -1) {
			$scope.userEntries.push(angular.copy($scope.entry));
		}
		$scope.entry.text = null;
	};

});