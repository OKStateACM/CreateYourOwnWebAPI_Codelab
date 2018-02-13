const express = require('express');
const mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost/dating_site');

app.get('/', (req, res, next) => {
	res.send('Hello');
});

app.get('/api/users', (req, res, next) => {
  
});

let port = 3000;
app.listen(port);
console.log("Listening on port " + port);
