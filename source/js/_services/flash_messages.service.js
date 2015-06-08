app.service('flashMessagesService', function(){
	var flashMessages = {
		messageList: [],
		hasFlashMessageWithId: function(id) {
			var result = false
			if (this.messageList.length) {
				for (i in this.messageList) {
					if (this.messageList[i].id == id) {
						result = true
					}
				}
			}
			return result;
		},
		add: function(flashMessageObj) {
			if (this.hasFlashMessageWithId(flashMessageObj.id) == false) {
				this.messageList.push(flashMessageObj);
			}
		}
	};
	return flashMessages;
});