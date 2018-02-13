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

We will use these requests and the concept of routes to define how our api works. For example, we can say that a `GET` request to the route `/api/users` will respond to the client with a list of all the users in the database. Let's add this functionality now.

In `server.js`, after the line function `app.get` function that we wrote earlier. Add this:
```javascript
app.get('/api/users', (req, res, next) => {

});
```
