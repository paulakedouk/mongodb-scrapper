var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var axios = require('axios');
var db = require('../models');

exports.index = (req, res) => res.render('index');

// Routes
exports.scrape = (req, res) => {
  request.get('https://www.sfgate.com/', function(error, response, html) {
    var $ = cheerio.load(html);

    $('div.itemWrapper').each(function(i, element) {
      var newArticleArr = {};

      newArticleArr.title = $(this)
        .find('h5 a')
        .text();

      newArticleArr.url = $(this)
        .children('h5')
        .children('a')
        .attr('href');

      // console.log(newArticleArr);
      var entry = new db.Article(newArticleArr);
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
