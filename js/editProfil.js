var init = function () {
  loadInformation();
  $("#btnUpdate").click(() => updateInformation());
  $('#btnLogout').click(() => logout());
  $('#btnEditPassword').click(() => showPasswordForm());
  $('#btnBack').click(() => cancel());
  $('#btnDelete').click(() => deleteUser());
}

var loadInformation = function () {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/user/information",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
        $('#inputLogin').val(result.username);
        $('#inputMail').val(result.mail);
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
    $('#message').css('display', 'block');
  } else {
    const sToken = localStorage.getItem('auth_token');
    const oData = {
      id: localStorage.getItem('Id'),
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

var deleteUser = function () {
  if (confirm("Vous allez supprimer votre compte. Etes-vous sûr ?") == true) {
    const sToken = localStorage.getItem('auth_token');
    $.ajax({
      url: "http://localhost:8080/user/delete",
      type: 'delete',
      data: {
        id: localStorage.getItem('Id')
      },
      headers: {"Authorization": "Bearer " + sToken},
      success : function (result) {
        logout();
      },
      error: function() {
        $('#message').css('display', 'block');
        $('#message').removeClass('alert-danger').addClass('alert-success');
        $('#message').html('Supression impossible : contactez votre administrateur.');
      }
    });
  }
}

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

var cancel = function () {
  location.href = "home.html"
};

$(document).ready(function () {
  init();
});
