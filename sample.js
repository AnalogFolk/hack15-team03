// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    //alert("item " + info.menuItemId + " was clicked");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange =  function(data){
      if (xhr.readyState != 4 || xhr.status != 200) return;
      console.log(xhr.responseText)
    }
; // Implemented elsewhere.
    xhr.open("GET", "http://maps.googleapis.com/maps/api/geocode/json?address=" + info.selectionText, true);
    xhr.send();
    console.log(xhr.responseText);
    //alert("tab: " + JSON.stringify(tab));
};
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["selection","link","editable"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
  }
});
