$.get(chrome.extension.getURL('/template.html'), function(data) {
  //  $(data).appendTo('body');
    // Or if you're using jQuery 1.8+:
     $($.parseHTML(data)).appendTo('body');
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var words = request[0] +"."+request[1] +"."+request[2]
    $("#word1").html(request[0]);
    $("#word2").html(request[1]);
    $("#word3").html(request[2]);
    $("#qrCode").attr("src","https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + words);
    $('#myModal').modal('show');

  });
