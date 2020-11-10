var init = function() {
  $("#btnSignup").click(() => signup());
}

var signup = function() {
  location.href = "home.html";
  const username = $('#inputLogin').val();
  const mail = $('#inputMail').val();
  const password = $('#inputPassword').val();
  const confirmPassword = $('#inputConfirmPassword').val();

  if (password !== confirmPassword) {
    $('#error').html('Vos deux mots de passe sont différents. Veuillez réessayer')
  } else {
    $.ajax({
      url: "http://localhost:8080/user/new",
      type: 'post',
      data: {
        name: username,
        password: password,
        mail: mail
      },
      success : function(rep) {
        $('#error').css('display', 'none');
        location.href = "home.html";
      },
      error : function() {
        $('#error').css('display', 'block');
        console.log("erreur requete");
      }
    });
  }
}

$(document).ready(function(){
  init();
});
