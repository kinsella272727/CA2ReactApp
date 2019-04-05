// const Book = require('../models/Book.js');
const mongoose = require('mongoose');

let Book = new mongoose.Schema({
  title: String,
  author: String,
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Book', Book);
