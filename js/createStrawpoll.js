var init = function() {
  $("#btnAdd").click(() => addOption());
  $("#btnLogout").click(() => logout());
  $("#btnRemove").click(() => removeOption());
};

var addOption = function () {
  const optionNumber = $('#options').children().length + 1;
  if (optionNumber > 2) {
    $("#btnRemove").prop('disabled', false);
  }
  $('#options').append('<div class="form-group">' +
  '<label for="inputLogin">Option ' + optionNumber + '</label>' +
  '<input type="text" class="form-control" id="inputLogin" required>' +
  '</div>');
};

var removeOption = function () {
  const optionsNumber = $('#options').children().length;
  if (optionsNumber > 2) {
    $('#options').children().eq(optionsNumber - 1).remove();
    if (optionsNumber === 3) {
      $("#btnRemove").prop('disabled', true);
    }
  }
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
