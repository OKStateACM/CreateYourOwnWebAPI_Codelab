# Part 4 - Routing

Now is when we start creating the different `routes`. That is, what do we send back to the client when the client goes to `/api`, `/api/users`, etc.

## Quick Summary of HTTP Requests
* A `client` (i.e. the web browser) sends a request to the `server` and the server processes the request and sends a response back to the client. There are 3 main types of requests we will focus on:
  * `GET`
    * The client wants to get something from the server. Usually an HTML file, a list of users in a database, etc.
  * `POST`
    * Usually used to add something to the database. i.e. add a user or a date to our dating site database.
  * `DELETE`
    * Like POST, used to delete an entry in the database

We will use these requests and the concept of routes to define how our api works. For example, we can say that a `GET` request to the route `/api/users` will cause the server to respond with a list of users in the database.

In `server.js`, after the `app.get('/', ...` function that we wrote earlier. Add this:
```javascript
app.get('/api/users', (req, res, next) => {
  User.getUsers((err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});
```

There's quite a bit going on here. The first line you've seen before. That's telling our server to listen for a `GET` request at `api/users`. After that, we use a function defined by the `User` model to get a list of all the users. If it's a success, the callback function will be called and we can send that list to the client using `res.json(users)`

 Let's make sure it works. Run `node server.js` and navigate to `localhost:3000/api/users` in your browser. You should see something like
```json
[]
```

This is just an empty json array! It's empty because there's no users in the database. Let's define the route that will be used to add users.

## Adding users to the database

To add a user to the database, let's say that the client needs to send a `POST` request to the `/api/user` route. The body of this request should contain the json for a new user. In order to parse the body of requests, we need to make use of the `body-parser` library you installed earlier. Import the library into `server.js`

```javascript
const bodyParser = require('body-parser');
```

And tell express that it needs to use `bodyParser.json`, without this, you won't be able to read the body of a request.
```javascript
...
let app = express();

app.use(bodyParser.json());
...
```

With that out of the way, let's now implement this `POST` route we defined earlier.

```javascript
app.post('/api/user', (req, res, next) => {
  var newUser = req.body;
  User.addUser(newUser, function(err, newUser) {
    if (err) {
      throw err;
    }
    res.json(newUser);
  });
});
```

To test this, we need to use a tool called `postman` which you installed in Part 0.

When you first open up postman, it will ask you to login. You don't have to if you don't want to. Once you get past that, you'll see something like this towards the top:

![postman_demo](https://i.imgur.com/NwveT5u.png)

Select the dropdown menu that says GET, and change it to POST.

![dropdown](https://i.imgur.com/CED7bw8.png)

Click on the `Headers` tab. Enter `Content-Type` under key, and `application/json` under Value.

![headers](https://i.imgur.com/ZQzE6nk.png)

Now go to the `Body` tab and select the `raw` radio button. In the form, enter this:
```json
{
  "username": "Jane Doe",
  "password": "password_that_I_sure_hope_isnt_stored_in_plain_text",
  "age": 21,
  "gender": "Female",
  "interestedIn": "Male"
}
```

And hit the send button.

Now navigate to `localhost:3000/api/users` again. What do you see?

### **IMPORTANT NOTE**
We are using plain text passwords here for the sake of simplicity. NEVER do this. In a real application, we would hash the passwords before we put them in the database. We also wouldn't allow just anybody to access the list of all users.

## Adding Delete functionality
There's one final piece of functionality we should add, and that is the ability to delete a user. Add this to `server.js`

```javascript
app.delete('/api/user/:_id', (req, res, next) => {
  User.findOne( {_id: req.params._id}, (err, user) => {
    if (err) throw err;

    if (!user) res.json( { success: false, message: 'Bad ID' } );
    else {
      User.deleteUser(req.params._id, (err, user) => {
        if (err) res.json( { success: false, message: 'Unknown error deleting user' } );
        else res.json(user);
      });
    }
  });
});
```

After running `node server.js`, navigate to `localhost:3000/api/users` and grab the `id` of the user you just created. Now, use postman to send a delete request to `localhost:3000/api/user/id` where `id` is the id you got from the get request.

## Finishing up our routing
We can add users, see all users, and delete users. We also need to provide this functionality for our date objects. Since it's essentially the same thing, I'll omit the steps and just add it to the code.

## State of the code
`server.js`
```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

User = require('./models/user');
date = require('./models/date');

let app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/dating_site');

app.get('/', (req, res, next) => {
	res.send('Hello');
});

app.get('/api/users', (req, res, next) => {
  User.getUsers((err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});

app.post('/api/user', (req, res, next) => {
  var newUser = req.body;
  User.addUser(newUser, (err, newUser) => {
    if (err) {
      throw err;
    }
    res.json(newUser);
  });
});

app.delete('/api/user/:_id', (req, res, next) => {
  User.findOne( {_id: req.params._id}, (err, user) => {
    if (err) throw err;

    if (!user) res.json( { success: false, message: 'Bad ID' } );
    else {
      User.deleteUser(req.params._id, (err, user) => {
        if (err) res.json( { success: false, message: 'Unknown error deleting user' } );
        else res.json(user);
      });
    }
  });
});

app.get('/api/dates', (req, res, next) => {
  date.getDates((err, dates) => {
    if (err) {
      throw err;
    }
    res.json(dates);
  });
});

app.post('/api/date', (req, res, next) => {
  var newDate = req.body;
  date.addDate(newDate, (err, newDate) => {
    if (err) {
      throw err;
    }
    res.json(newDate);
  });
});

app.delete('/api/date/:_id', (req, res, next) => {
  date.findOne( {_id: req.params._id}, (err, date) => {
    if (err) throw err;

    if (!date) res.json( { success: false, message: 'Bad ID' } );
    else {
      date.deleteDate(req.params._id, (err, date) => {
        if (err) res.json( { success: false, message: 'Unknown error deleting date' } );
        else res.json(date);
      });
    }
  });
});

let port = 3000;
app.listen(port);
console.log("Listening on port " + port);
```

[Part 5](https://github.com/OKStateACM/CreateYourOwnWebAPI_Codelab/blob/master/Part%205.md)
