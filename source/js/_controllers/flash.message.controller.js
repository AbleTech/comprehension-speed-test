app.controller('flashMessageController', function($scope, $sce, $state, flashMessagesService) {
	/*
	flashMessagesService.add({
		id: 'some_id',
		type: 'info|error|warning|success',
		heading: 'Oh dear',
		description: 'An error occurred.'
		list: ['Apples', 'Oranges', 'Something else']
	})
	*/
	$scope.flashMessages = flashMessagesService.messageList;
	$scope.to_trusted = function(html_code) {
    	return $sce.trustAsHtml(html_code);
	};
	$scope.closeMessage = function(i){
		flashMessagesService.messageList.splice(i,1);
	};
	$scope.isVisibile = function(i){
		var message = flashMessagesService.messageList[i];
		if (message.visibility){
			if (message.visibility == $state.$current.name) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};

});