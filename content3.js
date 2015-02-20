/* Not Important */

function getInfo() {
  var ttl = document.title;
  var link = document.URL;
  
  if (window.getSelection().toString().replace(/ /g,'') != '')
  		var highlighted = window.getSelection().toString();

  chrome.extension.sendMessage({'title': ttl, 'url': link, 'selected': highlighted, 'importance3': true}, 
    function(response) {
      console.log(response.farewell); 
    });
  //pageDB.open(refreshVisual);
}

getInfo();