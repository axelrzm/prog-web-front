var init = function() {
  $("#btnAdd").click(() => addOption());
  $("#btnLogout").click(() => logout());
  $("#btnRemove").click(() => removeOption());
  $("#btnCreate").click(() => createPoll());
  $('#myStrawpolls').click(() => function() {
    location.href="home.html";
    loadMyStrawPolls();
  });
};

var addOption = function () {
  const optionNumber = $('#options').children().length + 1;
  if (optionNumber > 2) {
    $("#btnRemove").prop('disabled', false);
  }
  $('#options').append('<div class="form-group">' +
  '<label for="inputLogin">Option ' + optionNumber + '</label>' +
  '<input type="text" class="form-control" id="option' + optionNumber + '" required>' +
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

var createPoll = function() {
  const sToken = localStorage.getItem('auth_token');
  const sName = $('#name').val();
  const sDescription = $('#description').val();
  const sLocation = $('#location').val();
  const sDate = $('#date').val();
  var sOptions = getOptions();

  $('#error').css('display', 'none');
  if ($('#option1').val().length === 0 || $('#option2').val().length === 0) {
    $('#error').css('display', 'block');
    $('#error').html('Veuillez renseigner au moins 2 options');
  }
  else {
    $.ajax({
      url: "http://localhost:8080/poll/new",
      type: 'post',
      headers: {"Authorization": "Bearer " + sToken},
      data: {
        name: sName,
        description: sDescription,
        location: sLocation,
        date: sDate,
        options: JSON.stringify(sOptions),
        userId: localStorage.getItem('Id')
      },
      success : function(result) {
        location.href = "home.html";
      },
      error : function(xhr) {
        console.log(xhr.status);
        $('#error').css('display', 'block');
        $('#error').html('Sondage déjà existant');
      }
    });
  }
}

function getOptions() {
  var options = [];
  $('#options input').each(function(index) {
    options.push($('#option' + (index + 1)).val());
  });
  return options
}

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

$(document).ready(function(){
  init();
});
