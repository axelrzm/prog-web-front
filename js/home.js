var init = function () {
  loadStrawPolls();
  $('#btnLogout').click(() => logout());
  $('#inputSearch').keyup(() => search());
  $('#inputSearch').on("search", function() {
    search();
  });
};

var loadStrawPolls = function () {
  $.ajax({
    url: "http://localhost:8080/poll/",
    type: 'get',
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
  //temporary
  addStrawpoll("Sondage 2", "test");
  addStrawpoll("Sondage 3", "test 2");
  addStrawpoll("Sondage 3", "test 2");
  addStrawpoll("Sondage 3", "test 2");
  addStrawpoll("Sondage 3", "test 2");
};

var logout = function () {
  const sToken = getCookie("auth_token");
  $.ajax({
    url: "http://localhost:8080/logout/",
    type: 'post',
    data: {
      id: sToken
    },
    success : function (result) {
      document.cookie = "auth_token=";
      location.href = "index.html";
    }
  });
}

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

$(document).ready(function () {
  init();
});
