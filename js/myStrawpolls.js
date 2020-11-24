var init = function () {
  loadMyStrawPolls();
  $('#btnLogout').click(() => logout());
  $('#inputSearch').keyup(() => search());
  $('#inputSearch').on("search", function() {
    search();
  });
};

var loadMyStrawPolls = function () {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/poll/",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    data: {
      userId: localStorage.getItem('Id')
    },
    success : function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          const sName = result[i].name;
          const sDescription = result[i].description;
          addStrawpoll(sName, sDescription);
        }
      }
    }
  });
};

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

var addStrawpoll = function (title, description) {
  $('#strawpolls')
  .append('<div class="card">' +
  '<div class="card-body">' +
  '<h5 class="card-title">' + title + '</h5>' +
  '<p class="card-text">' + description + '</p>' +
  '<a href="strawpoll.html" class="btn btn-outline-dark">Voir</a>' +
  '</div>' +
  '</div>');
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
