function getInfo() {
	var title = document.title;
	var link = document.URL;
	var highlighted = window.getSelection().toString();
	chrome.extension.sendRequest({'title': title, 'selected': highlighted, 'url': link, 'importance1': true});
	pageDB.open(refreshVisual);
	alert("should have added to DB");
}

getInfo();