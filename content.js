
/* Archive */

function getInfo() {
	var title = document.title;
	var link = document.URL;
	var highlighted = "";
    
  if (window.getSelection().toString().replace(/ /g,'') != '')
  	var highlighted = window.getSelection().toString();

	chrome.extension.sendMessage({'title': title, 'selected': highlighted, 'url': link, 'importance1': true}, 
    function(response) {
      console.log(response.farewell); 
    });
	//pageDB.open(refreshVisual);
}

getInfo();


/* From Eric's...

function getInfo() {
  var ttl = document.title;
  var link = document.URL;
  var highlighted = "";
  if (window.getSelection().toString().replace(/ /g,'') != '')
  		var highlighted = window.getSelection().toString();

  chrome.runtime.sendMessage({title: ttl, url: link, selected: highlighted, importance1: true}, function(response) {
	  console.log(response.farewell);
	});
}

getInfo(); */