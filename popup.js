// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Handle the bookmark form submit event
    document.getElementById('newSearch').addEventListener('submit', function() {
      var query = document.getElementById('query').value;
      //open new Google window
      chrome.windows.create({'url': 'https://www.google.com/search?q=' + query, 
      'focused': true}, function(window) {} );
    });
    /* NOT WORKING
    return {
      query:query
    }*/

    // //add to list
    // chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    //   var tabList = document.getElementById('high-priority');
    //   tabList.innerHTML = '';

    //   var a = document.createElement('a');
    //   a.className = "list-group-item";
    //   var checkbox = document.createElement('input');
    //   checkbox.type = "checkbox";
    //   checkbox.className = "tab-checkbox";
    //   // checkbox.setAttribute("data-id", tab.timestamp);

    //   a.appendChild(checkbox);

    //   var span = document.createElement('span');
    //   span.innerHTML = tab.text;

    //   a.appendChild(span);

    //   tabList.appendChild(a);
    // });


    //IndexedDB stuff

    pageDB.open(refreshTabs);
    //pageDB.open(refreshVisual);

    // // Get references to the form elements.
    // var newTabForm = document.getElementById('newSearch');
    // var newTabInput = document.getElementById('query');

    // // Handle new todo item form submissions.
    // newTabForm.onsubmit = function() {
    //   // Get the todo text.
    //   var text = newTabInput.value;
    //   var priority = 1;

    //   // Check to make sure the text is not blank (or just spaces).
    //   if (text.replace(/ /g,'') != '') {
    //     // Create the todo item.
    //     pageDB.createTab(text, 1, function(tab) {
    //       refreshTabs();
    //     });
    //   }

    //   // Reset the input field.
    //   newTabInput.value = '';

    //   // Don't send the form.
    //   return false;
    // };
});

// Update the list of todo items.
function refreshTabs() {  
  pageDB.fetchTabs(function(tabs) {
    var tabList1 = document.getElementById('high-priority');
    tabList1.innerHTML = '';
    var tabList2 = document.getElementById('medium-priority');
    tabList2.innerHTML = '';
    var tabList3 = document.getElementById('low-priority');
    tabList3.innerHTML = '';

    /*var researchTopic = document.getElementById('query');
    researchTopic.value = query;

    /*var important = false,
        potential = false,
        unimportant = false;*/

    // If there are no tabs in the list, tell the user how to fill them.
    if (tabs.length == 0) {
      var add1 = document.createElement('p');
      add1.innerHTML = 'Use Alt+1 to mark tabs as important.';
      add1.className = 'empty';
      tabList1.appendChild(add1);

      var add2 = document.createElement('p');
      add2.innerHTML = 'Use Alt+2 to mark tabs as potentially important.';
      add2.className = 'empty';
      tabList2.appendChild(add2);

      var add3 = document.createElement('p');
      add3.innerHTML = 'Use Alt+3 to mark tabs as unimportant.';
      add3.className = 'empty';
      tabList3.appendChild(add3);
    }

    for(var i = 0; i < tabs.length; i++) {
      // Read the tab items backwards (most recent first).
      var tab = tabs[tabs.length - i - 1];

      var a = document.createElement('a');
      a.id = 'tab-' + tab.timestamp;
      a.className = "list-group-item";

      // Remove button
      var remove = document.createElement('button');
      remove.className = 'glyphicon glyphicon-remove';
      remove.innerHTML = '';
      remove.setAttribute("data-id", tab.timestamp);

      a.appendChild(remove);

      // Title of webpage appears as link to webpage
      var info = document.createElement('a');
      info.innerHTML = tab.text;
      info.href = tab.url;
      info.target = "_blank";
      info.id = "clip";

      a.appendChild(info);

      var space = document.createElement('span')
      space.innerHTML = '&nbsp;&nbsp;'

      a.appendChild(space);

      
      if (tab.importance == 1) {
        tabList1.appendChild(a);
        //important = true;
      } else if (tab.importance == 2) {
        tabList2.appendChild(a);
        //potential = true;
      } else if (tab.importance == 3) {
        tabList3.appendChild(a);
        //unimportant = false;
      }

      /*if (!important) {
        var add1 = document.createElement('p');
        add1.innerHTML = 'No tabs marked as important.';
        add1.className = 'empty';
        tabList1.appendChild(add1);
      }
      if (!potential) {
        var add2 = document.createElement('p');
        add2.innerHTML = 'No tabs marked as potentially important.';
        add2.className = 'empty';
        tabList2.appendChild(add2);
      }
      if (!unimportant) {
        var add3 = document.createElement('p');
        add3.innerHTML = 'No tabs marked as unimportant.';
        add3.className = 'empty';
        tabList3.appendChild(add3);
      }*/

      remove.addEventListener('click', function(e) {
        var id = parseInt(e.target.getAttribute('data-id'));
        pageDB.deleteTab(id, refreshTabs);
        //pageDB.open(refreshVisual);
      });

      /*Setup an event listener for the checkbox.
      x.addEventListener('click', function(e) {
        var id = parseInt(e.target.getAttribute('data-id'));

        pageDB.deleteTab(id, refreshTabs);
      });*/
    }

  });
}
