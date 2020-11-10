var init = function() {
  $('#loginError').css('display', 'none');
  $("#btnLogin").click(() => login());
}

var login = function() {
  const username = $('#inputLogin').val();
  const password = $('#inputPassword').val();
  $.ajax({
    url: "http://localhost:8080/login/",
    type: 'post',
    data: {
      name: username,
      password: password
    },
    success : function(rep) {
      $('#loginError').css('display', 'none');
      location.href = "home.html";
    },
    error : function() {
      $('#loginError').css('display', 'block');
      console.log("erreur requete");
    }
  });
}

$(document).ready(function(){
  init();
});
