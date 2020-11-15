var init = function() {
  $("#btnLogout").click(() => logout());
};

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

$(document).ready(function(){
  init();
});
