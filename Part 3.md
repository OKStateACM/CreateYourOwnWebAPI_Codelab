# Part 3

## So we've created a very basic backend web service. Let's create a more structured API. Now's when we start thinking about our actual dating app.

## Structure of our app
* Our app should have users
	* Each user should have the following fields:
		* name
		* password
		* age
		* gender
		* Interested in
* Our app should have dates
	* Each date should have the following fields:
		* person1
		* person2
		* date
		* time
		* location

We'd like to store each user as well as each date in a database. For this we will use `mongodb`. You should have it installed from part 0.

As this codelab is mainly focused on creating the API, most of this stuff is already taken care of for you. If you're interested, the code for most of this is in the `models/` directory. We do need to install `mongoose` thoush, the library that will allow us to interface with our database.
```bash
npm install --save mongoose
```
We also need to grab the Model objects from the `models/` directory and put them in `server.js`.

Modify `server.js` to look like:
```javascript
const express = require('express');
const mongoose = require('mongoose');

User = require('./models/user');
date = require('./models/date');

let app = express();

mongoose.connect('mongodb://localhost/dating_site');

app.get('/', (req, res, next) => {
	res.send('Hello');
});

let port = 3000;
app.listen(port);
console.log("Listening on port " + port);
```

All we did here was add the `mongoose` library, grabbed the models, and used mongoose to connect to a database called `dating_site` that we will just keep on our local machine. **NOTE**: mongoose will create the database for us if it doesn't already exist.

Go ahead and run ```node server.js``` again to make sure you don't have any errors.

[Part 4](https://github.com/OKStateACM/CreateYourOwnWebAPI_Codelab/blob/master/Part%204.md)
