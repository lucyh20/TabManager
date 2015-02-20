/* Save For Later */

function getInfo() {
  var ttl = document.title;
  var link = document.URL;

  if (window.getSelection().toString().replace(/ /g,'') != '')
  		var highlighted = window.getSelection().toString();
  
  chrome.extension.sendMessage({'title': ttl, 'url': link, 'selected': highlighted, 'importance2': true}, 
    function(response) {
      console.log(response.farewell); 
    });
  //pageDB.open(refreshVisual);
}

getInfo();