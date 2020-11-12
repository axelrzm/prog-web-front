var init = function() {
  $("#btnAdd").click(() => addOption());
  $("#btnRemove").click(() => removeOption());
}

var addOption = function () {
  const optionNumber = $('#options').children().length + 1;
  if (optionNumber > 2) {
    $("#btnRemove").prop('disabled', false);
  }
  $('#options').append('<div class="form-group">' +
  '<label for="inputLogin">Option ' + optionNumber + '</label>' +
  '<input type="text" class="form-control" id="inputLogin" required>' +
  '</div>');
}

var removeOption = function () {
  const optionsNumber = $('#options').children().length;
  if (optionsNumber > 2) {
    $('#options').children().eq(optionsNumber - 1).remove();
    if (optionsNumber === 3) {
      $("#btnRemove").prop('disabled', true);
    }
  }
}

$(document).ready(function(){
  init();
});