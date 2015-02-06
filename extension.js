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
      		{file: 'content.js'});
		}); 
   chrome.browserAction.setIcon({path: 'green-icon.png'});
}

function add2() {
	chrome.tabs.query({'currentWindow': true, 'active': true}, 
		function(tabs) {
			activeId = tabs[0].id;
			chrome.tabs.executeScript(
				activeId,
      		{file: 'content2.js'});
		}); 
   chrome.browserAction.setIcon({path: 'yellow-icon.png'});
}

function add3() {
	chrome.tabs.query({'currentWindow': true, 'active': true}, 
		function(tabs) {
			activeId = tabs[0].id;
			chrome.tabs.executeScript(
				activeId,
      		{file: 'content3.js'});
		}); 
   chrome.browserAction.setIcon({path: 'red-icon.png'});
}


/*var collect = function() {
	// add listeners
	function init() {
		chrome.extension.onRequest.addListener(
        function(request, sender) {
        var title = request['title'];
        var url = request['url'];
        var highlighted = request['selected'];
	 	pageDB.open();
	 	return {
	 	 	ttl:title,
	 	 	url:url,
	 	 	highlighted:highlighted,
	 	 	init:init()
	 	 }
	   });
	}
	// Create the item.
	if (request['importance1']) {
	   pageDB.createTab(title, 1, highlighted, url, function() {});
	   window.alert("Archived \"" + title + "\" as important.");
	} else if (request['importance2']) {
	   pageDB.createTab(title, 2, highlighted, url, function() {});
	   window.alert("Added \"" + title + "\" as potentially important.");
	} else if (request['importance3']) {
	   pageDB.createTab(title, 3, highlighted, url, function() {});
	   window.alert("Noted \"" + title + "\" as unimportant.");
	}

}

collect.init();*/

function init() {
   // add listeners
	chrome.extension.onRequest.addListener(
      function(request, sender) {
        var title = request['title'];
        var url = request['url'];
        var highlighted = request['selected'];
	 	 	pageDB.open();
	 	// SHOULD MAKE ALERTS LESS INTRUSIVE
	 	if (request['importance1']){
	 	 	// Create the item.
	        pageDB.createTab(title, 1, highlighted, url, function() {});
	        window.alert("Archived \"" + title + "\" as important.");
	        /* For adding user's highlighted selections of text
	        if (highlighted.replace(/ /g,'') != '') {
	        	pageDB.createTab(title, 1, highlighted, url, function() {});
	        	window.alert("Added \"" + highlighted + "\" with high importance.");
	        } else window.alert("Nothing to add.");*/
	 	} else if (request['importance2']) {
	        // Create the item
	        pageDB.createTab(title, 2, highlighted, url, function() {});
	        window.alert("Added \"" + title + "\" as potentially important.");
	        /*if (highlighted.replace(/ /g,'') != '') {
	        	pageDB.createTab(title, 2, highlighted, url, function() {});
	        	window.alert("Added \"" + highlighted + "\" with medium importance.");
	        } else window.alert("Nothing to add.");*/	
		} else if (request['importance3']) {
            // Create the item.
            pageDB.createTab(title, 3, highlighted, url, function() {});
            window.alert("Marked \"" + title + "\" as unimportant.");
            /*if (highlighted.replace(/ /g,'') != '') {
         	  pageDB.createTab(title, 3, highlighted, url, function() {});
         	  window.alert("Added \"" + highlighted + "\" with low importance.");
            } else window.alert("Nothing to add.");*/
		}
      });
}

/*function init() {
   // add listeners
	chrome.extension.onRequest.addListener(
      function(request, sender) {
         if (request['importance1']) {
            var title = request['title'];
            var url = request['url'];
            var highlighted = request['selected'];
		 	 	pageDB.open();
	         // Create the item.
	         pageDB.createTab(title, 1, highlighted, url, function() {});
	         window.alert("Archived \"" + title + "\" as important.");
	         /* For adding user's highlighted selections of text
	         if (highlighted.replace(/ /g,'') != '') {
	         	pageDB.createTab(title, 1, highlighted, url, function() {});
	         	window.alert("Added \"" + highlighted + "\" with high importance.");
	         }
	         else window.alert("Nothing to add.");*/

			/*} else if (request['importance2']) {
            var title = request['title'];
            var url = request['url'];
            var highlighted = request['selected'];
	 		   pageDB.open();
	         // Create the item
	         pageDB.createTab(title, 2, highlighted, url, function() {});
	         window.alert("Added \"" + title + "\" as potentially important.");
	         /*if (highlighted.replace(/ /g,'') != '') {
	         	pageDB.createTab(title, 2, highlighted, url, function() {});
	         	window.alert("Added \"" + highlighted + "\" with medium importance.");
	         }
	         else window.alert("Nothing to add.");*/
			
			/*} else if (request['importance3']) {
            var title = request['title'];
            var url = request['url'];
            var highlighted = request['selected'];
	 		   pageDB.open();
	         // Create the item.
	         pageDB.createTab(title, 3, highlighted, url, function() {});
	         window.alert("Marked \"" + title + "\" as unimportant.");
	         /*if (highlighted.replace(/ /g,'') != '') {
	         	pageDB.createTab(title, 3, highlighted, url, function() {});
	         	window.alert("Added \"" + highlighted + "\" with low importance.");
	         }
	         else window.alert("Nothing to add.");
			} 


      });
}

/* Should make sure doubles can't be added to same group!!! */

init();