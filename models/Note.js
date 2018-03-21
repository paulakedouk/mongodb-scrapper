var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  title: String,
  body: {
    type: String,
    required: 'Cannot save!'
  }
});

var Note = (module.exports = mongoose.model('Note', noteSchema));
