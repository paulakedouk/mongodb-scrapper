var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var axios = require("axios");
var db = require('../models')

exports.firstPage = function (req, res) {
    res.render('firstPage')
}

// Routes

exports.scrape = function (req, res) {
    axios.get('http://sfgate.com/').then(function (response) {
        var $ = cheerio.load(response.data);

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
    })
}

exports.showArticles = function (req, res) {
    db.Article.find({})
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            res.json(err)
        });
}
