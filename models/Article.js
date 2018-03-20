var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  imgUrl: String,
  saved: {
    type: Boolean,
    default: false
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
