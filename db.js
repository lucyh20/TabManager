var pageDB = (function() {
   var tDB = {};
   var datastore = null;

   /**
	 * Open a connection to the datastore.
	 */
	tDB.open = function(callback) {
	  // Database version.
	  // (would need to upgrade version if want to modify object store)
	  var version = 1; 

	  // Open a connection to the datastore.
	  var request = indexedDB.open('tabs', version);

	  // Handle datastore upgrades.
	  // (can only create bject stores on upgradeneeded event)
	  request.onupgradeneeded = function(e) {
	    var db = e.target.result;

	    e.target.transaction.onerror = tDB.onerror;

	    // Delete the old datastore.
	    if (db.objectStoreNames.contains('tab')) {
	      db.deleteObjectStore('tab');
	    }

	    // Create a new datastore.
	    var store = db.createObjectStore('tab', {
	      keyPath: 'timestamp'
	    });
	  };

	  // Handle successful datastore access.
	  request.onsuccess = function(e) {
	    // Get a reference to the DB.
	    datastore = e.target.result;

	    // Execute the callback.
	    callback();
	  };

	  // Handle errors when opening the datastore.
	  request.onerror = tDB.onerror;
	};

	/**
	 * Fetch all of the todo items in the datastore.
	 */
	tDB.fetchTabs = function(callback) {
	  var db = datastore;
	  var transaction = db.transaction(['tab'], 'readwrite');  // 2 types of transactions are readwrite (to add data) & readonly
	  var objStore = transaction.objectStore('tab');

	  var keyRange = IDBKeyRange.lowerBound(0);
	  var cursorRequest = objStore.openCursor(keyRange);

	  var tabs = [];

	  transaction.oncomplete = function(e) {
	    // Execute the callback function.
	    callback(tabs);
	  };

	  cursorRequest.onsuccess = function(e) {
	    var result = e.target.result;

	    if (!!result == false) {
	      return;
	    }

	    tabs.push(result.value);

	    result.continue();
	  };

	  cursorRequest.onerror = tDB.onerror;
	};

	/**
	 * Create a new tab item.
	 */
	tDB.createTab = function(text, importance, highlighted, url, callback) {
	  // Get a reference to the db.
	  var db = datastore;

	  // Initiate a new transaction.
	  var transaction = db.transaction(['tab'], 'readwrite');

	  // Get the datastore.
	  var objStore = transaction.objectStore('tab');

	  // Create a timestamp for the tab item.
	  var timestamp = new Date().getTime();

	  // Create an object for the tab item.
	  var tab = {
	    'text': text,
	    'importance': importance,
	    'highlighted': highlighted,
	    'url':url,
	    'timestamp': timestamp
	  };

	  // Create the datastore request.
	  var request = objStore.put(tab);   // not .add(tab, #) ?  where second arg. is unique key to identify data

	  // Handle a successful datastore put.
	  request.onsuccess = function(e) {
	    // Execute the callback function.
	    console.log("Successfully added!")
	    callback(tab);
	  };

	  // Handle errors.
	  request.onerror = tDB.onerror;
	};

	/**
	 * Delete a tab item.
	 */
	tDB.deleteTab = function(id, callback) {
	  var db = datastore;
	  var transaction = db.transaction(['tab'], 'readwrite');
	  var objStore = transaction.objectStore('tab');

	  var request = objStore.delete(id);

	  request.onsuccess = function(e) {
	  	console.log("Successfully deleted!");
	    callback();
	  }

	  request.onerror = function(e) {
	    console.log(e);
	  }
	};

  // Export the tDB object.
  return tDB;
}());