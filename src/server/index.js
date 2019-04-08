const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

const Book = require('./models/Book');
const User = require('./models/User');

const app = express();

// const mongo_uri = process.env.MONGODB_URL || 'mongodb://localhost/REACTCA2';
const mongo_uri = process.env.MONGODB_URL || 'mongodb://localhost/REACTCA2';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/users', function(req, res) {
  User.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/users/:id', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/users/:id/books', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Book.find({user_id: data._id}, function(err, books) {
      if (err) throw err;

      res.send(books);
    });
  });
});

app.get('/api/books', function(req, res) {
  Book.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('api/books/:id', (req, res) => {
  Book.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Deleting book from database
app.delete('/api/books', (req, res) => {

  Book.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    console.log('Test');
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true});
  });
});

// Create
app.post('/api/books', (req, res) => {
  const book = new Book(req.body);
  console.log(req.body);
  book.save((err, result) => {
    if (err) throw err;

    console.log('Created in Database');
    res.redirect('/');
  });
});

// Update
app.put('/api/books', (req, res) => {
  const id = req.body._id;

  delete req.body._id;

  Book.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true});
  });
});

app.listen(process.env.PORT || 8080);
