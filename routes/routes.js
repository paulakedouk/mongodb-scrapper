var express = require('express');
var router = express.Router();
var db = require('../models');

var controller = require('../controllers/controller.js');

module.exports = function(app) {
  app.get('/', controller.index);
  app.get('/scrape', controller.scrape);
  app.get('/articles', controller.showArticles);
  app.get('/saved', controller.displaySaved);
  app.put('/article', controller.savedArticles);
  app.delete('/article', controller.deleteArticle);
  app.get('/notes/:id', controller.notes);
  app.post('/notes/newNote', controller.saveNotes);
};

// app.get('/save/:id', (req, res) => {
//   db.Article.update({ _id: req.params.id }, { saved: true })
//     .then(result => res.redirect('/'))
//     .catch(err => res.json(err));
// });

// app.get('/viewSaved', (req, res) => {
//   db.Article.find({})
//     .then(result => res.render('savedArticles', { articles: result }))
//     .catch(err => res.json(err));
// });

// app.delete('/deleteArticle/:id', (req, res) => {
//   db.Article.remove({ _id: req.params.id })
//     .then(result => res.json(result))
//     .catch(err => res.json(err));
// });

// module.exports = router;
