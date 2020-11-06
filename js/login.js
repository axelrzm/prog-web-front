var init = function() {
  $('#loginError').css('display', 'none');
  $("#btnLogin").click(() => checkLogin());
}

var checkLogin = function() {
  let username = $('#inputLogin').val();
  $.ajax({
    url: "localhost:8080/user/",
    type: 'post',
    data: username
    success : function(rep) {
      if (rep) {
        checkPassword();
      }
      else {
        $('#loginError').css('display', 'block');
      }
    },
    error : function() {
      console.log("erreur requete");
    }
  });
}

var checkPassword = function() {
  let password = $('#inputPassword').val();
  $.ajax({
    url: "localhost:8080/user/",
    type: 'post',
    data: password
    success : function(rep) {
      if (rep) {
        $('#loginError').css('display', 'none');
        location.href = "home.html";
      }
      else {
        $('#loginError').css('display', 'block');
      }
    },
    error : function() {
      console.log("erreur requete");
    }
  });
}

$(document).ready(function(){
  init();
});
