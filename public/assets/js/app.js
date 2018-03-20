$(document).on('click', '#scrape', function(event) {
  event.preventDefault();
  $.ajax({
    method: 'GET',
    url: '/scrape'
  }).done(function(response) {
    alert('Articles scraped');
    location.reload();
  });
});

$(document).on('click', '#save', function(event) {
  event.preventDefault();
  // console.log($(this).data('id'));
  let articleId = {
    id: $(this).data('id')
  };

  $.ajax({
    method: 'PUT',
    data: articleId,
    url: '/article',
    success: function(response) {
      window.location.href = '/';
    },
    error: function(error) {
      showErrorModal(error);
    }
  });
});

function showErrorModal(error) {
  $('#error').modal('show');
}
