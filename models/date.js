const mongoose = require('mongoose');

var dateSchema = mongoose.Schema({
  person1: {
    type: String,
    required: true
  },
  person2: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

var date = mongoose.model('date', dateSchema);

// Functions for interacting with user
date.getDates = function(callback, limit) {
  date.find({}, callback).limit(limit);
}

date.getDate = function(id, callback) {
  date.find( { _id: id }, callback  );
}

date.addDate = function(n_date, callback) {
	date.create(n_date, callback);
}

date.deleteDate = function(id, callback) {
  date.deleteOne( { _id: id }, callback);
}

module.exports = date;
