/*** FROM http://www.elated.com/articles/javascript-tabs/ ***/

window.addEventListener("load", init);

var tabLinks = new Array();
var contentDivs = new Array();

// Set up the tabs:
function init() {
    // Grab the tab links & content divs from the page.
	var tabListItems = document.getElementById('tabs').childNodes;
	for (var i = 0; i < tabListItems.length; i++) {
		if (tabListItems[i].nodeName == "li") {
			var tabLink = getFirstChildWithTagName(tabListItems[i], 'a');
			var id = getHash(tabLink.getAttribute('href'));
			tabLinks[id] = tabLink;
			contentDivs[id] = document.getElementById(id);
		}
	}
	// Assign onclick events to the tab links, & highlight the first tab.
	var i = 0;
	for (var id in tabLinks) {
		tabLinks[id].onclick = showTab;
		tabLinks[id].onfocus = function() { this.blur() };
		if (i == 0) tabLinks[id].className = 'selected';
		i++;
	}
	// Hide all content divs except the first.
	var i = 0;
	for (var id in contentDivs) {
		if (i != 0) contentDivs[id].className = 'tabContent hide';
		i++;
	}
}

// For when a tab link is clicked:
function showTab() {
	var selectedId = getHash(this.getAttribute('href'));
	// Highlight the selected tab & dim all others; 
	// show the selected content div & hide all others.
	for (var id in contentDivs) {
		if (id == selectedId) {
			tabLinks[id].className = 'selected';
			contentDivs[id].className = 'tabContent';
		} else {
			tabLinks[id].className = '';
			contentDivs[id].className = 'tabContent hide';
		}
	}
	// Stop the browser following the link
	return false;
}

// Retreive a link element inside each list item in the tabs list for init()
function getFirstChildWithTagName(element, tagName) {
	for (var i = 0; i < element.childNodes.length; i++) {
		if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
	}
}

//  Return portion of URL after a hash symbol for init() and showTab()
function getHash(url) {
	var hashPos = url.lastIndexOf('#');
	return url.substring(hashPos + 1);
}
