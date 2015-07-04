(function(){
var scanner = cordova.require("cordova/plugin/BarcodeScanner");
scanner.scan( function (result) {
     if (args.format == "QR_CODE") {
      alert(args.text)
     }
}
}());
