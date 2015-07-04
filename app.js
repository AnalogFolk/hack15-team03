var s = document.createElement('script');
s.src = chrome.extention.getUrl('location.js');
s.onload = function (){
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
