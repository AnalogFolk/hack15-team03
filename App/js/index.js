var ajaxRequest =  function (url, callback){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange =  function(data){
    if (xhr.readyState != 4 || xhr.status != 200) return;
    callback(JSON.parse(xhr.responseText));
  }
  xhr.open("GET", url, true);
  xhr.send();
}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    scan: function() {
        console.log('scanning');

        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) {
            document.getElementById("info").innerHTML = result.text;

            ajaxRequest("https://api.what3words.com/w3w?key=6MF2E3SJ&string="+result.text, function(data){
              data;
                document.getElementById("info").href = "geo:"+data.position[0] +"," + data.position[1]
            });
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) {
            console.log("Scanning failed: ", error);
        } );
    }
 }
};
