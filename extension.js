// Adjusted from Eric's Forager
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
		
		var title = request.title;
		var url = request.url;
		var highlighted = request.selected;
		pageDB.open();
		
		// Create relevant item in database
		if (request.importance1 == true) { //coming from content script
			pageDB.createTab(title, 1, highlighted, url, function() {});
		} else if (request.importance2 == true) {
			pageDB.createTab(title, 2, highlighted, url, function() {});
		} else if (request.importance3 == true) {
			pageDB.createTab(title, 3, highlighted, url, function() {});
		};
		// Inform visual of new tab
		chrome.runtime.sendMessage({newTab: true}, function(response) {
			console.log(response.farewell);
		});
	}
);

chrome.commands.onCommand.addListener(function(command) {
  // Call 'update' with an empty properties object to get access to the current
  // tab (given to us in the callback function).
  chrome.tabs.update({}, function(tab) {
   if (command == 'add-importance-1')
      add1();
   else if (command == 'add-importance-2')
      add2();
   else if (command == 'add-importance-3')
      add3();
  });
});

function add1() {
	chrome.tabs.query({'currentWindow': true, 'active': true}, 
		function(tabs) {
			activeId = tabs[0].id;
			chrome.tabs.executeScript(
				activeId,
      		{file: 'content.js', runAt: "document_start"}, 
      		function() {
      			chrome.tabs.remove(activeId);
      		});
		}); 
   chrome.browserAction.setIcon({path: 'green-icon.png'});
}

function add2() {
	chrome.tabs.query({'currentWindow': true, 'active': true}, 
		function(tabs) {
			activeId = tabs[0].id;
			chrome.tabs.executeScript(
				activeId,
      		{file: 'content2.js', runAt: "document_start"}, 
      		function() {
      			chrome.tabs.remove(activeId);
      		});
		}); 
   chrome.browserAction.setIcon({path: 'yellow-icon.png'});
}

function add3() {
	chrome.tabs.query({'currentWindow': true, 'active': true}, 
		function(tabs) {
			activeId = tabs[0].id;
			chrome.tabs.executeScript(
				activeId,
      		{file: 'content3.js', runAt: "document_start"},
      		function() {
      			chrome.tabs.remove(activeId);
      		});
		}); 
   chrome.browserAction.setIcon({path: 'red-icon.png'});
}

// Should make sure doubles can't be added to same group!!!