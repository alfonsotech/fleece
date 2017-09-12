var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://plato.stanford.edu/')
  .type('#search-text', 'plato')
  .click('input#search-text')
  .click('form#search-form > div.search-btn-wrapper:nth-child(2) > button.btn.search-btn:nth-child(1)')
  .click('div#content > div.searchpage:nth-child(2) > div.search_results:nth-child(2) > div.result_listing:nth-child(2) > div.result_title:nth-child(1) > a.l:nth-child(1) > b:nth-child(1)')
  .evaluate(function () {
    return document.querySelector('#main-text').innerHTML;
  })
  .end()
    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
