exports.handleSearch = function(req, res) {
  console.log('handleSearch')
  var searchTerm = req.body.searchTerm;

  if(searchTerm) {
    console.log('searchTerm: ', searchTerm);
    res.redirect('/');
  }
}
