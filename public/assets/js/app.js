$(document).ready(function() {
  function sendNote(element) {
    let note = {};
    note.articleId = $(element).attr('data-id');

    note.title = $('.note-title')
      .val()
      .trim();
    note.body = $('.note-body')
      .val()
      .trim();

    if (note.title && note.body) {
      $.ajax({
        url: '/notes/newNote',
        type: 'POST',
        data: note,
        success: function(response) {
          // console.log(response);
          showNote(response, note.articleId);
          $('.note-body, .note-title').val('');
        },
        error: function(error) {
          showErrorModal(error);
        }
      });
    }
  }

  function showErrorModal(error) {
    $('#error').modal('show');
  }

  function showNote(element, articleId) {
    // console.log(element);
    // $('#notes').css('display', 'block');
    let $deleteButton = $('<button>')
      .text('x')
      .addClass('delete-note btn-danger');

    let $title = $('<h6>')
      .text(element.title)
      .addClass('note-title');
    let $body = $('<p>')
      .text(element.body)
      .addClass('note-body');
    let $note = $('<div>')
      .attr('data-note-id', element._id)
      .attr('data-article-id', articleId)
      .addClass('note');

    let $div = $('<div>').append($title, $body, $note);
    let $li = $('<li>')
      .addClass('list-group-item all-notes')
      .append($deleteButton)
      .append($div);

    let $ul = $('<ul>')
      .addClass('list-group')
      .append($li)
      .appendTo('#notes');
  }

  $('#alert-modal').on('hide.bs.modal', function(event) {
    window.location.href = '/';
  });

  $('#scrape').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/scrape',
      success: function(response) {
        $('#articles-count').text(response.count);
      },
      error: function(error) {
        showErrorModal(error);
      },
      complete: function(result) {
        $('#alert-modal').modal('show');
      }
    });
  });

  $('#save').on('click', function(event) {
    event.preventDefault();

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

  $('.delete-article').on('click', function(event) {
    event.preventDefault();

    let articleId = {
      id: $(this).data('id')
    };

    $.ajax({
      method: 'DELETE',
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

  $('.add-note').on('click', function(event) {
    event.preventDefault();

    $('#note-container').empty();
    $('.note-title, .note-body').val('');
    let id = $(this).data('id');
    // console.log(id);
    $('#submit-note, .note-body').attr('data-id', id);
    $.ajax({
      url: '/notes/' + id,
      type: 'GET',
      success: function(data) {
        $('#note-modal').modal('show');
      },
      error: function(error) {
        showErrorModal(error);
      }
    });
  });

  $('#submit-note').on('click', function(event) {
    event.preventDefault();
    $('#empty-notes').css('display', 'none');
    sendNote($(this));
  });

  $(document).on('click', '.delete-note', function(event) {
    event.preventDefault();
    // console.log(event);
    // console.log($(this));
    let id = $(this).data('id');

    let ids = {
      noteId: id,
      articleId: id
    };

    // console.log(ids);
    $.ajax({
      url: '/notes/deleteNote',
      type: 'POST',
      data: ids,
      success: function(response) {
        window.location.href = '/';
      },
      error: function(error) {
        showErrorModal(error);
      }
    });
  });

  $(document).on('click', '.note', function(event) {
    event.preventDefault();
    let id = $(this).data('note-id');
    $.ajax({
      url: '/notes/oneNote/' + id,
      type: 'GET',
      success: function(note) {
        $('.note-title').val(note.title);
        $('.note-body').val(note.body);
      },
      error: function(error) {
        console.log(error);
        showErrorModal(error);
      }
    });
  });
});
