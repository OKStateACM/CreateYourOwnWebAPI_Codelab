const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  interestedIn: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userSchema);

// Functions for interacting with user
User.getUsers = function(callback, limit) {
  User.find({}, callback).limit(limit);
}

User.getUser = function(id, callback) {
  User.find( { _id: id }, callback  );
}

User.addUser = function(user, callback) {
	User.create(user, callback);
}

User.deleteUser = function(id, callback) {
  User.deleteOne( { _id: id }, callback);
}

module.exports = User;
