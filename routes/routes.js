var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res, next) {
  db.Article.find({})
    .then(function(dbArticle) {
      // If all Users are successfully found, send them back to the client
      var hbsArticleObject = {
        articles: dbArticle
      };
      console.log(dbArticle);

      res.render('index', hbsArticleObject);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

router.get('/scrape', function(req, res) {
  request('https://techcrunch.com/', function(error, response, html) {
    var $ = cheerio.load(html);

    var results = {};

    $('div.post-block').each(function(i, element) {
      results.headline = $(this)
        .find('h2')
        .text();
      results.body = $(this)
        .find('div.post-block__content')
        .text();
      results.link = $(this)
        .find('a')
        .attr('href');

      var entry = new db.Article(results);
      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });
    });
  });
});

router.get('/articles', function(req, res) {
  db.Article.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// app.get('/scrape', controller.scrape);
// app.get('/articles', controller.showArticles);

//   app.get('/save/:id', (req, res) => {
//     db.Article.update({ _id: req.params.id }, { saved: true })
//       .then(result => res.redirect('/'))
//       .catch(err => res.json(err));
//   });

//   app.get('/viewSaved', (req, res) => {
//     db.Article.find({})
//       .then(result => res.render('savedArticles', { articles: result }))
//       .catch(err => res.json(err));
//   });

//   app.delete('/deleteArticle/:id', (req, res) => {
//     db.Article.remove({ _id: req.params.id })
//       .then(result => res.json(result))
//       .catch(err => res.json(err));
//   });

module.exports = router;
