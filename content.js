function getInfo() {
	var ttl = document.title;
	var link = document.URL;
	var highlighted = window.getSelection().toString();
	chrome.extension.sendRequest({'title': ttl, 'selected': highlighted, 'url': link, 'importance1': true});

	/* Allow title & URL [& the selection of of text user highlighted on webpage] 
	// to be available elsewhere (a.k.a. public, not private variables) 
	return {
		ttl:ttl,
		link:link,
		//highlighted:highlighted
		send:sendInfo
	}*/

}

getInfo();