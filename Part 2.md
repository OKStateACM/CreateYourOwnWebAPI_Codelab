# Part 2

## Initializing Our npm Package and Installing Dependencies
Navigate inside the directory which contains the files from the previous section and run this command
```bash
npm init
```
For the first three prompts, just hit <kbd>Enter</kbd>, for the next prompt
```bash
entry point: (index.js)
```
type in <kbd>server.js</kbd>. And then just hit <kbd>Enter</kbd> for the rest of the prompts.

This initializes our workspace as a Node.js package. This does two things: (1) It allows us to install packages through npm, and (2) it creates the package.json file, which handles our package's metadata and its dependencies. This package.json will look something like
```json
{
  "name": "create_your_own_api",
  "version": "1.0.0",
  "description": "Welcome to this codelab on creating your own web api! Before getting started, let's make sure you have some things installed. \t* [node.js](nodejs.org/en/download)",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Now, we want to install our dependencies
```bash
npm install --save express body-parser
```
If this worked, you should now see a package-lock.json file inside your directory, too. We won't need to mess with this.

Open up package.json again. There should now be a bit at the bottom that looks like
```json
"dependencies": {
    "body-parser": "^1.18.2",
    "express": "^4.16.2"
}
```

## Let's write some code!
Create a new file in your workspace directory called `server.js` (note that we use this specific name because it's specified with the `main` key in our `package.json` file)

Inside `server.js` write:
```javascript
const express = require('express');

let app = express();

let port = 3000;
app.listen(port);
console.log("Listening on port " + port);
```
Go ahead and run this:
```bash
node server.js
```
and go to `localhost:3000` in your browser. You should see the following message
> Cannot GET /

So on the one hand, this is great news! The server is listening for requests from the browser (seriously, see what happens when you are not running the above command), but on the other, it's not getting any file or anything. Let's change that. Modify `server.js` to look like the following
```javascript
...
let app = express();

app.get('/', (req, res, next) => {
	res.send('Hello');
});

let port = 3000;
...

```

## Whoa, Whoa, Whoa, what did you just do?
Let's break it down.

```javascript
app.get('/', (req, res, next) => {
```

This is telling the app to listen for a `get request` at location `/`. If you're not familiar with the concept, a get request is an `HTTP Request` to _get_ something. Normally an HTML file or (in this case) just some text. The ```'/'``` bit tells it to listen for a get request at that address. If we had put ```'/apples'``` instead, it would listen for a get request at `localhost:3000/apples`

The next part ```(req, res, next) =>``` is just a function definition in javascript. ```(req, res, next)``` is the argument list. This is a `callback function` for the `get` function. Meaning this function is called whenever we receive a get request at location `/`. I realize this is a lot to take in right now, let's see it in action.

Rerun `server.js`
```bash
node server.js
```

and once again navigate to `localhost:3000` in your browser. What do you see?

[Part 3](https://github.com/OKStateACM/CreateYourOwnWebAPI_Codelab/blob/master/Part%203.md)
