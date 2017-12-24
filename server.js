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
const methodOverride = require("method-override");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(methodOverride("_method"));
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
  knex.select('resources.url', 'resources.title', 'resources.description', 'u.username', 'c.content', 'l.like', 'r.value')
    .from('resources')
    .join('users as u', 'resources.user_id', 'u.id')
    .join('comments as c', 'c.user_id', 'u.id')
    .join('likes as l', 'l.user_id', 'u.id')
    .join('ratings as r', 'r.user_id', 'u.id')
    .then((result) => {

      let templateVars = {
        username: req.session.username,
        resourceOne: result[0]
      };
      res.render('index', templateVars);
    })
    .catch((error) => console.log(error));
});



/* ----------- REGISTRATION ---------- */
app.get("/registration", (req, res) => {
  // Checks if the user is logged in by looking for the cookie
  // if (req.session.username) {
  //   console.log("THIS IS SESSION USER NAME: " + req.session.username )
  //   res.redirect("/resources");
  //   return;
  // }

  let templateVars = {
    username: req.session.username,
    blank: false,
    usernameExists: false,
    emailExists: false
  };

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

  res.render("registration", templateVars);
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
              // Hash the password
              const hashedPassword = bcrypt.hashSync(req.body.password, 15);
              knex("users")
                .insert({
                  username: req.body.username,
                  email: req.body.email,
                  password: hashedPassword
                })
                .then(() => {
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
        // Sets cookie for the user
        req.session.username = req.body.username;
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
      return knex.transaction((t) => {
        return knex("resources")
          .transacting(t)
          .insert({
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            screenshot: screenshot
          }, 'id')
          .then((response) => {
            console.log('after first insert')
            console.log(response.id, 'response.id')
            console.log(response[0], 'response[0]')
            if (req.body.tags === 'blog') {
              return knex('resources_tags')
                .transacting(t)
                .insert({
                  tag_id: 1,
                  resource_id: response[0]
                });
            }
            if (req.body.tags === 'tutorial') {
              return knex('resources_tags')
                .transacting(t)
                .insert({
                  tag_id: 2,
                  resource_id: response[0]
                });
                console.log('after resources tags insert')
            }
            if (req.body.tags === 'book') {
              return knex('resources_tags')
                .transacting(t)
                .insert({
                  tag_id: 3,
                  resource_id: response[0]
                });
            }
            if (req.body.tags === 'article') {
              return knex('resources_tags')
                .transacting(t)
                .insert({
                  tag_id: 4,
                  resource_id: response[0]
                });
            }
            if (req.body.tags === 'video') {
              return knex('resources_tags')
                .transacting(t)
                .insert({
                  tag_id: 5,
                  resource_id: response[0]
                });
            }

          })
          .then(t.commit)
          .catch(t.rollback)
      })
      .then(() => {console.log("Added successfully")})
      .catch((error) => { console.error(error) });

    })
    .then(() => {
      res.redirect("/resources");
    });

});


/* ----------- MY RESOURCES ---------- */
app.get("/resources/:id", (req, res) => {

  let templateVars = {
    username: req.session.username
  };

  res.render("resource_user", templateVars);
});

/* ----------- UPDATE PROFILE ---------- */
app.get("/update_profile", (req, res) => {
  let templateVars = {
    username: req.session.username
  };

  res.render("update_profile", templateVars);
});

app.put("/update_profile", (req, res) => {

  // Checks for blank inputs
  if (req.body.email === '' || req.body.password === '') {
    res.status(403).send("Oh no! You need to fill in all of those fields.");
  } else {
      knex('users')
        .where('username', req.session.username)
        .update({
          email: req.body.email,
          password: req.body.password
        })
        .then((result) => {
            res.redirect("/resources")
        })
        .catch((error) => {
            console.log(error);
        });
    } // else
}); // Put profile_update

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
