"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log(req.body.text, "<--req.body.text");
    console.log(req.session.username, "<--req.session.username")
    knex('comments')
      .insert({
        // user_id: req.session.id,
        content: req.body.text
      })
      .then((result) => {
      })
      .catch((err) => {
        console.log(err)
      });
  }); //router.get end

  return router;
};
