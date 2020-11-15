var init = function () {
  loadInformation();
  $("#btnUpdate").click(() => updateInformation());
  $('#btnLogout').click(() => logout());
  $('#btnEditPassword').click(() => showPasswordForm());
  $('#btnBack').click(() => cancel());
}

var loadInformation = function () {
  const sToken = getCookie("auth_token");
  $.ajax({
    url: "http://localhost:8080/user/" + 1,
    type: 'get',
    headers: {"Authorization": sToken},
    success : function (result) {
      if (result) {
        $('#inputLogin').val(result.username);
        $('#inputMail').val(result.mail);
        sCurrentPassword = result.password;
      }
    }
  });
};

var updateInformation = function () {
  const sUsername = $('#inputLogin').val();
  const sMail = $('#inputMail').val();
  const sNewPassword = $('#inputPassword').val();
  const sConfirmNewPassword = $('#inputConfirmPassword').val();

  if (sNewPassword.length > 0 && sConfirmNewPassword.length > 0 && sNewPassword !== sConfirmNewPassword) {
    $('#message').html('Vos deux mots de passe sont différents. Veuillez réessayer');
  } else {
    const sToken = getCookie("auth_token");
    const oData = {
      id: sToken,
      username: sUsername,
      mail: sMail
    };
    if (sNewPassword.length > 0) {
      oData['password'] = sNewPassword;
    }
    $.ajax({
      url: "http://localhost:8080/user/edit",
      type: 'put',
      data: oData,
      headers: {"Authorization": "Bearer " + sToken},
      success : function (result) {
        $('#message').css('display', 'block');
        $('#message').removeClass('alert-danger').addClass('alert-success');
        $('#message').html('Changements effectués');
      }
    });
  }
};

var showPasswordForm = function () {
  $('#editPassword').show();
  $('#btnEditPassword').hide();
}

var logout = function () {
  const sToken = getCookie("auth_token");
  document.cookie = "auth_token=";
  location.href = "index.html";
};

var cancel = function () {
  location.href = "home.html"
};

$(document).ready(function () {
  init();
});

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
