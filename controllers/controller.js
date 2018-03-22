var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var axios = require('axios');
var db = require('../models');

exports.index = (req, res) => {
  db.Article.find({})
    .then(function(dbArticle) {
      // If all Users are successfully found, send them back to the client
      var hbsArticleObject = {
        articles: dbArticle
      };
      // console.log(dbArticle);

      res.render('index', hbsArticleObject);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
};

// Routes
exports.scrape = (req, res) => {
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
      results.imgUrl = $(this)
        .find('div.post-block__media picture')
        .find('img')
        .attr('src');

      console.log('results', results.imgUrl);

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
};

exports.showArticles = (req, res) => {
  db.Article.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
};

exports.displaySaved = (req, res) => {
  db.Article.find({ saved: true })
    .then(function(data) {
      var hbsObject = {};
      hbsObject.savedArticles = data;
      // console.log(hbsObject)
      res.render('saved', hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
};

exports.savedArticles = (req, res) => {
  db.Article.update({ _id: Object(req.body.id) }, { $set: { saved: true } }).then(function(data) {
    res.json(data);
  });
};

exports.deleteArticle = (req, res) => {
  db.Article.update({ _id: Object(req.body.id) }, { $set: { saved: false } }).then(function(result) {
    console.log('Article deleted');
    return res.status(200).end();
  });
};

exports.notes = (req, res) => {
  db.Article.findOne({ _id: Object(req.body.id) })
    .populate('notes')
    .then(results => res.json(results))
    .catch(err => res.json(err));
};

exports.saveNotes = (req, res) => {
  let { title, body, articleId } = req.body;
  let note = {
    title,
    body
  };
  db.Note.create(note)
    .then(result => {
      db.Article.findOneAndUpdate({ _id: articleId }, { $push: { notes: result._id } }, { new: true })
        .then(data => res.json(result))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

exports.deleteNote = (req, res) => {
  // console.log(req.body);
  let { articleId, noteId } = req.body;
  db.Note.remove({ _id: noteId })
    .then(result => res.json(result))
    .catch(err => res.json(err));
};

exports.oneNote = (req, res) => {
  db.Note.findOne({ _id: Object(req.body.id) })
    .then(result => res.json(result))
    .catch(err => res.json(err));
};
