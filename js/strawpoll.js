var init = function() {
    loadStrawPoll();
  $("#btnLogout").click(() => logout());
  $('#btnDelete').click(() => deletePoll());
  $('#btnVote').click(() => vote());
};

var loadStrawPoll = function () {
  const sToken = localStorage.getItem('auth_token');
  const pollId = localStorage.getItem('pollId');
  $.ajax({
    url: "http://localhost:8080/poll/" + pollId,
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
          $("#name").text(result.name);
          $("#description").text(result.description);
          $("#location").text("Lieu : " + result.location);
          $("#date").text("Date : " + result.date);

          for (let i = 0; i < result.options.length; i++) {
            addOption(result.options[i]);
          }
      }
    }
  });
};

var addOption = function (option) {
  $('#radioOptions')
  .append('<div class="form-check">' +
  '<input class="form-check-input" type="radio" name="voteOption" id="' + option.id + '" value="' + option.value + '">' +
  '<label class="form-check-label" for="voteOption' + option.id + '">' + option.value + '</label>' +
  '</div>');

  $('#progressBarOptions')
  .append('<div class="form-group">' +
  '<label for="option' + option.id + '">' + option.value + '</label>' +
  '<div class="progress">' +
  '<div class="progress-bar" role="progressbar" style="width: ' + option.percentage + '%;" aria-valuenow="' + option.percentage + '" aria-valuemin="0" aria-valuemax="100">' + option.percentage + '</div>' +
  '</div>' +
  '</div>');
}

var vote = function () {
  const pollId = localStorage.getItem('pollId');
  const idOptionChecked = $('#radioOptions :checked').attr('id');
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/poll/vote",
    type: 'post',
    data: {
      optionId: idOptionChecked,
      pollId: pollId
    },
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      location.href = "home.html"
    },
    error: function() {
      alert("Erreur pendant le vote")
    }
  });
}

var deletePoll = function () {
  if (confirm("Vous allez supprimer le sondage. Etes-vous sûr ?") == true) {
    const sToken = localStorage.getItem('auth_token');
    $.ajax({
      url: "http://localhost:8080/poll/delete",
      type: 'delete',
      data: {
        id: localStorage.getItem('pollId')
      },
      headers: {"Authorization": "Bearer " + sToken},
      success : function (result) {
        location.href = "home.html"
      },
      error: function() {
        alert("Erreur pendant la supression")
      }
    });
  }
}

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

$(document).ready(function(){
  init();
});
