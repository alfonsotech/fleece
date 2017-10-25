console.log('inside index.js');

$('#search-form-button').on('click', function(event) {
  event.preventDefault();

console.log('inside click handler');
  var searchTerm = $('#search-term').val().trim()
  console.log('searchTerm', searchTerm);

  $.post('/search', searchTerm)
  .done(function(data) {
    console.log('data', data);
  });

  $('#search-term').val('');
});

$.get('/search', function(data) {
    console.log('data', data);
})

$.get('/posts', function(posts) {
  console.log('posts', posts);
  for (var i = 0; i < posts.length; i++) {
    $('#posts').append(posts[i]);
  }
})
