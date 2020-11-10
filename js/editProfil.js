var init = function() {
  $("#btnCancel").click(() => signup());
}

var signup = function() {
  location.href = "home.html";
  const username = $('#inputLogin').val();
  const mail = $('#inputMail').val();
  const password = $('#inputPassword').val();
  const confirmPassword = $('#inputConfirmPassword').val();

  if (password !== confirmPassword) {
    $('#message').html('Vos deux mots de passe sont différents. Veuillez réessayer');
  } else {
    $.ajax({
      url: "http://localhost:8080/user/edit",
      type: 'put',
      data: {
        name: username,
        password: password,
        mail: mail
      },
      success : function(rep) {
        $('#message').css('display', 'block');
        $('#message').removeClass('text-danger').addClass('text-success');
        $('#message').html('Changements effectués');
        location.href = "home.html";
      },
      error : function() {
        $('#message').css('display', 'block');
        $('#message').removeClass('text-success').addClass('text-danger');
        $('#message').html('Vos deux mots de passe sont différents. Veuillez réessayer');
        console.log("erreur requete");
      }
    });
  }
}

$(document).ready(function(){
  init();
});
