var init = function() {
  loadStrawPolls();
}

var loadStrawPolls = function() {
  addStrawpoll("Sondage 2", "test");
  addStrawpoll("Sondage 3", "test 2");
  addStrawpoll("Sondage 3", "test 2");
  addStrawpoll("Sondage 3", "test 2");
  addStrawpoll("Sondage 3", "test 2");
}

var addStrawpoll = function(title, description) {
  $('#strawpolls')
  .append('<div class="card">' +
  '<div class="card-body">' +
  '<h5 class="card-title">' + title + '</h5>' +
  '<p class="card-text">' + description + '</p>' +
  '<a href="strawpoll.html" class="btn btn-outline-dark">Voir</a>' +
  '</div>' +
  '</div>');
}

$(document).ready(function(){
  init();
});
