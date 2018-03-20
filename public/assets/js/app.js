$(document).on('click', '#save', function(e) {
  e.preventDefault();

  let articleId = $(this).data('id');
  $.ajax({
    url: '/articles/save/' + articleId,
    type: 'GET',
    success: function(response) {
      window.location.href = '/';
    },
    error: function(error) {
      showErrorModal(error);
    }
  });
}); //end of #saveArticle click event

function showErrorModal(error) {
  $('#error').modal('show');
}
