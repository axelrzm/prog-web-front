var init = function() {
  $("#btnLogout").click(() => logout());
};

var logout = function () {
  const sToken = getCookie("auth_token");
  document.cookie = "auth_token=";
  location.href = "index.html";
};

var getCookie = function (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

$(document).ready(function(){
  init();
});
