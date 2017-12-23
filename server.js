"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const bcrypt      = require('bcrypt');
const cookieSession = require('cookie-session');
const takeScreenshot = require('./webshot');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['keys1', 'keys2']
}));

// Log knex SQL queries to STDOUT as well
//app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: "session",
  keys: ['key1', 'key2']
}));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
// app.use("/api/resources", resourcesRoutes(knex));

/* ------------ HELPER FUNCTIONS ------------- */


/* ----------- LANDING PAGE ---------- */
app.get("/", (req, res) => {

  let templateVars = {
    username: req.session.username
  };

  res.render("index", templateVars);
});

/* ----------- REGISTRATION ---------- */
app.get("/registration", (req, res) => {
  // Checks if the user is logged in by looking for the cookie
  // if (req.session.username) {
  //   console.log("THIS IS SESSION USER NAME: " + req.session.username )
  //   res.redirect("/resources");
  //   return;
  // }

  // let templateVars = {
  //   username: req.session.username,
  //   blank: false,
  //   usernameExists: false,
  //   emailExists: false
  // };

  // if (req.session.blank) {
  //   templateVars.blank = true;
  //   req.session = null;
  // } else if (req.session.usernameExists) {
  //   templateVars.usernameExists = true;
  //   // req.session = null;
  // } else if (req.session.emailExists) {
  //   templateVars.emailExists = true;
  //   // req.session = null;
  // }

  // TO DO:
  // ADD ERROR CHECKS FOR BLANK INPUTS OR IF USERNAME/EMAIL/PASSWORD ALREADY IN DATABASE

  res.render("registration");
});

app.post("/registration", (req, res) => {

  // Checks for blank inputs as well as duplicates in the database
  if (req.body.username === '' || req.body.email === '' || req.body.password === '') {
    res.status(403).send("Oh no! You need to fill in all of those fields.");
  } else {
      knex('users')
        .where('username', req.body.username)
        .orWhere('email', req.body.email)
        .then((result) => {

          if (result.length !== 0) { // username or email already exists in database
            knex.column('username').select().from('users')
              .where('username', req.body.username)
              .then((result) => {
                if (result.length !== 0) { // username exists
                  res.status(403).send("Please choose another username.");
                } else { // email exists
                  res.status(403).send("Please choose another e-mail.");
                }
              })
              .catch((error) => {
                console.log(error);
              });

          } else { // username and email is available for creation
              knex("users")
                .insert({
                  username: req.body.username,
                  email: req.body.email,
                  password: hashedPassword
                })
                .then(() => {
                  // After user sucessfully registered, then hashPassword and set cookie
                  // Hash the password
                  const hashedPassword = bcrypt.hashSync(req.body.password, 15);

                  // Sets cookie for the user
                  req.session.username = req.body.username;
                  res.redirect("/resources");
                })
                .catch((error) => {
                  console.error(error);
                });
            }
        })
        .catch((error) => {
                console.log(error);
        });
    } // else
}); // post registration


/* ---------- LOGIN ---------- */
// Login Page
app.get("/login", (req, res) => {

  let templateVars = {
    username: req.session.username
  }

  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  knex('users')
    .where('username', req.body.username)
    .andWhere('password', req.body.password)
    .then((result) => {
      if (result.length !== 0) {
        res.redirect("/resources/:id");
      } else {
        res.redirect("/login");
      }
    })
    .catch((error) => console.log(error))
});


/* ---------- LOGOUT ---------- */
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


/* ----------- RESOURCES ---------- */
app.get("/resources", (req, res) => {

knex.select('*')
    .from('resources')
    .then((results) => {

      let templateVars = {
        username: req.session.username,
        resources: results
      };

      res.render("resources", templateVars);
    })
    .catch((error) => {
      console.error(error);
    });

});


/* ----------- ADD NEW RESOURCE ---------- */
app.get("/resources/new", (req, res) => {

  let templateVars = {
    username: req.session.username
  };

  res.render("resource_new", templateVars);
});

// Retrieves the screenshot from the database
app.get("/resources/:id/screenshot", (req, res) => {

  knex.select('screenshot')
    .from('resources')
    .where('id', req.params.id)
    .then((results) => {

        res.header('Content-Type', 'image/png')
        res.send(results[0].screenshot)
    })
});

// Stores new resources into the database
// and including screenshot taken by webshot
app.post("/resources", (req, res) => {

  takeScreenshot(req.body.url)
    .then((screenshot) => {
      return knex("resources")
        .insert({
          url: req.body.url,
          title: req.body.title,
          description: req.body.description,
          screenshot: screenshot
    })})
    .then(() => {
      res.redirect("/resources")
    })

});


/* ----------- MY RESOURCES ---------- */
app.get("/resources/:id", (req, res) => {

  let templateVars = {
    username: req.session.username
  };

  res.render("resource_user", templateVars);
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
