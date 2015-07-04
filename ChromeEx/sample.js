// The onClicked callback function.
function onClickHandler(info, tab) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.runtime.sendMessage({greeting: "hello"});
});

ajaxRequest("http://maps.googleapis.com/maps/api/geocode/json?address=" + info.selectionText, getCoordinates);

};
chrome.contextMenus.onClicked.addListener(onClickHandler);

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
var getWord = function(data){

  console.log(data.words);
}
var getCoordinates =  function(data){
  var lat = data.results[0].geometry.location.lat;
  var lng = data.results[0].geometry.location.lng;
  ajaxRequest("https://api.what3words.com/position?key=6MF2E3SJ&position="+lat+","+lng, getWord);
}
function ajaxRequest(url, callback){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange =  function(data){
    if (xhr.readyState != 4 || xhr.status != 200) return;
    callback(JSON.parse(xhr.responseText));
  }
  xhr.open("GET", url, true);
  xhr.send();
}
