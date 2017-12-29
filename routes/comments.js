"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log(req.body.text, "<--req.body.text");
    knex('comments')
      .insert({
        // user_id: req.session.id,
        content: req.body.text
      })
      .then((result) => {
      });


  }); //router.get end

  return router;
};
