var init = function () {
  saveUserId()
  loadStrawPolls();
  $('#btnLogout').click(() => logout());
  $('#inputSearch').keyup(() => search());
  $('#inputSearch').on("search", function() {
    search();
  });
};

var saveUserId = function() {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/user/information",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
        localStorage.setItem('Id', result.id);
      }
    },
    error : function() {
      alert('Erreur connexion')
    }
  });
};

var loadStrawPolls = function () {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/poll/",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          const sName = result[i].name;
          const sDescription = result[i].description;
          addStrawpoll(sName, sDescription, result[i].id);
        }
      }
    }
  });
};

var showPoll = function (id) {
  localStorage.setItem('pollId', id);
  location.href = "strawpoll.html";
};

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

var addStrawpoll = function (title, description, id) {
  $('#strawpolls')
  .append('<div class="card">' +
  '<div class="card-body">' +
  '<h5 class="card-title">' + title + '</h5>' +
  '<p class="card-text">' + description + '</p>' +
  '<button id="' + id + '" class="btn btn-outline-dark detail">Voir</button>' +
  '</div>' +
  '</div>');
  $('#' + id).click(() => showPoll(id));
};

var search = function () {
  const sSearchValue = $('#inputSearch').val();
  const aStrawpollTitles = $('#strawpolls').find(".card-title");
  for (let i = 0; i < aStrawpollTitles.length; i++) {
    if (aStrawpollTitles[i].innerText.toLowerCase().includes(sSearchValue) === false && sSearchValue.length > 0) {
      $('#strawpolls').children().eq(i).hide();
    } else {
      $('#strawpolls').children().eq(i).show();
    }
  }
};

$(document).ready(function () {
  init();
});
